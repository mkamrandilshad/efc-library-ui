"use client"

import * as React from "react"
import { NodeViewWrapper } from "@tiptap/react"

interface ResizableImageProps {
  node: {
    attrs: {
      src: string
      alt?: string
      width?: number | string | null
      height?: number | string | null
    }
  }
  updateAttributes: (attrs: { width?: number; height?: number }) => void
  selected: boolean
}

export const ResizableImage = ({ node, updateAttributes, selected }: ResizableImageProps) => {
  const [isResizing, setIsResizing] = React.useState(false)
  const [resizeHandle, setResizeHandle] = React.useState<string | null>(null)
  const imgRef = React.useRef<HTMLImageElement>(null)
  const startPosRef = React.useRef({ x: 0, y: 0, width: 0, height: 0 })

  const handleMouseDown = (e: React.MouseEvent, handle: string) => {
    e.preventDefault()
    e.stopPropagation()
    setIsResizing(true)
    setResizeHandle(handle)
    
    if (imgRef.current) {
      const rect = imgRef.current.getBoundingClientRect()
      startPosRef.current = {
        x: e.clientX,
        y: e.clientY,
        width: rect.width,
        height: rect.height,
      }
    }
  }

  React.useEffect(() => {
    if (!isResizing) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!imgRef.current || !resizeHandle) return

      const deltaX = e.clientX - startPosRef.current.x
      const deltaY = e.clientY - startPosRef.current.y

      let newWidth = startPosRef.current.width
      let newHeight = startPosRef.current.height

      // Calculate new dimensions based on handle position
      if (resizeHandle.includes("e")) newWidth = startPosRef.current.width + deltaX
      if (resizeHandle.includes("w")) newWidth = startPosRef.current.width - deltaX
      if (resizeHandle.includes("s")) newHeight = startPosRef.current.height + deltaY
      if (resizeHandle.includes("n")) newHeight = startPosRef.current.height - deltaY

      // Maintain aspect ratio if corner handle
      if (resizeHandle.length === 2) {
        const aspectRatio = startPosRef.current.width / startPosRef.current.height
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          newHeight = newWidth / aspectRatio
        } else {
          newWidth = newHeight * aspectRatio
        }
      }

      // Apply minimum size constraints
      newWidth = Math.max(50, newWidth)
      newHeight = Math.max(50, newHeight)

      updateAttributes({
        width: Math.round(newWidth),
        height: Math.round(newHeight),
      })
    }

    const handleMouseUp = () => {
      setIsResizing(false)
      setResizeHandle(null)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isResizing, resizeHandle, updateAttributes])

  const handles = ["nw", "n", "ne", "e", "se", "s", "sw", "w"]

  return (
    <NodeViewWrapper className={`resizable-image-wrapper ${selected ? "selected" : ""}`}>
      <img
        ref={imgRef}
        src={node.attrs.src}
        alt={node.attrs.alt || ""}
        width={node.attrs.width ? Number(node.attrs.width) : undefined}
        height={node.attrs.height ? Number(node.attrs.height) : undefined}
        style={{
          width: node.attrs.width ? `${node.attrs.width}px` : "auto",
          height: node.attrs.height ? `${node.attrs.height}px` : "auto",
          maxWidth: "100%",
          display: "block",
        }}
        draggable={false}
      />
      {selected && (
        <>
          <div className="resize-outline" />
          {handles.map((handle) => (
            <div
              key={handle}
              className={`resize-handle resize-handle-${handle}`}
              onMouseDown={(e) => handleMouseDown(e, handle)}
            />
          ))}
        </>
      )}
    </NodeViewWrapper>
  )
}
