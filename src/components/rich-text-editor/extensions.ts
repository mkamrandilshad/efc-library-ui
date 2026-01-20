import { Color } from "@tiptap/extension-color"
import { Image } from "@tiptap/extension-image"
import { Link } from "@tiptap/extension-link"
import { Underline } from "@tiptap/extension-underline"
import { TextAlign } from "@tiptap/extension-text-align"
import { Highlight } from "@tiptap/extension-highlight"
import StarterKit from "@tiptap/starter-kit"
import TextStyle from "@tiptap/extension-text-style"
import Blockquote from "@tiptap/extension-blockquote"
import { Extension } from "@tiptap/core"
import { ReactRenderer } from "@tiptap/react"
import * as React from "react"
import { ResizableImage } from "./resizable-image"

// Custom extension for Font Family
const FontFamily = Extension.create({
  name: "fontFamily",

  addOptions() {
    return {
      types: ["textStyle"],
    }
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
          attributes: {
            fontFamily: {
              default: null,
              parseHTML: (element: HTMLElement) =>
                element.style.fontFamily?.replace(/['"]+/g, "") || null,
              renderHTML: (attributes: { fontFamily?: string | null }) => {
                if (!attributes.fontFamily) {
                  return {}
                }

                return {
                  style: `font-family: ${attributes.fontFamily}`,
                }
              },
            },
          },
      },
    ]
  },

  addCommands() {
    return {
      setFontFamily:
        (fontFamily: string) =>
        ({ chain }: { chain: () => any }) => {
          return chain().setMark("textStyle", { fontFamily }).run()
        },
      unsetFontFamily:
        () =>
        ({ chain }: { chain: () => any }) => {
          return chain()
            .setMark("textStyle", { fontFamily: null })
            .removeEmptyTextStyle()
            .run()
        },
    }
  },
})

// Custom extension for Font Size
const FontSize = Extension.create({
  name: "fontSize",

  addOptions() {
    return {
      types: ["textStyle"],
    }
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
          attributes: {
            fontSize: {
              default: null,
              parseHTML: (element: HTMLElement) => element.style.fontSize || null,
              renderHTML: (attributes: { fontSize?: string | null }) => {
                if (!attributes.fontSize) {
                  return {}
                }

                return {
                  style: `font-size: ${attributes.fontSize}`,
                }
              },
            },
          },
      },
    ]
  },

  addCommands() {
    return {
      setFontSize:
        (fontSize: string) =>
        ({ chain }: { chain: () => any }) => {
          return chain().setMark("textStyle", { fontSize }).run()
        },
      unsetFontSize:
        () =>
        ({ chain }: { chain: () => any }) => {
          return chain()
            .setMark("textStyle", { fontSize: null })
            .removeEmptyTextStyle()
            .run()
        },
    }
  },
})

// Custom Resizable Image Extension
const ResizableImageExtension = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: null,
        parseHTML: (element: HTMLElement) => element.getAttribute("width") || null,
        renderHTML: (attributes: { width?: string | number | null }) => {
          if (!attributes.width) {
            return {}
          }
          return {
            width: attributes.width,
          }
        },
      },
      height: {
        default: null,
        parseHTML: (element: HTMLElement) => element.getAttribute("height") || null,
        renderHTML: (attributes: { height?: string | number | null }) => {
          if (!attributes.height) {
            return {}
          }
          return {
            height: attributes.height,
          }
        },
      },
    }
  },

  addNodeView() {
    return ({ node, getPos, editor }: { node: any; getPos: (() => number) | undefined; editor: any }) => {
      const ReactComponent = () => {
        const [selected, setSelected] = React.useState(false)

        React.useEffect(() => {
          const updateSelection = () => {
            const { from, to } = editor.state.selection
            const pos = typeof getPos === "function" ? getPos() : null
            if (pos !== null && pos >= from && pos <= to) {
              setSelected(true)
            } else {
              setSelected(false)
            }
          }

          editor.on("selectionUpdate", updateSelection)
          updateSelection()

          return () => {
            editor.off("selectionUpdate", updateSelection)
          }
        }, [editor])

        const updateAttributes = (attrs: { width?: number; height?: number }) => {
          const pos = typeof getPos === "function" ? getPos() : null
          if (pos !== null) {
            editor.commands.updateAttributes("image", attrs)
          }
        }

        return React.createElement(ResizableImage, {
          node,
          updateAttributes,
          selected,
        })
      }

      const renderer = new ReactRenderer(ReactComponent, {
        editor,
        props: {},
      })

      return {
        dom: renderer.dom,
        contentDOM: null,
        update: (updatedNode: any) => {
          if (updatedNode.type.name !== this.name) {
            return false
          }
          renderer.updateProps({ node: updatedNode })
          return true
        },
        destroy: () => {
          renderer.destroy()
        },
      }
    }
  },
})

export const extensions = [
  StarterKit.configure({
    blockquote: false, // We'll use the Blockquote extension instead
  }),
  Color,
  TextStyle,
  FontFamily,
  FontSize,
  ResizableImageExtension.configure({
    inline: true,
    allowBase64: true,
  }),
  Link.configure({
    openOnClick: false,
    HTMLAttributes: {
      class: "text-primary underline",
    },
  }),
  Underline,
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  Highlight.configure({
    multicolor: true,
  }),
  Blockquote,
]
