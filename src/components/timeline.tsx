

import * as React from "react"
import { cn } from "@/lib/utils"
import { Card } from "./card"
import { Separator } from "./separator"

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
}

export interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  items: TimelineItemProps[]
  startHour?: number
  endHour?: number
  hourFormat?: "12h" | "24h"
  title?: string
}

const formatTime = (hour: number, format: "12h" | "24h" = "12h"): string => {
  if (format === "24h") {
    return `${hour.toString().padStart(2, "0")}:00`
  }
  const period = hour >= 12 ? "PM" : "AM"
  const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
  return `${displayHour.toString().padStart(2, "0")}:00 ${period}`
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

const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  (
    {
      className,
      items,
      startHour = 0,
      endHour = 24,
      hourFormat = "12h",
      title,
      ...props
    },
    ref
  ) => {
    const hours = Array.from({ length: endHour - startHour + 1 }, (_, i) => startHour + i)
    const baseHourHeight = 60
    const fixedEventHeight = 56
    const eventSpacing = 4

    // Group events by the hour they start in
    const eventsByHour: { [key: number]: TimelineItemProps[] } = {}
    items.forEach(item => {
      const startHour = Math.floor(parseTime(item.startTime))
      if (!eventsByHour[startHour]) {
        eventsByHour[startHour] = []
      }
      eventsByHour[startHour].push(item)
    })

    // Calculate height for each hour based on events
    const hourHeights: { [key: number]: number } = {}
    hours.forEach(hour => {
      const eventsInHour = eventsByHour[hour] || []
      if (eventsInHour.length > 0) {
        // Height = number of events * (event height + spacing) + base padding
        hourHeights[hour] = eventsInHour.length * (fixedEventHeight + eventSpacing) + eventSpacing
      } else {
        hourHeights[hour] = baseHourHeight
      }
    })

    // Calculate cumulative positions for hours
    let cumulativeTop = 0
    const hourTopPositions: { [key: number]: number } = {}
    hours.forEach(hour => {
      hourTopPositions[hour] = cumulativeTop
      cumulativeTop += hourHeights[hour]
    })

    // Calculate position for each event
    const getItemPosition = (item: TimelineItemProps) => {
      const startHour = Math.floor(parseTime(item.startTime))
      const eventsInSameHour = eventsByHour[startHour] || []
      const indexInHour = eventsInSameHour.indexOf(item)
      
      const hourTop = hourTopPositions[startHour]
      const topPixels = hourTop + eventSpacing + (indexInHour * (fixedEventHeight + eventSpacing))
      
      return {
        top: `${topPixels}px`,
      }
    }

    const itemsWithPositions = items.map((item) => ({
      ...item,
      position: getItemPosition(item),
    }))

    const totalHeight = cumulativeTop

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
          {/* Hour Markers with Lines - Dynamic heights */}
          <div className="relative">
            {hours.map((hour, index) => (
              <div
                key={hour}
                className="flex items-start"
                style={{
                  height: index === hours.length - 1 ? '0px' : `${hourHeights[hour]}px`,
                }}
              >
                <div className="text-sm font-normal text-foreground w-20 flex-shrink-0 -mt-2">
                  {formatTime(hour, hourFormat)}
                </div>
                <Separator className="flex-1"/>
              </div>
            ))}
          </div>

          {/* Event Items - Positioned absolutely */}
          <div 
            className="absolute left-6 right-6 top-6"
            style={{ 
              minHeight: `${totalHeight}px`,
            }}
          >
            {itemsWithPositions.map((item) => {
              const { position} = item
              
              return (
                <div
                  key={item.id}
                  className={cn(
                    "absolute rounded-md px-4 py-2.5 text-white shadow-sm "
                  )}
                  style={{
                    top: position.top,
                    height: `${fixedEventHeight}px`,
                    left: '88px',
                    right: '0px',
                    backgroundColor: item.color || "#7c3aed",
                  }}
                >
                  <div className="flex items-start justify-between h-full">
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm leading-tight truncate">{item.title}</div>
                      <div className="text-xs opacity-90 mt-0.5">
                        {item.startTime} - {item.endTime}
                      </div>
                    </div>
                    {item.capacity && (
                      <div className="text-xs font-medium opacity-90 ml-3 whitespace-nowrap self-end">
                        {item.capacity.current}/{item.capacity.max}
                      </div>
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