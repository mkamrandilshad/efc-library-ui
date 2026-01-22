import * as React from "react"
import { cn } from "@/lib/utils"

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
}

const formatTime = (hour: number, format: "12h" | "24h" = "12h"): string => {
  if (format === "24h") {
    return `${hour.toString().padStart(2, "0")}:00`
  }
  const period = hour >= 12 ? "PM" : "AM"
  const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
  return `${displayHour}:00 ${period}`
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
      ...props
    },
    ref
  ) => {
    const hours = Array.from({ length: endHour - startHour + 1 }, (_, i) => startHour + i)

    const getItemPosition = (item: TimelineItemProps) => {
      const start = parseTime(item.startTime)
      const end = parseTime(item.endTime)
      const duration = end - start
      const totalHours = endHour - startHour
      const topPercent = ((start - startHour) / totalHours) * 100
      const heightPercent = (duration / totalHours) * 100
      return {
        top: `${Math.max(0, topPercent)}%`,
        height: `${Math.min(100, heightPercent)}%`,
      }
    }

    return (
      <div
        ref={ref}
        className={cn("relative flex gap-4", className)}
        {...props}
      >
        {/* Hour Markers */}
        <div className="flex flex-col gap-4 min-w-[80px]">
          {hours.map((hour) => (
            <div
              key={hour}
              className="text-sm text-muted-foreground"
            >
              {formatTime(hour, hourFormat)}
            </div>
          ))}
        </div>

        {/* Timeline Items */}
        <div className="flex-1 relative min-h-[400px]">
          {items.map((item) => {
            const position = getItemPosition(item)
            return (
              <div
                key={item.id}
                className={cn(
                  "absolute left-0 right-0 rounded-md p-3 text-white",
                  "flex flex-col justify-between",
                  item.color || "bg-primary"
                )}
                style={{
                  top: position.top,
                  height: position.height,
                  minHeight: "60px",
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="font-semibold text-sm">{item.title}</div>
                    <div className="text-xs opacity-90 mt-1">
                      {item.startTime} - {item.endTime}
                    </div>
                  </div>
                  {item.capacity && (
                    <div className="text-xs font-medium opacity-90 ml-2">
                      {item.capacity.current}/{item.capacity.max}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
)
Timeline.displayName = "Timeline"

export { Timeline, type TimelineItemProps }
