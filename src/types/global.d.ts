// Global type declarations for utility modules
declare module '@/utils/builder/tailwaind-colors' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tailwindColors: any
  export default tailwindColors
}

declare module '@/utils/builder/tailwind-opacities' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tailwindOpacities: any
  export default tailwindOpacities
}

declare module '@/utils/builder/tailwind-font-sizes' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tailwindFontSizes: any
  export default tailwindFontSizes
}

declare module '@/utils/builder/tailwind-font-styles' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tailwindFontStyles: any
  export default tailwindFontStyles
}

declare module '@/utils/builder/tailwind-padding-margin' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tailwindPaddingAndMargin: any
  export default tailwindPaddingAndMargin
}

declare module '@/utils/builder/tailwind-border-radius' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tailwindBorderRadius: any
  export default tailwindBorderRadius
}

declare module '@/utils/builder/tailwind-border-style-width-color' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tailwindBorderStyleWidthPlusColor: any
  export default tailwindBorderStyleWidthPlusColor
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, any>
  export default component
}
