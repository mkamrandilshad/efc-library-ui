"use client"

import * as React from "react"
import { useCurrentEditor } from "@tiptap/react"
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Image as ImageIcon,
  Link as LinkIcon,
  Paperclip,
  FileText,
  Mail,
} from "lucide-react"
import { Button } from "@/components/button"
import { Toggle } from "@/components/toggle"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/popover"
import { Input } from "@/components/input"
import { Separator } from "@/components/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/dropdown-menu"
import { Template, MergeField } from "./types"

export interface MenuBarProps {
  hasMergeFields?: boolean
  hasTemplates?: boolean
  hasFormInputs?: boolean
  templates?: Template[]
  mergeFields?: MergeField[]
  mergeFieldFilter?: (field: MergeField) => boolean
  onFileUpload?: (file: File) => Promise<{ id: string; filename: string }>
}

export const MenuBar = React.forwardRef<HTMLDivElement, MenuBarProps>(
  (
    {
      hasMergeFields = false,
      hasTemplates = false,
      templates = [],
      mergeFields = [],
      mergeFieldFilter,
      onFileUpload,
    },
    ref
  ) => {
    const { editor } = useCurrentEditor()

    if (!editor) {
      return null
    }

    const filteredMergeFields = mergeFieldFilter
      ? mergeFields.filter(mergeFieldFilter)
      : mergeFields

    const handleImageUpload = () => {
      const input = document.createElement("input")
      input.type = "file"
      input.accept = "image/*"
      input.onchange = async (e) => {
        const file = (e.target as HTMLInputElement).files?.[0]
        if (file) {
          const reader = new FileReader()
          reader.onload = (e) => {
            const src = e.target?.result as string
            editor.chain().focus().setImage({ src }).run()
          }
          reader.readAsDataURL(file)
        }
      }
      input.click()
    }

    const handleLink = () => {
      const previousUrl = editor.getAttributes("link").href
      const url = window.prompt("URL", previousUrl)

      if (url === null) {
        return
      }

      if (url === "") {
        editor.chain().focus().extendMarkRange("link").unsetLink().run()
        return
      }

      editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run()
    }

    const handleAttachment = () => {
      const input = document.createElement("input")
      input.type = "file"
      input.onchange = async (e) => {
        const file = (e.target as HTMLInputElement).files?.[0]
        if (file && onFileUpload) {
          try {
            await onFileUpload(file)
          } catch (error) {
            console.error("File upload failed:", error)
          }
        }
      }
      input.click()
    }

    const insertTemplate = (template: Template) => {
      editor.chain().focus().insertContent(template.content).run()
    }

    const insertMergeField = (field: MergeField) => {
      editor.chain().focus().insertContent(`{{${field.value}}}`).run()
    }

    const fontFamilies = [
      { value: "sans-serif", label: "Sans Serif" },
      { value: "serif", label: "Serif" },
      { value: "monospace", label: "Monospace" },
    ]

    const fontSizes = [
      { value: "8px", label: "8px" },
      { value: "10px", label: "10px" },
      { value: "12px", label: "12px" },
      { value: "14px", label: "14px" },
      { value: "16px", label: "16px" },
      { value: "18px", label: "18px" },
      { value: "20px", label: "20px" },
      { value: "24px", label: "24px" },
    ]

    const textStyleAttrs = editor.getAttributes("textStyle")
    const currentFontFamily = textStyleAttrs.fontFamily || "sans-serif"
    const currentFontSize = textStyleAttrs.fontSize || "10px"
    const currentColor = textStyleAttrs.color || "#000000"
    const currentHighlight = editor.getAttributes("highlight").color || "#ffff00"

    return (
      <div
        ref={ref}
        className="flex flex-wrap items-center gap-1 border-b border-border p-2"
      >
        {/* Font Family */}
        <Select
          value={currentFontFamily}
          onValueChange={(value) => {
            ;(editor.chain().focus() as any).setFontFamily(value).run()
          }}
        >
          <SelectTrigger className="h-8 w-[120px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {fontFamilies.map((font) => (
              <SelectItem key={font.value} value={font.value}>
                {font.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Font Size */}
        <Select
          value={currentFontSize}
          onValueChange={(value) => {
            ;(editor.chain().focus() as any).setFontSize(value).run()
          }}
        >
          <SelectTrigger className="h-8 w-[80px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {fontSizes.map((size) => (
              <SelectItem key={size.value} value={size.value}>
                {size.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Separator orientation="vertical" className="h-6" />

        {/* Text Formatting */}
        <Toggle
          pressed={editor.isActive("bold")}
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
          size="sm"
          aria-label="Bold"
        >
          <Bold className="h-4 w-4" />
        </Toggle>

        <Toggle
          pressed={editor.isActive("italic")}
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}
          size="sm"
          aria-label="Italic"
        >
          <Italic className="h-4 w-4" />
        </Toggle>

        <Toggle
          pressed={editor.isActive("underline")}
          onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
          size="sm"
          aria-label="Underline"
        >
          <Underline className="h-4 w-4" />
        </Toggle>

        <Separator orientation="vertical" className="h-6" />

        {/* Text Color */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              <div
                className="h-4 w-4 rounded border border-border"
                style={{ backgroundColor: currentColor }}
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64">
            <div className="space-y-2">
              <label className="text-sm font-medium">Text Color</label>
              <Input
                type="color"
                value={currentColor}
                onChange={(e) => {
                  editor.chain().focus().setColor(e.target.value).run()
                }}
                className="h-10 w-full"
              />
            </div>
          </PopoverContent>
        </Popover>

        {/* Highlight Color */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              <div
                className="h-4 w-4 rounded border border-border"
                style={{ backgroundColor: currentHighlight }}
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64">
            <div className="space-y-2">
              <label className="text-sm font-medium">Highlight Color</label>
              <Input
                type="color"
                value={currentHighlight}
                onChange={(e) => {
                  editor.chain().focus().toggleHighlight({ color: e.target.value }).run()
                }}
                className="h-10 w-full"
              />
            </div>
          </PopoverContent>
        </Popover>

        <Separator orientation="vertical" className="h-6" />

        {/* Alignment */}
        <Toggle
          pressed={editor.isActive({ textAlign: "left" })}
          onPressedChange={() =>
            editor.chain().focus().setTextAlign("left").run()
          }
          size="sm"
          aria-label="Align Left"
        >
          <AlignLeft className="h-4 w-4" />
        </Toggle>

        <Toggle
          pressed={editor.isActive({ textAlign: "center" })}
          onPressedChange={() =>
            editor.chain().focus().setTextAlign("center").run()
          }
          size="sm"
          aria-label="Align Center"
        >
          <AlignCenter className="h-4 w-4" />
        </Toggle>

        <Toggle
          pressed={editor.isActive({ textAlign: "right" })}
          onPressedChange={() =>
            editor.chain().focus().setTextAlign("right").run()
          }
          size="sm"
          aria-label="Align Right"
        >
          <AlignRight className="h-4 w-4" />
        </Toggle>

        <Toggle
          pressed={editor.isActive({ textAlign: "justify" })}
          onPressedChange={() =>
            editor.chain().focus().setTextAlign("justify").run()
          }
          size="sm"
          aria-label="Justify"
        >
          <AlignJustify className="h-4 w-4" />
        </Toggle>

        <Separator orientation="vertical" className="h-6" />

        {/* Lists */}
        <Toggle
          pressed={editor.isActive("bulletList")}
          onPressedChange={() =>
            editor.chain().focus().toggleBulletList().run()
          }
          size="sm"
          aria-label="Bullet List"
        >
          <List className="h-4 w-4" />
        </Toggle>

        <Toggle
          pressed={editor.isActive("orderedList")}
          onPressedChange={() =>
            editor.chain().focus().toggleOrderedList().run()
          }
          size="sm"
          aria-label="Numbered List"
        >
          <ListOrdered className="h-4 w-4" />
        </Toggle>

        <Separator orientation="vertical" className="h-6" />

        {/* Insert */}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleImageUpload}
          aria-label="Insert Image"
        >
          <ImageIcon className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleLink}
          aria-label="Insert Link"
        >
          <LinkIcon className="h-4 w-4" />
        </Button>

        {onFileUpload && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAttachment}
            aria-label="Attach File"
          >
            <Paperclip className="h-4 w-4" />
          </Button>
        )}

        {/* Templates */}
        {hasTemplates && templates.length > 0 && (
          <>
            <Separator orientation="vertical" className="h-6" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button type="button" variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  Templates
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuLabel>Templates</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {templates.map((template) => (
                  <DropdownMenuItem
                    key={template.id}
                    onSelect={() => insertTemplate(template)}
                  >
                    {template.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}

        {/* Mail Merge */}
        {hasMergeFields && filteredMergeFields.length > 0 && (
          <>
            <Separator orientation="vertical" className="h-6" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button type="button" variant="outline" size="sm">
                  <Mail className="h-4 w-4 mr-2" />
                  Mail Merge
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56 max-h-[300px] overflow-y-auto">
                <DropdownMenuLabel>Mail Merge Fields</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {filteredMergeFields.map((field) => (
                  <DropdownMenuItem
                    key={field.id}
                    onSelect={() => insertMergeField(field)}
                  >
                    <div className="flex flex-col items-start">
                      <span className="font-medium">{field.label}</span>
                      {field.category && (
                        <span className="text-xs text-muted-foreground">
                          {field.category}
                        </span>
                      )}
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
      </div>
    )
  }
)

MenuBar.displayName = "MenuBar"
