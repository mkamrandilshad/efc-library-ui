import * as React from "react"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/card"

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: LucideIcon
  value: string | number
  title: string
  subtitle?: string
  variant?: "default" | "positive" | "negative"
}

const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  ({ className, icon: Icon, value, title, subtitle, variant = "default", ...props }, ref) => {
    const valueColorClass = 
      variant === "positive" ? "text-green-600" :
      variant === "negative" ? "text-orange-600" :
      "text-green-600"

    return (
      <Card ref={ref} className={cn("", className)} {...props}>
        <CardContent className="p-6">
          <div className="flex flex-col space-y-2">
            {Icon && (
              <div className="flex items-center justify-start mb-2">
                <Icon className="h-6 w-6 text-primary" />
              </div>
            )}
            <div className={cn("text-3xl font-bold", valueColorClass)}>
              {value}
            </div>
            <div className="text-base font-semibold text-foreground">
              {title}
            </div>
            {subtitle && (
              <div className="text-sm text-muted-foreground">
                {subtitle}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }
)
StatCard.displayName = "StatCard"

export { StatCard }
