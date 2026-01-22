import * as React from "react"
import { Paperclip } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/button"

export interface AttachmentProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  filename: string
  variant?: "default" | "outline"
}

const Attachment = React.forwardRef<HTMLButtonElement, AttachmentProps>(
  ({ className, filename, variant = "outline", ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant={variant}
        className={cn(
          "w-full justify-start gap-2 h-auto py-2 px-3",
          className
        )}
        {...props}
      >
        <Paperclip className="h-4 w-4 shrink-0" />
        <span className="truncate text-sm">{filename}</span>
      </Button>
    )
  }
)
Attachment.displayName = "Attachment"

export { Attachment }
