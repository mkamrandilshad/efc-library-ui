"use client"

import * as React from "react"
import { X } from "lucide-react"
import { Button } from "@/components/button"
import { FileAttachment } from "./types"
import { cn } from "@/lib/utils"

export interface SelectedFilesProps {
  files: FileAttachment[]
  onDeleteFile: (id: string) => void
  className?: string
}

export const SelectedFiles = React.forwardRef<HTMLDivElement, SelectedFilesProps>(
  ({ files, onDeleteFile, className }, ref) => {
    if (files.length === 0) {
      return null
    }

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-wrap gap-2 border-t border-border p-2",
          className
        )}
      >
        {files.map((file) => (
          <div
            key={file.id}
            className="flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-sm"
          >
            <span className="text-muted-foreground">{file.filename}</span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-5 w-5"
              onClick={() => onDeleteFile(file.id)}
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Remove file</span>
            </Button>
          </div>
        ))}
      </div>
    )
  }
)

SelectedFiles.displayName = "SelectedFiles"
