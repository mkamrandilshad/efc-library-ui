

import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "./card";

// Generic interfaces for timeline items
export interface TimelineItem {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  type: "appointment" | "session" | "reminder";
  // Optional properties for different item types
  date?: string;
  capacity?: number;
  bookings?: number;
  member?: {
    id: string;
    firstName: string;
    lastName: string;
  };
  // Custom styling
  color?: string;
  onClick?: () => void;
}

export interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: TimelineItem[];
  loading?: boolean;
  title?: string;
  emptyMessage?: string;
  // Color customization
  sessionColor?: string;
  appointmentColor?: string;
  reminderColor?: string;
  textColor?: string;
  // Custom components
  skeletonComponent?: React.ComponentType<{ height?: number; className?: string }>;
  emptyComponent?: React.ComponentType<{ label: string }>;
  // Callbacks for navigation
  onSessionClick?: (date: string, sessionId: string) => void;
  onMemberClick?: (memberId: string) => void;
}

// Helper function to format time (simplified version of date-fns functionality)
const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
  return `${displayHours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")} ${period}`;
};

// Helper function to convert time string (HH:mm:ss) to minutes since midnight
const getTimeValue = (time: string): number => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

// Helper function to get the start and end times for a time slot
const getSlotRange = (slot: string): [number, number] => {
  const [time, period] = slot.split(" ");
  const [hours, minutes] = time.split(":").map(Number);
  let hour24 = hours;
  if (period) {
    if (period.toUpperCase() === "PM" && hours !== 12) {
      hour24 = hours + 12;
    } else if (period.toUpperCase() === "AM" && hours === 12) {
      hour24 = 0;
    }
  }
  const slotStart = hour24 * 60 + (minutes || 0);
  const slotEnd = slotStart + 60; // Assuming 1-hour slots
  return [slotStart, slotEnd];
};

// Helper function to generate time slots
const generateTimeSlots = (items: TimelineItem[]): string[] => {
  if (items.length === 0) return ["12:00 AM"]; // Default slot if no items

  const allStartTimes = items.map(item => item.startTime);
  const earliestStartTime = allStartTimes.reduce((earliest, current) => 
    current < earliest ? current : earliest, "23:59:59");
  const latestStartTime = allStartTimes.reduce((latest, current) => 
    current > latest ? current : latest, "00:00:00");

  const earliestHour = parseInt(earliestStartTime.split(":")[0]);
  const latestHour = parseInt(latestStartTime.split(":")[0]);

  const timeSlots = [];
  for (let hour = earliestHour; hour <= latestHour + 1; hour++) {
    const period = hour >= 12 ? "PM" : "AM";
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    timeSlots.push(`${displayHour.toString().padStart(2, "0")}:00 ${period}`);
  }
  return timeSlots;
};

// Group events by time slots
const groupByTime = (items: TimelineItem[], timeSlots: string[]): { [key: string]: TimelineItem[] } => {
  const grouped: { [key: string]: TimelineItem[] } = {};
  
  timeSlots.forEach((slot) => {
    const [startSlot, endSlot] = getSlotRange(slot);
    grouped[slot] = [];

    items.forEach((item) => {
      const eventStartTime = getTimeValue(item.startTime);
      if (eventStartTime >= startSlot && eventStartTime < endSlot) {
        grouped[slot].push(item);
      }
    });
  });
  return grouped;
};

const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  (
    {
      className,
      items = [],
      loading = false,
      title = "Agenda",
      emptyMessage = "There is nothing on the Agenda today",
      sessionColor,
      appointmentColor,
      reminderColor = "#9b76a0",
      textColor = "#ffffff",
      skeletonComponent: Skeleton,
      emptyComponent: EmptyComponent,
      onSessionClick,
      onMemberClick,
      ...props
    },
    ref
  ) => {
    const fixedTimeSlots = generateTimeSlots(items);
    const groupedEvents = groupByTime(items, fixedTimeSlots);

    const getEventBgColor = (event: TimelineItem): { backgroundColor: string } => {
      if (event.type === "session") {
        return { backgroundColor: sessionColor || "#76a09b" };
      } else if (event.type === "appointment") {
        return { backgroundColor: appointmentColor || "#7c3aed" };
      } else {
        return { backgroundColor: reminderColor };
      }
    };

    const handleEventClick = (event: TimelineItem) => {
      if (event.onClick) {
        event.onClick();
      } else if (event.type === "session" && event.date && onSessionClick) {
        onSessionClick(event.date, event.id);
      } else if (event.type === "appointment" && event.member && onMemberClick) {
        onMemberClick(event.member.id);
      }
    };

    const DefaultSkeleton = Skeleton || (({ height = 50, className }: { height?: number; className?: string }) => (
      <div className={cn("bg-gray-200 rounded animate-pulse", className)} style={{ height }} />
    ));

    const DefaultEmpty = EmptyComponent || (({ label }: { label: string }) => (
      <div className="text-center text-muted-foreground py-8">{label}</div>
    ));

    const noData = !loading && items.length === 0;

    return (
      <Card className={cn("lg:w-1/2 max-lg:w-full", className)} ref={ref} {...props}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          {noData ? (
            <DefaultEmpty label={emptyMessage} />
          ) : (
            fixedTimeSlots.map((timeSlot, index) => (
              <div key={index} className="pl-1 mb-4 w-full">
                <div className="flex items-center w-full">
                  <div className="text-secondary-foreground w-24">{timeSlot}</div>
                  <div className="my-2 border-t border-border-color w-5/6"></div>
                </div>

                {loading ? (
                  <DefaultSkeleton height={50} />
                ) : (
                  <div>
                    {groupedEvents[timeSlot] &&
                      groupedEvents[timeSlot].length > 0 &&
                      groupedEvents[timeSlot].map((event, idx) => (
                        <div
                          key={idx}
                          className={cn(
                            "text-white p-2 rounded mb-2 mt-2",
                            (event.type === "session" || event.type === "appointment") && "cursor-pointer"
                          )}
                          style={getEventBgColor(event)}
                          onClick={() => handleEventClick(event)}
                        >
                          <div className="font-medium mb-1">{event.name}</div>
                          <div>
                            {event.type === "appointment" && event.member && (
                              <div className="text-xs opacity-75">
                                {`${event.member.firstName} ${event.member.lastName}`}
                              </div>
                            )}
                          </div>
                          <div className="flex justify-between">
                            {event.startTime && event.endTime && (
                              <div className="text-xs opacity-75">
                                {`${formatTime(event.startTime)} - ${formatTime(event.endTime)}`}
                              </div>
                            )}
                            {event.type === "session" && event.capacity !== undefined && event.bookings !== undefined && (
                              <div className="text-xs opacity-75">
                                {`${event.bookings}/${event.capacity}`}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            ))
          )}
        </CardContent>
      </Card>
    );
  }
);

Timeline.displayName = "Timeline";

export { Timeline };