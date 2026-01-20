"use client"

import * as React from "react"
import { EditorProvider } from "@tiptap/react"
import { extensions } from "./extensions"
import { MenuBar } from "./menu-bar"
import { SelectedFiles } from "./selected-files"
import { RichTextEditorProps, FileAttachment } from "./types"
import { cn } from "@/lib/utils"

export const RichTextEditor = React.forwardRef<HTMLDivElement, RichTextEditorProps>(
  (
    {
      hasMergeFields = false,
      hasTemplates = false,
      hasFormInputs = false,
      hideMenuBar = false,
      onFileUpload,
      onFileChange,
      onContentChange,
      defaultContent = "",
      mergeFieldFilter,
      templates = [],
      mergeFields = [],
      className,
    },
    ref
  ) => {
    const [files, setFiles] = React.useState<FileAttachment[]>([])

    React.useEffect(() => {
      onFileChange?.(files)
    }, [files])

    const handleFileUpload = async (file: File) => {
      if (onFileUpload) {
        const result = await onFileUpload(file)
        setFiles((prev) => [...prev, result])
        return result
      }
      throw new Error("onFileUpload callback is required for file uploads")
    }

    const handleDeleteFile = (id: string) => {
      setFiles((prev) => prev.filter((file) => file.id !== id))
    }

    return (
      <div
        ref={ref}
        className={cn("border rounded hover:cursor-text", className)}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <EditorProvider
          onUpdate={(e: { editor: { getHTML: () => string } }) => {
            onContentChange?.(e.editor.getHTML())
          }}
          slotBefore={
            !hideMenuBar && (
              <MenuBar
                hasMergeFields={hasMergeFields}
                hasTemplates={hasTemplates}
                hasFormInputs={hasFormInputs}
                templates={templates}
                mergeFields={mergeFields}
                mergeFieldFilter={mergeFieldFilter}
                onFileUpload={onFileUpload ? handleFileUpload : undefined}
              />
            )
          }
          slotAfter={files.length > 0 ? <SelectedFiles files={files} onDeleteFile={handleDeleteFile} /> : undefined}
          extensions={extensions}
          editorProps={{
            attributes: {
              class: "min-h-[250px] p-4 focus:outline-none",
            },
          }}
          content={defaultContent}
        />
      </div>
    )
  }
)

RichTextEditor.displayName = "RichTextEditor"
