// import * as React from "react"
// import { cn } from "@/lib/utils"

// interface TimelineItemProps {
//   id: string
//   title: string
//   startTime: string
//   endTime: string
//   capacity?: {
//     current: number
//     max: number
//   }
//   color?: string
// }

// export interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
//   items: TimelineItemProps[]
//   startHour?: number
//   endHour?: number
//   hourFormat?: "12h" | "24h"
//   title?: string
// }

// const formatTime = (hour: number, format: "12h" | "24h" = "12h"): string => {
//   if (format === "24h") {
//     return `${hour.toString().padStart(2, "0")}:00`
//   }
//   const period = hour >= 12 ? "PM" : "AM"
//   const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
//   return `${displayHour}:00 ${period}`
// }

// const parseTime = (timeStr: string): number => {
//   const [time, period] = timeStr.split(" ")
//   const [hours, minutes] = time.split(":").map(Number)
//   let hour24 = hours
//   if (period) {
//     if (period.toUpperCase() === "PM" && hours !== 12) {
//       hour24 = hours + 12
//     } else if (period.toUpperCase() === "AM" && hours === 12) {
//       hour24 = 0
//     }
//   }
//   return hour24 + minutes / 60
// }

// const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
//   (
//     {
//       className,
//       items,
//       startHour = 0,
//       endHour = 24,
//       hourFormat = "12h",
//       title,
//       ...props
//     },
//     ref
//   ) => {
//     const hours = Array.from({ length: endHour - startHour + 1 }, (_, i) => startHour + i)
//     const totalHours = endHour - startHour
//     const hourHeight = 60 // Height in pixels for each hour

//     const getItemPosition = (item: TimelineItemProps) => {
//       const start = parseTime(item.startTime)
//       const end = parseTime(item.endTime)
//       const duration = end - start
//       const topPixels = ((start - startHour) / totalHours) * (totalHours * hourHeight)
//       const heightPixels = (duration / totalHours) * (totalHours * hourHeight)
//       return {
//         top: `${topPixels}px`,
//         height: `${Math.max(heightPixels, 60)}px`,
//       }
//     }

//     return (
//       <div
//         ref={ref}
//         className={cn("w-full", className)}
//         {...props}
//       >
//         {title && (
//           <div className="mb-4">
//             <h2 className="text-lg font-bold text-foreground">{title}</h2>
//           </div>
//         )}
//         <div className="relative flex w-full pl-1">
//           {/* Hour Markers */}
//           <div className="flex flex-col w-24">
//             {hours.map((hour) => (
//               <div
//                 key={hour}
//                 className="relative flex items-center"
//                 style={{
//                   height: `${hourHeight}px`,
//                 }}
//               >
//                 <div className="text-sm text-secondary-foreground whitespace-nowrap">
//                   {formatTime(hour, hourFormat)}
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Timeline Area */}
//           <div 
//             className="flex-1 relative"
//             style={{ 
//               // minHeight: `${totalHours * hourHeight}px`,
//               minHeight: "50px",
//             }}
//           >
//             {/* Background hour lines - aligned with time markers */}
//             {hours.map((hour, index) => {
//               // Align line with the center of the time marker (which uses items-center)
//               const topPixels = index * hourHeight + hourHeight / 2
//               return (
//                 <div
//                   key={`line-${hour}`}
//                   className="absolute left-0 right-0 border-t border-border"
//                   style={{
//                     top: `${topPixels}px`,
//                     transform: "translateY(-50%)",
//                   }}
//                 />
//               )
//             })}

