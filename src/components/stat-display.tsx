import * as React from "react"
import { cn } from "@/lib/utils"

export interface StatDisplayProps extends React.HTMLAttributes<HTMLDivElement> {
  current: string | number
  previous?: string | number
  label: string
  subLabel?: string
}

const StatDisplay = React.forwardRef<HTMLDivElement, StatDisplayProps>(
  ({ className, current, previous, label, subLabel, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-col items-center justify-center space-y-2", className)}
        {...props}
      >
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-green-600">
            {current}
          </span>
          {previous !== undefined && (
            <>
              <span className="text-3xl font-bold text-muted-foreground">/</span>
              <span className="text-3xl font-bold text-muted-foreground">
                {previous}
              </span>
            </>
          )}
        </div>
        <div className="text-base font-semibold text-foreground ">
          {label}
        </div>
        {subLabel && (
          <div className="text-sm text-muted-foreground">
            {subLabel}
          </div>
        )}
      </div>
    )
  }
)
StatDisplay.displayName = "StatDisplay"

export { StatDisplay }
