export interface Template {
  id: string
  name: string
  content: string
}

export interface MergeField {
  id: string
  label: string
  value: string
  category?: string
}

export interface FileAttachment {
  id: string
  filename: string
}

export interface RichTextEditorProps {
  hasMergeFields?: boolean
  hasTemplates?: boolean
  hasFormInputs?: boolean
  hideMenuBar?: boolean
  onFileUpload?: (file: File) => Promise<{ id: string; filename: string }>
  onFileChange?: (files: FileAttachment[]) => void
  onContentChange?: (html: string) => void
  defaultContent?: string
  mergeFieldFilter?: (field: MergeField) => boolean
  templates?: Template[]
  mergeFields?: MergeField[]
  className?: string
}
