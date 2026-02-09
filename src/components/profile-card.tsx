import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/avatar"
import { Button } from "@/components/button"
import { Separator } from "@/components/separator"

export type ProfileValueType = 
  | { type: "text"; value: string }
  | { type: "tag"; value: string; className?: string }
  | { type: "custom"; component: React.ReactNode }

export interface ProfileDetail {
  label: string
  value: ProfileValueType
  labelClassName?: string
  valueClassName?: string
  containerClassName?: string
  showSeparator?: boolean
}

export interface ProfileCardAvatar {
  src?: string
  fallback?: string
  alt?: string
  className?: string
  size?: "sm" | "md" | "lg" | "xl"
  show?: boolean
}

export interface ProfileCardHeader {
  title?: string
  subtitle?: string
  className?: string
  titleClassName?: string
  subtitleClassName?: string
}

export interface ProfileCardActions {
  label: string
  onClick: () => void
  variant?: "default" | "outline" | "ghost" | "destructive" | "secondary"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
  disabled?: boolean
}

export interface ProfileCardLayout {
  direction?: "vertical" | "horizontal"
  spacing?: "sm" | "md" | "lg" | "xl"
  padding?: "sm" | "md" | "lg" | "xl"
  alignment?: "start" | "center" | "end"
  actionsPosition?: "start" | "center" | "end"
}

export interface ProfileCardStyles {
  card?: string
  content?: string
  container?: string
  detailsContainer?: string
  detailItem?: string
  label?: string
  value?: string
  separator?: string
  actionsContainer?: string
}

export interface ProfileCardProps extends React.HTMLAttributes<HTMLDivElement> {
  avatar?: ProfileCardAvatar
  header?: ProfileCardHeader
  details: ProfileDetail[]
  actions?: ProfileCardActions[]
  layout?: ProfileCardLayout
  styles?: ProfileCardStyles
}

const ProfileCard = React.forwardRef<HTMLDivElement, ProfileCardProps>(
  (
    {
      className,
      avatar,
      header,
      details,
      actions,
      layout,
      styles,
      ...props
    },
    ref
  ) => {
    // Default layout configurations
    const defaultLayout: ProfileCardLayout = {
      direction: "vertical",
      spacing: "md",
      padding: "md",
      alignment: "center",
      actionsPosition: "end",
      ...layout
    }

    // Default styles
    const defaultStyles: ProfileCardStyles = {
      card: "",
      content: "",
      container: "",
      detailsContainer: "",
      detailItem: "",
      label: "text-sm text-muted-foreground",
      value: "text-sm font-medium text-foreground",
      separator: "",
      actionsContainer: "",
      ...styles
    }

    // Spacing classes
    const spacingClasses = {
      sm: "space-y-2",
      md: "space-y-4",
      lg: "space-y-6",
      xl: "space-y-8"
    }

    // Padding classes
    const paddingClasses = {
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
      xl: "p-10"
    }

    // Avatar size classes
    const avatarSizeClasses = {
      sm: "h-12 w-12",
      md: "h-16 w-16",
      lg: "h-20 w-20",
      xl: "h-24 w-24"
    }

    // Alignment classes
    const alignmentClasses = {
      start: "items-start",
      center: "items-center",
      end: "items-end"
    }

    // Actions position classes
    const actionsPositionClasses = {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end"
    }

    // Render value based on type
    const renderValue = (value: ProfileValueType) => {
      switch (value.type) {
        case "text":
          return <span>{value.value}</span>
        case "tag":
          return (
            <span
              className={cn(
                "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                value.className || "bg-purple-100 text-purple-800"
              )}
            >
              {value.value}
            </span>
          )
        case "custom":
          return <>{value.component}</>
        default:
          return null
      }
    }

    return (
      <Card 
        ref={ref} 
        className={cn(defaultStyles.card, className)} 
        {...props}
      >
        <CardContent className={cn(defaultStyles.content, paddingClasses[defaultLayout.padding!])}>
          <div 
            className={cn(
              "flex",
              defaultLayout.direction === "horizontal" ? "flex-row" : "flex-col",
              spacingClasses[defaultLayout.spacing!],
              alignmentClasses[defaultLayout.alignment!],
              defaultStyles.container
            )}
          >
            {/* Avatar Section */}
            {avatar?.show !== false && avatar && (
              <Avatar className={cn(
                avatarSizeClasses[avatar.size || "lg"],
                avatar.className
              )}>
                {avatar.src && <AvatarImage src={avatar.src} alt={avatar.alt || "Profile"} className={avatar.className}/>}
                <AvatarFallback className="text-2xl">
                  {avatar.fallback || "?"}
                </AvatarFallback>
              </Avatar>
            )}

            {/* Header Section */}
            {header && (
              <div className={cn("w-full text-left space-y-1", header.className)}>
                {header.title && (
                  <h3 className={cn("text-lg font-semibold", header.titleClassName)}>
                    {header.title}
                  </h3>
                )}
                {header.subtitle && (
                  <p className={cn("text-sm text-muted-foreground", header.subtitleClassName)}>
                    {header.subtitle}
                  </p>
                )}
              </div>
            )}

            {/* Details Section */}
            <div className={cn("w-full", defaultStyles.detailsContainer)}>
              {details.map((detail, index) => (
                <React.Fragment key={index}>
                  <div className={cn(
                    "flex items-center justify-between py-3",
                    defaultStyles.detailItem,
                    detail.containerClassName
                  )}>
                    <span className={cn(defaultStyles.label, detail.labelClassName)}>
                      {detail.label}
                    </span>
                    <span className={cn(defaultStyles.value, detail.valueClassName)}>
                      {renderValue(detail.value)}
                    </span>
                  </div>
                  {(detail.showSeparator !== false && index < details.length - 1) && (
                    <Separator className={defaultStyles.separator} />
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Actions Section */}
            {actions && actions.length > 0 && (
              <div className={cn(
                "flex items-center gap-2 w-full",
                actionsPositionClasses[defaultLayout.actionsPosition!],
                defaultStyles.actionsContainer
              )}>
                {actions.map((action, index) => (
                  <Button
                    key={index}
                    variant={action.variant || "outline"}
                    size={action.size || "default"}
                    onClick={action.onClick}
                    disabled={action.disabled}
                    className={action.className}
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }
)
ProfileCard.displayName = "ProfileCard"

export { ProfileCard }
