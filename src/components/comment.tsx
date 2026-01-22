import * as React from "react"
import { MoreVertical } from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/dropdown-menu"

export interface CommentProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "content"> {
  avatar?: string
  avatarFallback?: string
  name: string
  timestamp: string
  content: React.ReactNode
  isNested?: boolean
  showActions?: boolean
  onAction?: (action: string) => void
}

const Comment = React.forwardRef<HTMLDivElement, CommentProps>(
  (
    {
      className,
      avatar,
      avatarFallback,
      name,
      timestamp,
      content,
      isNested = false,
      showActions = true,
      onAction,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex gap-3",
          isNested && "ml-12",
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
            <span className="text-sm font-semibold text-foreground">{name}</span>
            <span className="text-xs text-muted-foreground">{timestamp}</span>
            {showActions && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="ml-auto h-6 w-6 flex items-center justify-center rounded-sm hover:bg-accent">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onAction?.("edit")}>
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onAction?.("delete")}>
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
          <div className="text-sm text-foreground">{content}</div>
        </div>
      </div>
    )
  }
)
Comment.displayName = "Comment"

export { Comment }
