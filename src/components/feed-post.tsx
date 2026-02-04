import * as React from "react"
import { ThumbsUp, MoreVertical, Bell, Flag, LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/avatar"
import { Input } from "@/components/input"
import { Separator } from "@/components/separator"
import { Attachment } from "@/components/attachment"
import { Comment, CommentMenuItem } from "@/components/comment"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/dropdown-menu"

export interface ActionButton {
  icon: LucideIcon
  onClick?: () => void
  className?: string
  ariaLabel?: string
}

export interface MenuItem {
  label: string
  onClick?: () => void
  className?: string
  icon?: LucideIcon
}

export interface FeedPostComment {
  id?: string | number
  avatar?: string
  avatarFallback?: string
  name: string
  nameClassName?: string
  timestamp: string
  timestampClassName?: string
  content: React.ReactNode
  contentClassName?: string
  backgroundColor?: string
  menuItems?: CommentMenuItem[]
  showMenuIcon?: boolean
  menuIconClassName?: string
}

export interface FeedPostProps extends React.HTMLAttributes<HTMLDivElement> {
  // User Info
  avatar?: string
  avatarFallback?: string
  name: string
  nameClassName?: string
  timestamp: string
  timestampClassName?: string

  // Content
  reference?: string
  referenceClassName?: string
  content: string
  contentClassName?: string

  // Attachments
  attachment?: {
    filename: string
    onClick?: () => void
  }
  imageUrl?: string

  // Action Buttons (top right)
  showBellIcon?: boolean
  showFlagIcon?: boolean
  showMenuIcon?: boolean
  onBellClick?: () => void
  onFlagClick?: () => void
  bellIconClassName?: string
  flagIconClassName?: string
  menuIconClassName?: string
  actionButtons?: ActionButton[]
  menuItems?: MenuItem[]

  // Interactions (bottom)
  showLikeButton?: boolean
  likeCount?: number
  likeLabel?: string
  isLiked?: boolean
  onLike?: () => void
  likeIcon?: LucideIcon
  likeButtonClassName?: string

  // Likes Info (e.g., "Fizza Rehan likes this")
  likesInfo?: string
  likesInfoClassName?: string

  // Comment Input
  showCommentInput?: boolean
  commentPlaceholder?: string
  commentInputClassName?: string
  onComment?: (comment: string) => void

  // Comments Display
  comments?: FeedPostComment[]
  commentsClassName?: string
  renderComment?: (comment: FeedPostComment, index: number) => React.ReactNode

  // Custom Render Props
  renderActions?: () => React.ReactNode
  renderInteractions?: () => React.ReactNode
}

const FeedPost = React.forwardRef<HTMLDivElement, FeedPostProps>(
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
      reference,
      referenceClassName,
      content,
      contentClassName,

      // Attachments
      attachment,
      imageUrl,

      // Action Buttons
      showBellIcon = false,
      showFlagIcon = false,
      showMenuIcon = true,
      onBellClick,
      onFlagClick,
      bellIconClassName,
      flagIconClassName,
      menuIconClassName,
      actionButtons,
      menuItems,

      // Interactions
      showLikeButton = true,
      likeCount = 0,
      likeLabel,
      isLiked = false,
      onLike,
      likeIcon: LikeIcon = ThumbsUp,
      likeButtonClassName,

      // Likes Info
      likesInfo,
      likesInfoClassName,

      // Comment Input
      showCommentInput = true,
      commentPlaceholder = "Write a comment...",
      commentInputClassName,
      onComment,

      // Comments Display
      comments,
      commentsClassName,
      renderComment,

      // Custom Render Props
      renderActions,
      renderInteractions,

      ...props
    },
    ref
  ) => {
    const [commentText, setCommentText] = React.useState("")

    const handleCommentSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      if (commentText.trim() && onComment) {
        onComment(commentText)
        setCommentText("")
      }
    }

    // Default menu items if none provided
    const defaultMenuItems: MenuItem[] = [
      { label: "Edit", onClick: () => { } },
      { label: "Delete", onClick: () => { } },
    ]

    const effectiveMenuItems = menuItems || defaultMenuItems

    return (
      <Card ref={ref} className={cn("", className)} {...props}>
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  {avatar && <AvatarImage src={avatar} alt={name} />}
                  <AvatarFallback>{avatarFallback || name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className={cn("text-sm font-semibold text-foreground", nameClassName)}>
                    {name}
                  </span>
                  <span className={cn("text-xs text-muted-foreground", timestampClassName)}>
                    {timestamp}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              {renderActions ? (
                renderActions()
              ) : (
                <div className="flex items-center gap-2">
                  {/* Custom Action Buttons */}
                  {actionButtons?.map((btn, index) => {
                    const Icon = btn.icon
                    return (
                      <button
                        key={index}
                        onClick={btn.onClick}
                        aria-label={btn.ariaLabel}
                        className={cn(
                          "h-8 w-8 flex items-center justify-center rounded-sm hover:bg-accent",
                          btn.className
                        )}
                      >
                        <Icon className="h-4 w-4" />
                      </button>
                    )
                  })}

                  {/* Bell Icon */}
                  {showBellIcon && (
                    <button
                      onClick={onBellClick}
                      aria-label="Notifications"
                      className={cn(
                        "h-8 w-8 flex items-center justify-center rounded-sm hover:bg-accent",
                        bellIconClassName
                      )}
                    >
                      <Bell className="h-4 w-4" />
                    </button>
                  )}

                  {/* Flag Icon */}
                  {showFlagIcon && (
                    <button
                      onClick={onFlagClick}
                      aria-label="Flag"
                      className={cn(
                        "h-8 w-8 flex items-center justify-center rounded-sm hover:bg-accent",
                        flagIconClassName
                      )}
                    >
                      <Flag className="h-4 w-4" />
                    </button>
                  )}

                  {/* Menu Icon */}
                  {showMenuIcon && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          aria-label="More options"
                          className={cn(
                            "h-8 w-8 flex items-center justify-center rounded-sm hover:bg-accent",
                            menuIconClassName
                          )}
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
                  )}
                </div>
              )}
            </div>

            {/* Reference Line */}
            {reference && (
              <div className={cn("text-sm text-primary font-medium", referenceClassName)}>
                {reference}
              </div>
            )}

            {/* Content */}
            <div className={cn("text-sm text-foreground whitespace-pre-wrap", contentClassName)}>
              {content}
            </div>

            {/* Attachment */}
            {attachment && (
              <Attachment
                filename={attachment.filename}
                onClick={attachment.onClick}
              />
            )}

            {/* Image */}
            {imageUrl && (
              <div className="rounded-md overflow-hidden">
                <img
                  src={imageUrl}
                  alt="Post attachment"
                  className="w-full h-auto object-cover"
                />
              </div>
            )}

            {/* Interactions */}
            {(showLikeButton || showCommentInput || likesInfo || comments) && (
              <div className="space-y-3">
                <Separator />

                {/* Likes Info (e.g., "Fizza Rehan likes this") */}
                {likesInfo && (
                  <div className={cn("flex items-center justify-end gap-2 text-sm", likesInfoClassName)}>
                    <ThumbsUp className="h-4 w-4" />
                    <span>{likesInfo}</span>
                  </div>
                )}

                {renderInteractions ? (
                  renderInteractions()
                ) : (
                  <div className="flex items-center gap-4">
                    {/* Like Button */}
                    {showLikeButton && (
                      <button
                        onClick={onLike}
                        className={cn(
                          "flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors",
                          isLiked && "text-primary",
                          likeButtonClassName
                        )}
                      >
                        <LikeIcon className="h-4 w-4" />
                        <span>{likeLabel || likeCount}</span>
                      </button>
                    )}

                    {/* Comment Input */}
                    {showCommentInput && (
                      <form onSubmit={handleCommentSubmit} className="flex-1">
                        <Input
                          type="text"
                          placeholder={commentPlaceholder}
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                          className={cn("w-full", commentInputClassName)}
                        />
                      </form>
                    )}
                  </div>
                )}

                {/* Comments List */}
                {comments && comments.length > 0 && (
                  <div className={cn("space-y-2 mt-4", commentsClassName)}>
                    {comments.map((comment, index) => (
                      renderComment ? (
                        <React.Fragment key={comment.id || index}>
                          {renderComment(comment, index)}
                        </React.Fragment>
                      ) : (
                        <Comment
                          key={comment.id || index}
                          avatar={comment.avatar}
                          avatarFallback={comment.avatarFallback}
                          name={comment.name}
                          nameClassName={comment.nameClassName}
                          timestamp={comment.timestamp}
                          timestampClassName={comment.timestampClassName}
                          content={comment.content}
                          contentClassName={comment.contentClassName}
                          backgroundColor={comment.backgroundColor}
                          menuItems={comment.menuItems}
                          showMenuIcon={comment.showMenuIcon}
                          menuIconClassName={comment.menuIconClassName}
                        />
                      )
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }
)
FeedPost.displayName = "FeedPost"

export { FeedPost }