//             {/* Event Items */}
//             {items.map((item) => {
//               const position = getItemPosition(item)
//               return (
//                 <div
//                   key={item.id}
//                   className={cn(
//                     "absolute left-0 right-0 rounded-md p-3 text-white",
//                     "flex flex-col"
//                   )}
//                   style={{
//                     top: position.top,
//                     height: position.height,
//                     minHeight: "60px",
//                     backgroundColor: item.color || "hsl(var(--primary))",
//                   }}
//                 >
//                   <div className="flex items-start justify-between h-full">
//                     <div className="flex-1 flex flex-col">
//                       <div className="font-semibold text-sm">{item.title}</div>
//                       <div className="text-xs opacity-90 mt-1">
//                         {item.startTime} - {item.endTime}
//                       </div>
//                     </div>
//                     {item.capacity && (
//                       <div className="text-xs font-medium opacity-90 ml-2 whitespace-nowrap">
//                         {item.capacity.current}/{item.capacity.max}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )
//             })}
//           </div>
//         </div>
//       </div>
//     )
//   }
// )
// Timeline.displayName = "Timeline"

// export { Timeline, type TimelineItemProps }



// import * as React from "react"
// import { cn } from "@/lib/utils"

// interface TimelineItemProps {
//   id: string
//   title: string
//   startTime: string
//   endTime: string
//   capacity?: {
//     current: number
//     max: number
//   }
//   color?: string
// }

// export interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
//   items: TimelineItemProps[]
//   startHour?: number
//   endHour?: number
//   hourFormat?: "12h" | "24h"
//   title?: string
// }

// const formatTime = (hour: number, format: "12h" | "24h" = "12h"): string => {
//   if (format === "24h") {
//     return `${hour.toString().padStart(2, "0")}:00`
//   }
//   const period = hour >= 12 ? "PM" : "AM"
//   const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
//   return `${displayHour}:00 ${period}`
// }

// const parseTime = (timeStr: string): number => {
//   const [time, period] = timeStr.split(" ")
//   const [hours, minutes] = time.split(":").map(Number)
//   let hour24 = hours
//   if (period) {
//     if (period.toUpperCase() === "PM" && hours !== 12) {
//       hour24 = hours + 12
//     } else if (period.toUpperCase() === "AM" && hours === 12) {
//       hour24 = 0
//     }
//   }
//   return hour24 + minutes / 60
// }

// const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
//   (
//     {
//       className,
//       items,
//       startHour = 0,
//       endHour = 24,
//       hourFormat = "12h",
//       title,
//       ...props
//     },
//     ref
//   ) => {
//     const hours = Array.from({ length: endHour - startHour + 1 }, (_, i) => startHour + i)
//     const totalHours = endHour - startHour
//     const hourHeight = 80 // Increased height for better spacing

//     const getItemPosition = (item: TimelineItemProps) => {
//       const start = parseTime(item.startTime)
//       const end = parseTime(item.endTime)
//       const duration = end - start
//       const topPixels = ((start - startHour) / totalHours) * (totalHours * hourHeight)
//       const heightPixels = (duration / totalHours) * (totalHours * hourHeight)
//       return {
//         top: `${topPixels}px`,
//         height: `${Math.max(heightPixels, 48)}px`,
//       }
//     }

//     return (
//       <div
//         ref={ref}
//         className={cn("w-full max-w-3xl mx-auto bg-white", className)}
//         {...props}
//       >
//         {title && (
//           <div className="px-6 py-4 border-b">
//             <h2 className="text-xl font-semibold">{title}</h2>
//           </div>
//         )}
//         <div className="relative flex w-full px-6 py-4">
//           {/* Hour Markers */}
//           <div className="flex flex-col" style={{ width: "90px" }}>
//             {hours.map((hour) => (
//               <div
//                 key={hour}
//                 className="relative"
//                 style={{
//                   height: `${hourHeight}px`,
//                 }}
//               >
//                 <div className="text-sm font-medium text-gray-700 pt-1">
//                   {formatTime(hour, hourFormat)}
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Timeline Area */}
//           <div 
//             className="flex-1 relative ml-4"
//             style={{ 
//               minHeight: `${totalHours * hourHeight}px`,
//             }}
//           >
//             {/* Background hour lines */}
//             {hours.map((hour, index) => (
//               <div
//                 key={`line-${hour}`}
//                 className="absolute left-0 right-0 border-t border-gray-200"
//                 style={{
//                   top: `${index * hourHeight}px`,
//                 }}
//               />
//             ))}

