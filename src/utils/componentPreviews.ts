// Component Preview Generator
// Generates SVG previews for components to avoid external image dependencies

export interface ComponentPreviewConfig {
  title: string
  svg: string
  description?: string
}

// Generate placeholder image data URL from Single Image SVG
export const getPlaceholderImageDataUrl = (): string => {
  const singleImageSvg = `
    <svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="200" height="150" fill="#384152"/>
      <polygon points="60,85 85,55 110,85" fill="#718096"/>
      <polygon points="105,85 117.5,70 130,85" fill="#718096"/>
      <circle cx="117.5" cy="55" r="6" fill="#718096"/>
    </svg>
  `

  // Convert SVG to data URL
  const encodedSvg = encodeURIComponent(singleImageSvg.trim())
  return `data:image/svg+xml,${encodedSvg}`
}

export const generateComponentPreview = (title: string): string => {
  const previewConfigs: Record<string, ComponentPreviewConfig> = {
    'Single Image': {
      title: 'Single Image',
      svg: `
       <svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="200" height="150" fill="#384152"/>
      <polygon points="60,85 85,55 110,85" fill="#718096"/>
      <polygon points="105,85 117.5,70 130,85" fill="#718096"/>
      <circle cx="117.5" cy="55" r="6" fill="#718096"/>
    </svg>
      `,
    },
    '2 vertical images': {
      title: '2 Vertical Images',
      svg: `
        <svg viewBox="0 0 200 150" class="w-full h-full">
          <rect x="0" y="0" width="200" height="150" fill="#384152"/>
          <rect x="20" y="20" width="70" height="110" fill="#4a5568"/>
          <rect x="110" y="20" width="70" height="110" fill="#4a5568"/>
        </svg>
      `,
    },
    '2 images': {
      title: '2 Images',
      svg: `
        <svg viewBox="0 0 200 150" class="w-full h-full">
          <rect x="0" y="0" width="200" height="150" fill="#384152"/>
          <rect x="30" y="40" width="60" height="60" fill="#4a5568"/>
          <rect x="110" y="40" width="60" height="60" fill="#4a5568"/>
        </svg>
      `,
    },
    '3 images': {
      title: '3 Images',
      svg: `
        <svg viewBox="0 0 200 150" class="w-full h-full">
          <rect x="0" y="0" width="200" height="150" fill="#384152"/>
          <rect x="20" y="40" width="45" height="45" fill="#4a5568"/>
          <rect x="77" y="40" width="45" height="45" fill="#4a5568"/>
          <rect x="135" y="40" width="45" height="45" fill="#4a5568"/>
        </svg>
      `,
    },
    '6 Images Grid': {
      title: '6 Images Grid',
      svg: `
        <svg viewBox="0 0 200 150" class="w-full h-full">
          <rect x="0" y="0" width="200" height="150" fill="#384152"/>
          <rect x="25" y="25" width="40" height="30" fill="#4a5568"/>
          <rect x="80" y="25" width="40" height="30" fill="#4a5568"/>
          <rect x="135" y="25" width="40" height="30" fill="#4a5568"/>
          <rect x="25" y="70" width="40" height="30" fill="#4a5568"/>
          <rect x="80" y="70" width="40" height="30" fill="#4a5568"/>
          <rect x="135" y="70" width="40" height="30" fill="#4a5568"/>
        </svg>
      `,
    },
    'Two Images With Right Text Top': {
      title: 'Images + Text',
      svg: `
        <svg viewBox="0 0 200 150" class="w-full h-full">
          <rect x="0" y="0" width="200" height="150" fill="#384152"/>
          <rect x="20" y="30" width="35" height="35" fill="#4a5568"/>
          <rect x="20" y="75" width="35" height="35" fill="#4a5568"/>
          <rect x="70" y="35" width="110" height="8" fill="#718096"/>
          <rect x="70" y="50" width="90" height="6" fill="#718096"/>
          <rect x="70" y="60" width="100" height="6" fill="#718096"/>
          <rect x="70" y="70" width="80" height="6" fill="#718096"/>
        </svg>
      `,
    },
    '3 Vertical Images': {
      title: '3 Vertical Images',
      svg: `
        <svg viewBox="0 0 200 150" class="w-full h-full">
          <rect x="0" y="0" width="200" height="150" fill="#384152"/>
          <rect x="25" y="25" width="40" height="70" fill="#4a5568"/>
          <rect x="80" y="25" width="40" height="70" fill="#4a5568"/>
          <rect x="135" y="25" width="40" height="70" fill="#4a5568"/>
        </svg>
      `,
    },
    'Link Button': {
      title: 'Link Button',
      svg: `
        <svg viewBox="0 0 200 150" class="w-full h-full">
          <rect x="0" y="0" width="200" height="150" fill="#384152"/>
          <rect x="50" y="60" width="100" height="30" fill="#4a5568"/>
          <path d="M75 75 L80 70 M80 70 L80 80 M80 70 L70 70" stroke="white" stroke-width="2" fill="none"/>
        </svg>
      `,
    },
    '4 Images With Text': {
      title: '4 Images + Text',
      svg: `
        <svg viewBox="0 0 200 150" class="w-full h-full">
          <rect x="0" y="0" width="200" height="150" fill="#384152"/>
          <rect x="15" y="20" width="35" height="25" fill="#4a5568"/>
          <rect x="60" y="20" width="35" height="25" fill="#4a5568"/>
          <rect x="105" y="20" width="35" height="25" fill="#4a5568"/>
          <rect x="150" y="20" width="35" height="25" fill="#4a5568"/>
          <rect x="15" y="50" width="35" height="4" fill="#718096"/>
          <rect x="60" y="50" width="35" height="4" fill="#718096"/>
          <rect x="105" y="50" width="35" height="4" fill="#718096"/>
          <rect x="150" y="50" width="35" height="4" fill="#718096"/>
        </svg>
      `,
    },
    '3 Images With Text': {
      title: '3 Images + Text',
      svg: `
        <svg viewBox="0 0 200 150" class="w-full h-full">
          <rect x="0" y="0" width="200" height="150" fill="#384152"/>
          <rect x="35" y="30" width="40" height="30" fill="#4a5568"/>
          <rect x="80" y="30" width="40" height="30" fill="#4a5568"/>
          <rect x="125" y="30" width="40" height="30" fill="#4a5568"/>
          <rect x="35" y="65" width="40" height="5" fill="#718096"/>
          <rect x="80" y="65" width="40" height="5" fill="#718096"/>
          <rect x="125" y="65" width="40" height="5" fill="#718096"/>
        </svg>
      `,
    },
    '2 Images With Text': {
      title: '2 Images + Text',
      svg: `
        <svg viewBox="0 0 200 150" class="w-full h-full">
          <rect x="0" y="0" width="200" height="150" fill="#384152"/>
          <rect x="45" y="35" width="50" height="40" fill="#4a5568"/>
          <rect x="105" y="35" width="50" height="40" fill="#4a5568"/>
          <rect x="45" y="80" width="50" height="6" fill="#718096"/>
          <rect x="105" y="80" width="50" height="6" fill="#718096"/>
        </svg>
      `,
    },
  }

  const config = previewConfigs[title]
  if (config) {
    return config.svg
  }

  // Default fallback preview
  return `
    <svg viewBox="0 0 200 150" class="w-full h-full">
      <rect x="0" y="0" width="200" height="150" fill="#384152"/>
      <rect x="20" y="20" width="160" height="110" fill="#4a5568"/>
    </svg>
  `
}

export default {
  generateComponentPreview,
  getPlaceholderImageDataUrl,
}
