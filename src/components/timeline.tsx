

import * as React from "react"
import { cn } from "@/lib/utils"
import { Card } from "./card"
// import { Separator } from "./separator"

interface TimelineItemProps {
  id: string
  title: string
  startTime: string
  endTime: string
  capacity?: {
    current: number
    max: number
  }
  color?: string
  textColor?: string
  timeSlot?: number
  slotIndex?: number
}

export interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  items: TimelineItemProps[]
  startHour?: number
  endHour?: number
  hourFormat?: "12h" | "24h"
  title?: string
  timeSlotDuration?: number // Duration in minutes (default: 30)
  eventGap?: number // Gap between stacked events in pixels (default: 4)
  minSlotHeight?: number // Minimum height for any slot (default: 80)
  maxSlotHeight?: number // Maximum height for any slot (optional)
}

const parseTime = (timeStr: string): number => {
  const [time, period] = timeStr.split(" ")
  const [hours, minutes] = time.split(":").map(Number)
  let hour24 = hours
  if (period) {
    if (period.toUpperCase() === "PM" && hours !== 12) {
      hour24 = hours + 12
    } else if (period.toUpperCase() === "AM" && hours === 12) {
      hour24 = 0
    }
  }
  return hour24 + minutes / 60
}

// Group events by time slots for vertical stacking
const groupEventsByTimeSlot = (items: TimelineItemProps[], timeSlotDuration: number, startHour: number): { [key: number]: TimelineItemProps[] } => {
  const sortedItems = [...items].sort((a, b) => parseTime(a.startTime) - parseTime(b.startTime))
  const timeSlots: { [key: number]: TimelineItemProps[] } = {}
  
  for (const item of sortedItems) {
    const startMinutes = parseTime(item.startTime) * 60
    const startHourMinutes = startHour * 60
    const adjustedMinutes = startMinutes - startHourMinutes
    const timeSlotIndex = Math.floor(adjustedMinutes / timeSlotDuration)
    
    if (!timeSlots[timeSlotIndex]) {
      timeSlots[timeSlotIndex] = []
    }
    
    timeSlots[timeSlotIndex].push(item)
  }
  
  return timeSlots
}

// Get cumulative height up to a specific slot for positioning
const getCumulativeHeight = (slotIndex: number, slotHeights: { [key: number]: number }): number => {
  let totalHeight = 0
  
  // Sum heights of all slots before this one
  for (let i = 0; i < slotIndex; i++) {
    if (slotHeights[i]) {
      totalHeight += slotHeights[i]
    }
  }
  
  return totalHeight
}

// Flatten time slots back to items with slot information
const flattenTimeSlots = (
  timeSlots: { [key: number]: TimelineItemProps[] }
): TimelineItemProps[] => {
  const itemsWithSlots: TimelineItemProps[] = []
  Object.keys(timeSlots).sort((a, b) => Number(a) - Number(b)).forEach(slotKey => {
    const slotIndex = Number(slotKey)
    timeSlots[slotIndex].forEach((item, index) => {
      itemsWithSlots.push({ 
        ...item, 
        timeSlot: slotIndex,
        slotIndex: index 
      })
    })
  })
  
  return itemsWithSlots
}

// Calculate required height for each time slot based on event count
const calculateSlotHeights = (
  timeSlots: { [key: number]: TimelineItemProps[] },
  timeSlotDuration: number,
  eventHeight: number,
  eventGap: number,
  startHour: number,
  endHour: number,
  minSlotHeight: number
): { [key: number]: number } => {
  const slotHeights: { [key: number]: number } = {}
  
  // Calculate total number of slots in the timeline
  const totalSlots = ((endHour - startHour + 1) * 60) / timeSlotDuration
  
  // Calculate height for each slot
  for (let slotIndex = 0; slotIndex < totalSlots; slotIndex++) {
    const eventsInSlot = timeSlots[slotIndex] || []
    
    if (eventsInSlot.length > 0) {
      // Calculate required height: (eventCount * eventHeight) + ((eventCount - 1) * eventGap)
      const requiredHeight = (eventsInSlot.length * eventHeight) + ((eventsInSlot.length - 1) * eventGap)
      slotHeights[slotIndex] = requiredHeight
    } else {
      slotHeights[slotIndex] = minSlotHeight
    }
  }
  
  return slotHeights
}

