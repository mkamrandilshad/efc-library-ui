import * as React from "react"
import { ThumbsUp, MoreVertical, Bell, Flag } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/avatar"
import { Input } from "@/components/input"
import { Separator } from "@/components/separator"
import { Attachment } from "@/components/attachment"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/dropdown-menu"

export interface FeedPostProps extends React.HTMLAttributes<HTMLDivElement> {
  avatar?: string
  avatarFallback?: string
  name: string
  timestamp: string
  reference?: string
  content: string
  attachment?: {
    filename: string
    onClick?: () => void
  }
  imageUrl?: string
  likeCount?: number
  isLiked?: boolean
  onLike?: () => void
  onComment?: (comment: string) => void
  showActions?: boolean
}

const FeedPost = React.forwardRef<HTMLDivElement, FeedPostProps>(
  (
    {
      className,
      avatar,
      avatarFallback,
      name,
      timestamp,
      reference,
      content,
      attachment,
      imageUrl,
      likeCount = 0,
      isLiked = false,
      onLike,
      onComment,
      showActions = true,
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
                  <span className="text-sm font-semibold text-foreground">{name}</span>
                  <span className="text-xs text-muted-foreground">{timestamp}</span>
                </div>
              </div>
              {showActions && (
                <div className="flex items-center gap-2">
                  <button className="h-8 w-8 flex items-center justify-center rounded-sm hover:bg-accent">
                    <Bell className="h-4 w-4" />
                  </button>
                  <button className="h-8 w-8 flex items-center justify-center rounded-sm hover:bg-accent">
                    <Flag className="h-4 w-4" />
                  </button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="h-8 w-8 flex items-center justify-center rounded-sm hover:bg-accent">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
            </div>

            {/* Reference Line */}
            {reference && (
              <div className="text-sm text-primary font-medium">
                {reference}
              </div>
            )}

            {/* Content */}
            <div className="text-sm text-foreground whitespace-pre-wrap">
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
            <div className="space-y-3">
              <Separator />
              <div className="flex items-center gap-4">
                <button
                  onClick={onLike}
                  className={cn(
                    "flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors",
                    isLiked && "text-primary"
                  )}
                >
                  <ThumbsUp className="h-4 w-4" />
                  <span>{likeCount}</span>
                </button>
                <form onSubmit={handleCommentSubmit} className="flex-1">
                  <Input
                    type="text"
                    placeholder="Write a comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="w-full"
                  />
                </form>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }
)
FeedPost.displayName = "FeedPost"

export { FeedPost }