//             {/* Event Items */}
//             {items.map((item) => {
//               const position = getItemPosition(item)
//               return (
//                 <div
//                   key={item.id}
//                   className={cn(
//                     "absolute left-0 right-0 rounded-lg px-4 py-3 text-white",
//                     "flex flex-col justify-between shadow-sm"
//                   )}
//                   style={{
//                     top: position.top,
//                     height: position.height,
//                     minHeight: "48px",
//                     backgroundColor: item.color || "#8b5cf6",
//                   }}
//                 >
//                   <div className="flex items-start justify-between">
//                     <div className="flex-1">
//                       <div className="font-semibold text-sm">{item.title}</div>
//                       <div className="text-xs opacity-90 mt-0.5">
//                         {item.startTime} - {item.endTime}
//                       </div>
//                     </div>
//                     {item.capacity && (
//                       <div className="text-xs font-medium opacity-90 ml-3 whitespace-nowrap">
//                         {item.capacity.current}/{item.capacity.max}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )
//             })}
//           </div>
//         </div>
//       </div>
//     )
//   }
// )
// Timeline.displayName = "Timeline"

// export { Timeline, type TimelineItemProps }
// import * as React from "react"
// import { cn } from "@/lib/utils"

// interface TimelineItemProps {
//   id: string
//   title: string
//   startTime: string
//   endTime: string
//   capacity?: {
//     current: number
//     max: number
//   }
//   color?: string
// }

// export interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
//   items: TimelineItemProps[]
//   startHour?: number
//   endHour?: number
//   hourFormat?: "12h" | "24h"
//   title?: string
// }

// const formatTime = (hour: number, format: "12h" | "24h" = "12h"): string => {
//   if (format === "24h") {
//     return `${hour.toString().padStart(2, "0")}:00`
//   }
//   const period = hour >= 12 ? "PM" : "AM"
//   const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
//   return `${displayHour}:00 ${period}`
// }

// const parseTime = (timeStr: string): number => {
//   const [time, period] = timeStr.split(" ")
//   const [hours, minutes] = time.split(":").map(Number)
//   let hour24 = hours
//   if (period) {
//     if (period.toUpperCase() === "PM" && hours !== 12) {
//       hour24 = hours + 12
//     } else if (period.toUpperCase() === "AM" && hours === 12) {
//       hour24 = 0
//     }
//   }
//   return hour24 + minutes / 60
// }

// const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
//   (
//     {
//       className,
//       items,
//       startHour = 0,
//       endHour = 24,
//       hourFormat = "12h",
//       title,
//       ...props
//     },
//     ref
//   ) => {
//     const hours = Array.from({ length: endHour - startHour + 1 }, (_, i) => startHour + i)
//     const totalHours = endHour - startHour
//     const hourHeight = 80 // Increased height for better spacing

//     const getItemPosition = (item: TimelineItemProps) => {
//       const start = parseTime(item.startTime)
//       const topPixels = ((start - startHour) / totalHours) * (totalHours * hourHeight)
//       return {
//         top: `${topPixels}px`,
//         height: '60px', // Fixed height for all items
//       }
//     }

//     return (
//       <div
//         ref={ref}
//         className={cn("w-full max-w-3xl mx-auto bg-white", className)}
//         {...props}
//       >
//         {title && (
//           <div className="px-6 py-4 border-b">
//             <h2 className="text-xl font-semibold">{title}</h2>
//           </div>
//         )}
//         <div className="relative flex w-full px-6 py-4">
//           {/* Hour Markers */}
//           <div className="flex flex-col" style={{ width: "90px" }}>
//             {hours.map((hour) => (
//               <div
//                 key={hour}
//                 className="relative"
//                 style={{
//                   height: `${hourHeight}px`,
//                 }}
//               >
//                 <div className="text-sm font-medium text-gray-700 pt-1">
//                   {formatTime(hour, hourFormat)}
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Timeline Area */}
//           <div 
//             className="flex-1 relative ml-4"
//             style={{ 
//               minHeight: `${totalHours * hourHeight}px`,
//             }}
//           >
//             {/* Background hour lines */}
//             {hours.map((hour, index) => (
//               <div
//                 key={`line-${hour}`}
//                 className="absolute left-0 right-0 border-t border-gray-200"
//                 style={{
//                   top: `${index * hourHeight}px`,
//                 }}
//               />
//             ))}

