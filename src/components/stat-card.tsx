import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader } from "@/components/card"

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: LucideIcon | React.ReactNode
  value: string | number
  value2?: string | number
  title?: string
  subtitle?: string
  variant?: "default" | "positive" | "negative" | "warning" | "success"
  color?: string
  valueSize?: "sm" | "md" | "lg" | "xl"
  asChild?: boolean
}

const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  (
    {
      className,
      icon,
      value,
      value2,
      title,
      subtitle,
      variant = "default",
      color,
      valueSize = "md",
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : Card

    const valueColorClass = color
      ? color
      : variant === "positive" || variant === "success"
      ? "text-green-600"
      : variant === "negative" || variant === "warning"
      ? "text-orange-600"
      : "text-green-600"

    const valueSizeClass = {
      sm: "text-2xl",
      md: "text-3xl",
      lg: "text-4xl",
      xl: "text-5xl",
    }[valueSize]

    const renderIcon = () => {
      if (!icon) return null

      if (React.isValidElement(icon) || typeof icon !== "function") {
        return (
          <div className="scale-[1.75] text-primary">{icon}</div>
        )
      }

      const IconComponent = icon as LucideIcon
      return (
        <div className="scale-[1.75] text-primary">
          <IconComponent className="h-6 w-6" />
        </div>
      )
    }

    return (
      <Comp ref={ref} className={cn("", className)} {...props}>
        <CardHeader className="flex-row gap-6 justify-center items-center px-2">
          {renderIcon()}
          <div className={cn("font-bold", valueSizeClass, valueColorClass)}>
            {value}
            {value2 !== undefined && (
              <>
                {" / "}
                {value2}
              </>
            )}
          </div>
        </CardHeader>
        {(title || subtitle) && (
          <CardContent className="flex flex-col gap-4 justify-center items-center px-2">
            {title && (
              <div className="text-center text-base font-semibold text-foreground">
                {title}
              </div>
            )}
            {subtitle && (
              <div className="text-center text-sm text-muted-foreground">
                {subtitle}
              </div>
            )}
          </CardContent>
        )}
      </Comp>
    )
  }
)
StatCard.displayName = "StatCard"

export { StatCard }
