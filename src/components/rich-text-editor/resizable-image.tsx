"use client"

import * as React from "react"
import { NodeViewWrapper, useCurrentEditor } from "@tiptap/react"

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
  getPos: (() => number) | undefined
}

export const ResizableImage = ({ node, updateAttributes, selected, getPos }: ResizableImageProps) => {
  const { editor } = useCurrentEditor()
  const [isResizing, setIsResizing] = React.useState(false)
  const [startX, setStartX] = React.useState(0)
  const [startY, setStartY] = React.useState(0)
  const [startWidth, setStartWidth] = React.useState(0)
  const [startHeight, setStartHeight] = React.useState(0)
  const [resizeHandle, setResizeHandle] = React.useState<string | null>(null)
  const [isSelected, setIsSelected] = React.useState(false)
  const [hoveredHandle, setHoveredHandle] = React.useState<string | null>(null)
  const imgRef = React.useRef<HTMLImageElement>(null)
  const width = node.attrs.width || "auto"
  const height = node.attrs.height || "auto"

  // Auto-size image when width/height is "auto"
  React.useEffect(() => {
    if (imgRef.current && (width === "auto" || height === "auto")) {
      const img = imgRef.current
      if (img.complete) {
        updateAttributes({
          width: img.naturalWidth,
          height: img.naturalHeight,
        })
      } else {
        img.onload = () => {
          updateAttributes({
            width: img.naturalWidth,
            height: img.naturalHeight,
          })
        }
      }
    }
  }, [])

  // Check if image is selected - use the selected prop from TipTap
  React.useEffect(() => {
    setIsSelected(selected || false)
  }, [selected])

  const handleImageClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (editor && typeof getPos === "function") {
      const pos = getPos()
      if (pos !== undefined && pos !== null) {
        editor.commands.setNodeSelection(pos)
      }
    }
  }

  const handleMouseDown = (e: React.MouseEvent, handle: string) => {
    e.preventDefault()
    e.stopPropagation()
    setIsResizing(true)
    setResizeHandle(handle)
    setStartX(e.clientX)
    setStartY(e.clientY)
    if (imgRef.current) {
      const rect = imgRef.current.getBoundingClientRect()
      setStartWidth(rect.width)
      setStartHeight(rect.height)
    }
  }

  React.useEffect(() => {
    if (!isResizing) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!imgRef.current) return
      const deltaX = e.clientX - startX
      const deltaY = e.clientY - startY
      let newWidth = startWidth
      let newHeight = startHeight

      if (resizeHandle === "se" || resizeHandle === "sw" || resizeHandle === "ne" || resizeHandle === "nw") {
        // Corner resize - maintain aspect ratio
        const aspectRatio = startWidth / startHeight
        if (resizeHandle === "se" || resizeHandle === "ne") {
          newWidth = startWidth + deltaX
        } else {
          newWidth = startWidth - deltaX
        }
        newHeight = newWidth / aspectRatio
      } else if (resizeHandle === "e" || resizeHandle === "w") {
        // Horizontal resize
        if (resizeHandle === "e") {
          newWidth = startWidth + deltaX
        } else {
          newWidth = startWidth - deltaX
        }
      } else if (resizeHandle === "n" || resizeHandle === "s") {
        // Vertical resize
        if (resizeHandle === "s") {
          newHeight = startHeight + deltaY
        } else {
          newHeight = startHeight - deltaY
        }
      }

      // Minimum size constraints
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
  }, [isResizing, startX, startY, startWidth, startHeight, resizeHandle, updateAttributes])

  const handleStyle: React.CSSProperties = {
    position: "absolute",
    backgroundColor: "#ffffff",
    border: "2px solid #3b82f6",
    borderRadius: "4px",
    width: "16px",
    height: "16px",
    cursor: "pointer",
    zIndex: 10,
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    transition: "all 0.2s ease",
  }

  const getHandlePosition = (handle: string): React.CSSProperties => {
    const isHovered = hoveredHandle === handle
    const basePositions: Record<string, React.CSSProperties> = {
      nw: { top: "-8px", left: "-8px", cursor: "nw-resize" },
      n: { top: "-8px", left: "50%", transform: "translateX(-50%)", cursor: "n-resize" },
      ne: { top: "-8px", right: "-8px", cursor: "ne-resize" },
      e: { top: "50%", right: "-8px", transform: "translateY(-50%)", cursor: "e-resize" },
      se: { bottom: "-8px", right: "-8px", cursor: "se-resize" },
      s: { bottom: "-8px", left: "50%", transform: "translateX(-50%)", cursor: "s-resize" },
      sw: { bottom: "-8px", left: "-8px", cursor: "sw-resize" },
      w: { top: "50%", left: "-8px", transform: "translateY(-50%)", cursor: "w-resize" },
    }

    const position = basePositions[handle]
    let finalTransform = position.transform || ""

    if (isHovered) {
      if (finalTransform) {
        finalTransform = `${finalTransform} scale(1.2)`
      } else {
        finalTransform = "scale(1.2)"
      }
    }

    const hoverStyle: React.CSSProperties = isHovered
      ? {
          backgroundColor: "#dbeafe",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
        }
      : {}

    return {
      ...handleStyle,
      ...position,
      ...hoverStyle,
      transform: finalTransform || position.transform,
    }
  }

  const selectionBorderStyle: React.CSSProperties = {
    position: "absolute",
    top: "-2px",
    left: "-2px",
    right: "-2px",
    bottom: "-2px",
    border: "2px dashed #3b82f6",
    borderRadius: "4px",
    pointerEvents: "none",
    zIndex: 1,
  }

  return (
    <NodeViewWrapper
      as="span"
      style={{
        display: "inline-block",
        position: "relative",
        lineHeight: 0,
        outline: "none",
      }}
    >
      <img
        ref={imgRef}
        src={node.attrs.src}
        alt={node.attrs.alt || ""}
        onClick={handleImageClick}
        style={{
          maxWidth: "100%",
          height: "auto",
          display: "block",
          width: typeof width === "number" ? `${width}px` : width,
          height: typeof height === "number" ? `${height}px` : height,
          cursor: "pointer",
          borderRadius: isSelected || selected ? "4px" : "0",
          transition: "border-radius 0.2s ease",
        }}
        draggable={false}
      />
      {(isSelected || selected) && (
        <>
          {/* Selection Border */}
          <div style={selectionBorderStyle} />

          {/* Corner Handles */}
          <div
            style={getHandlePosition("nw")}
            onMouseDown={(e) => handleMouseDown(e, "nw")}
            onMouseEnter={() => setHoveredHandle("nw")}
            onMouseLeave={() => setHoveredHandle(null)}
          />
          <div
            style={getHandlePosition("ne")}
            onMouseDown={(e) => handleMouseDown(e, "ne")}
            onMouseEnter={() => setHoveredHandle("ne")}
            onMouseLeave={() => setHoveredHandle(null)}
          />
          <div
            style={getHandlePosition("se")}
            onMouseDown={(e) => handleMouseDown(e, "se")}
            onMouseEnter={() => setHoveredHandle("se")}
            onMouseLeave={() => setHoveredHandle(null)}
          />
          <div
            style={getHandlePosition("sw")}
            onMouseDown={(e) => handleMouseDown(e, "sw")}
            onMouseEnter={() => setHoveredHandle("sw")}
            onMouseLeave={() => setHoveredHandle(null)}
          />

          {/* Edge Handles */}
          <div
            style={getHandlePosition("n")}
            onMouseDown={(e) => handleMouseDown(e, "n")}
            onMouseEnter={() => setHoveredHandle("n")}
            onMouseLeave={() => setHoveredHandle(null)}
          />
          <div
            style={getHandlePosition("s")}
            onMouseDown={(e) => handleMouseDown(e, "s")}
            onMouseEnter={() => setHoveredHandle("s")}
            onMouseLeave={() => setHoveredHandle(null)}
          />
          <div
            style={getHandlePosition("e")}
            onMouseDown={(e) => handleMouseDown(e, "e")}
            onMouseEnter={() => setHoveredHandle("e")}
            onMouseLeave={() => setHoveredHandle(null)}
          />
          <div
            style={getHandlePosition("w")}
            onMouseDown={(e) => handleMouseDown(e, "w")}
            onMouseEnter={() => setHoveredHandle("w")}
            onMouseLeave={() => setHoveredHandle(null)}
          />
        </>
      )}
    </NodeViewWrapper>
  )
}
