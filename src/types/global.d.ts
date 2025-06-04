// Global type declarations for utility modules
import type {
  TailwindColors,
  TailwindOpacities,
  TailwindFontSizes,
  TailwindFontStyles,
  TailwindPaddingAndMargin,
  TailwindBorderRadius,
  TailwindBorderStyleWidthColor,
} from './index'

declare module '@/utils/builder/tailwaind-colors' {
  const tailwindColors: TailwindColors
  export default tailwindColors
}

declare module '@/utils/builder/tailwind-opacities' {
  const tailwindOpacities: TailwindOpacities
  export default tailwindOpacities
}

declare module '@/utils/builder/tailwind-font-sizes' {
  const tailwindFontSizes: TailwindFontSizes
  export default tailwindFontSizes
}

declare module '@/utils/builder/tailwind-font-styles' {
  const tailwindFontStyles: TailwindFontStyles
  export default tailwindFontStyles
}

declare module '@/utils/builder/tailwind-padding-margin' {
  const tailwindPaddingAndMargin: TailwindPaddingAndMargin
  export default tailwindPaddingAndMargin
}

declare module '@/utils/builder/tailwind-border-radius' {
  const tailwindBorderRadius: TailwindBorderRadius
  export default tailwindBorderRadius
}

declare module '@/utils/builder/tailwind-border-style-width-color' {
  const tailwindBorderStyleWidthPlusColor: TailwindBorderStyleWidthColor
  export default tailwindBorderStyleWidthPlusColor
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<
    Record<string, unknown>,
    Record<string, unknown>,
    Record<string, unknown>
  >
  export default component
}
