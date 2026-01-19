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

export const extensions = [
  StarterKit.configure({
    blockquote: false, // We'll use the Blockquote extension instead
  }),
  Color,
  TextStyle,
  FontFamily,
  FontSize,
  Image.configure({
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
