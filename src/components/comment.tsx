import * as React from "react"
import { MoreVertical, LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/dropdown-menu"

export interface CommentMenuItem {
  label: string
  onClick?: () => void
  className?: string
  icon?: LucideIcon
}

export interface CommentProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "content"> {
  // User Info
  avatar?: string
  avatarFallback?: string
  name: string
  nameClassName?: string
  timestamp: string
  timestampClassName?: string

  // Content
  content: React.ReactNode
  contentClassName?: string

  // Layout
  isNested?: boolean
  backgroundColor?: string

  // Actions
  showMenuIcon?: boolean
  menuIconClassName?: string
  menuItems?: CommentMenuItem[]

  // Legacy support
  showActions?: boolean
  onAction?: (action: string) => void

  // Custom render
  renderActions?: () => React.ReactNode
}

const Comment = React.forwardRef<HTMLDivElement, CommentProps>(
  (
    {
      className,
      // User Info
      avatar,
      avatarFallback,
      name,
      nameClassName,
      timestamp,
      timestampClassName,

      // Content
      content,
      contentClassName,

      // Layout
      isNested = false,
      backgroundColor,

      // Actions
      showMenuIcon = true,
      menuIconClassName,
      menuItems,

      // Legacy support
      showActions,
      onAction,

      // Custom render
      renderActions,

      ...props
    },
    ref
  ) => {
    // Legacy support: if showActions is explicitly set, use it; otherwise use showMenuIcon
    const shouldShowMenu = showActions !== undefined ? showActions : showMenuIcon

    // Default menu items if none provided and using legacy onAction
    const defaultMenuItems: CommentMenuItem[] = [
      { label: "Edit", onClick: () => onAction?.("edit") },
      { label: "Delete", onClick: () => onAction?.("delete") },
    ]

    const effectiveMenuItems = menuItems || (onAction ? defaultMenuItems : [])

    return (
      <div
        ref={ref}
        className={cn(
          "flex gap-3 p-3 rounded-md",
          isNested && "ml-12",
          backgroundColor,
          className
        )}
        {...props}
      >
        <Avatar className="h-8 w-8 shrink-0">
          {avatar && <AvatarImage src={avatar} alt={name} />}
          <AvatarFallback>{avatarFallback || name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={cn("text-sm font-semibold text-foreground", nameClassName)}>
              {name}
            </span>
            <span className={cn("text-xs text-muted-foreground", timestampClassName)}>
              {timestamp}
            </span>
            {renderActions ? (
              renderActions()
            ) : shouldShowMenu && effectiveMenuItems.length > 0 ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className={cn(
                      "ml-auto h-6 w-6 flex items-center justify-center rounded-sm hover:bg-accent",
                      menuIconClassName
                    )}
                    aria-label="Comment options"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {effectiveMenuItems.map((item, index) => {
                    const ItemIcon = item.icon
                    return (
                      <DropdownMenuItem
                        key={index}
                        onClick={item.onClick}
                        className={item.className}
                      >
                        {ItemIcon && <ItemIcon className="h-4 w-4 mr-2" />}
                        {item.label}
                      </DropdownMenuItem>
                    )
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : null}
          </div>
          <div className={cn("text-sm text-foreground", contentClassName)}>
            {content}
          </div>
        </div>
      </div>
    )
  }
)
Comment.displayName = "Comment"

export { Comment }
