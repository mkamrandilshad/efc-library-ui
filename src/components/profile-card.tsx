import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/avatar"
import { Button } from "@/components/button"
import { Separator } from "@/components/separator"

interface ProfileDetail {
  label: string
  value: string
}

export interface ProfileCardProps extends React.HTMLAttributes<HTMLDivElement> {
  avatar?: string
  avatarFallback?: string
  details: ProfileDetail[]
  actions?: {
    label: string
    onClick: () => void
    variant?: "default" | "outline" | "ghost"
  }[]
}

const ProfileCard = React.forwardRef<HTMLDivElement, ProfileCardProps>(
  (
    {
      className,
      avatar,
      avatarFallback,
      details,
      actions,
      ...props
    },
    ref
  ) => {
    return (
      <Card ref={ref} className={cn("", className)} {...props}>
        <CardContent className="p-6">
          <div className="flex flex-col items-center space-y-6">
            {/* Avatar */}
            <Avatar className="h-24 w-24">
              {avatar && <AvatarImage src={avatar} alt="Profile" />}
              <AvatarFallback className="text-2xl">
                {avatarFallback || "?"}
              </AvatarFallback>
            </Avatar>

            {/* Details */}
            <div className="w-full space-y-0">
              {details.map((detail, index) => (
                <React.Fragment key={index}>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-sm text-muted-foreground">
                      {detail.label}
                    </span>
                    <span className="text-sm font-medium text-foreground">
                      {detail.value}
                    </span>
                  </div>
                  {index < details.length - 1 && <Separator />}
                </React.Fragment>
              ))}
            </div>

            {/* Actions */}
            {actions && actions.length > 0 && (
              <div className="flex items-center gap-2 w-full justify-end">
                {actions.map((action, index) => (
                  <Button
                    key={index}
                    variant={action.variant || "outline"}
                    onClick={action.onClick}
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

export { ProfileCard, type ProfileDetail }