//             {/* Event Items */}
//             {items.map((item) => {
//               const position = getItemPosition(item)
//               return (
//                 <div
//                   key={item.id}
//                   className={cn(
//                     "absolute left-0 right-0 rounded-lg px-4 py-3 text-white",
//                     "flex flex-col justify-between shadow-sm"
//                   )}
//                   style={{
//                     top: position.top,
//                     height: position.height,
//                     minHeight: "48px",
//                     backgroundColor: item.color || "#8b5cf6",
//                   }}
//                 >
//                   <div className="flex items-start justify-between">
//                     <div className="flex-1">
//                       <div className="font-semibold text-sm">{item.title}</div>
//                       <div className="text-xs opacity-90 mt-0.5">
//                         {item.startTime} - {item.endTime}
//                       </div>
//                     </div>
//                     {item.capacity && (
//                       <div className="text-xs font-medium opacity-90 ml-3 whitespace-nowrap">
//                         {item.capacity.current}/{item.capacity.max}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )
//             })}
//           </div>
//         </div>
//       </div>
//     )
//   }
// )
// Timeline.displayName = "Timeline"

// export { Timeline, type TimelineItemProps }



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
  title?: string
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
      title,
      ...props
    },
    ref
  ) => {
    const hours = Array.from({ length: endHour - startHour + 1 }, (_, i) => startHour + i)
    const totalHours = endHour - startHour
    const hourHeight = 80

    const getItemPosition = (item: TimelineItemProps) => {
      const start = parseTime(item.startTime)
      const topPixels = ((start - startHour) / totalHours) * (totalHours * hourHeight)
      return {
        top: `${topPixels}px`,
        height: '56px',
      }
    }

    return (
      <div
        ref={ref}
        className={cn("w-full max-w-4xl mx-auto bg-white", className)}
        {...props}
      >
        {title && (
          <div className="px-6 py-4 border-b">
            <h2 className="text-xl font-semibold">{title}</h2>
          </div>
        )}
        <div className="relative w-full px-6 py-4">
          {/* Hour Markers with Lines */}
          <div className="relative">
            {hours.map((hour) => (
              <div
                key={hour}
                className="flex items-center"
                style={{
                  height: `${hourHeight}px`,
                }}
              >
                <div className="text-sm font-medium text-gray-700 w-24 flex-shrink-0">
                  {formatTime(hour, hourFormat)}
                </div>
                <div className="flex-1 border-t border-gray-200 ml-4" />
              </div>
            ))}
          </div>

          {/* Event Items - Positioned absolutely */}
          <div 
            className="absolute left-0 right-0 top-0 px-6"
            style={{ 
              minHeight: `${totalHours * hourHeight}px`,
            }}
          >
            {items.map((item) => {
              const position = getItemPosition(item)
              return (
                <div
                  key={item.id}
                  className={cn(
                    "absolute rounded-lg px-4 py-3 text-white shadow-sm"
                  )}
                  style={{
                    top: position.top,
                    height: position.height,
                    left: '120px',
                    right: '24px',
                    backgroundColor: item.color || "#a855f7",
                  }}
                >
                  <div className="flex items-start justify-between h-full">
                    <div className="flex-1">
                      <div className="font-semibold text-sm leading-tight">{item.title}</div>
                      <div className="text-xs opacity-90 mt-1">
                        {item.startTime} - {item.endTime}
                      </div>
                    </div>
                    {item.capacity && (
                      <div className="text-xs font-medium opacity-90 ml-3 whitespace-nowrap">
                        {item.capacity.current}/{item.capacity.max}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
)
Timeline.displayName = "Timeline"

export { Timeline, type TimelineItemProps }