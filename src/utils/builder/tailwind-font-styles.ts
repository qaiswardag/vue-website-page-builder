interface TailwindFontStyles {
  fontWeight: string[]
  fontFamily: string[]
  fontStyle: string[]
}

const tailwindFontStyles: TailwindFontStyles = {
  fontWeight: [
    'none',
    'font-thin',
    'font-extralight',
    'font-light',
    'font-normal',
    'font-medium',
    'font-medium',
    'font-bold',
    'font-extrabold',
    'font-black',
  ],
  fontFamily: ['none', 'font-sans', 'font-serif', 'font-mono'],
  fontStyle: ['none', 'italic', 'non-italic'],
}

export default tailwindFontStyles