const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  (
    {
      className,
      items,
      startHour = 0,
      endHour = 24,
      hourFormat = "12h",
      title,
      timeSlotDuration = 30, // Default 30 minutes
      eventGap = 4, // Default 4 pixels gap between events
      minSlotHeight = 80, // Default 80 pixels minimum slot height
      maxSlotHeight,
      ...props
    },
    ref
  ) => {
    const fixedEventHeight = 60
    
    // Group events by time slots
    const timeSlots = groupEventsByTimeSlot(items, timeSlotDuration, startHour)
    
    // Calculate dynamic heights for each slot
    const slotHeights = calculateSlotHeights(
      timeSlots,
      timeSlotDuration,
      fixedEventHeight,
      eventGap,
      startHour,
      endHour,
      minSlotHeight
    )
    
    // Flatten time slots back to items with slot information
    const itemsWithSlots = flattenTimeSlots(timeSlots)
    
    // Calculate position for each event - considering time slot and vertical stacking
    const getItemPosition = (item: TimelineItemProps) => {
      const slotIndex = item.timeSlot || 0
      const eventIndex = item.slotIndex || 0
      
      // Calculate cumulative height up to this time slot
      const cumulativeHeight = getCumulativeHeight(slotIndex, slotHeights)
      
      // Calculate top position relative to start of timeline
      // Add 38px to align with separator lines (accounting for hour label height)
      const topPixels = cumulativeHeight + 38
      
      // Add vertical offset for stacked events within same time slot
      const verticalOffset = eventIndex * (fixedEventHeight + eventGap)
      
      return {
        top: `${topPixels + verticalOffset}px`,
        height: `${fixedEventHeight}px`,
        left: "3%", // Fixed left position for full width
        width: "94%" // Full width for all events
      }
    }

    const itemsWithPositions = itemsWithSlots.map((item: TimelineItemProps) => ({
      ...item,
      position: getItemPosition(item),
    }))

    // const totalHeight = (endHour - startHour) * hourHeight

    return (
      <Card
        ref={ref}
        className={cn("", className)} 
        {...props}
      >
        {title && (
          <div className="px-6 py-4  ">
            <h2 className="text-lg font-semibold ">{title}</h2>
          </div>
        )}
        <div className="relative w-full px-8 py-6">
          {/* Time Labels and Slots - Direct Slot Rendering */}
          <div className="relative">
            {Array.from({ length: ((endHour - startHour + 1) * 60) / timeSlotDuration }).map((_, slotIndex) => {
              const slotHeight = slotHeights[slotIndex] || minSlotHeight
              
              // Calculate the actual time for this slot
              const slotStartTimeInMinutes = slotIndex * timeSlotDuration + startHour * 60
              const displayHour = Math.floor(slotStartTimeInMinutes / 60)
              const displayMinute = slotStartTimeInMinutes % 60
              const period = displayHour >= 12 ? "PM" : "AM"
              const hour12 = displayHour > 12 ? displayHour - 12 : displayHour === 0 ? 12 : displayHour
              const timeLabel = `${hour12.toString().padStart(2, "0")}:${displayMinute.toString().padStart(2, "0")} ${period}`
              
              return (
                <div
                  key={slotIndex}
                  className="flex items-start relative"
                  style={{
                    height: `${slotHeight}px`,
                  }}
                >
                  {/* Time Label */}
                  <div className="text-sm font-normal text-foreground w-20 flex-shrink-0 -mt-2">
                    {timeLabel}
                  </div>
                  
                  {/* Events will be positioned absolutely over this */}
                </div>
              )
            })}
          </div>
          
          {/* Events Container - Positioned absolutely over the timeline */}
          <div className="absolute inset-0">
            {itemsWithPositions.map((item) => {
              const { position } = item
              return (
                <div
                  key={item.id}
                  className={cn(
                    "rounded-lg p-2 shadow-sm border-0 absolute"
                  )}
                  style={{
                    top: position.top,
                    height: position.height,
                    backgroundColor: item.color || "#7c3aed",
                    left: position.left,
                    width: position.width
                  }}
                >
                  <div className="flex flex-col justify-center">
                    <span className="font-semibold text-sm leading-tight truncate" style={{ color: item.textColor || '#ffffff' }}>
                      {item.title}
                    </span>
                    <span className="text-xs opacity-75" style={{ color: item.textColor || '#ffffff' }}>
                      {item.startTime} - {item.endTime}
                    </span>
                    {item.capacity && (
                      <span className="text-xs font-medium opacity-90 self-end" style={{ color: item.textColor || '#ffffff' }}>
                        {item.capacity.current}/{item.capacity.max}
                      </span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Card>
    )
  }
)
Timeline.displayName = "Timeline"

export { Timeline, type TimelineItemProps }