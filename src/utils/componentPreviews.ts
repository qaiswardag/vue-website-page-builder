// Component Preview Generator
// Generates SVG previews for components to avoid external image dependencies

export interface ComponentPreviewConfig {
  title: string
  svg: string
  description?: string
}

// Generate the triangles and circle design scaled to fit within a rectangle
const generateImageIcon = (x: number, y: number, width: number, height: number): string => {
  // Use uniform scaling based on the smaller dimension to avoid stretching
  const scale = Math.min(width / 70, height / 50) * 0.8 // 0.8 to leave some padding

  // Center the design within the rectangle
  const centerX = x + width / 2
  const centerY = y + height / 2

  // Original design dimensions (scaled uniformly)
  const mediumTriangleBase = 25 * scale
  const mediumTriangleHeight = 15 * scale
  const smallTriangleBase = mediumTriangleBase * 0.7 // 30% smaller
  const smallTriangleHeight = mediumTriangleHeight * 0.7
  const circleRadius = 3 * scale

  // Position triangles side by side, centered
  const totalWidth = mediumTriangleBase + smallTriangleBase + 5 * scale // 5 units spacing
  const startX = centerX - totalWidth / 2

  // Medium triangle (left)
  const mediumTriangleX = startX + mediumTriangleBase / 2
  const mediumTriangle = `<polygon points="${mediumTriangleX - mediumTriangleBase / 2},${centerY + mediumTriangleHeight / 2} ${mediumTriangleX},${centerY - mediumTriangleHeight / 2} ${mediumTriangleX + mediumTriangleBase / 2},${centerY + mediumTriangleHeight / 2}" fill="#718096"/>`

  // Small triangle (right)
  const smallTriangleX = startX + mediumTriangleBase + 5 * scale + smallTriangleBase / 2
  const smallTriangle = `<polygon points="${smallTriangleX - smallTriangleBase / 2},${centerY + smallTriangleHeight / 2} ${smallTriangleX},${centerY - smallTriangleHeight / 2} ${smallTriangleX + smallTriangleBase / 2},${centerY + smallTriangleHeight / 2}" fill="#718096"/>`

  // Circle above small triangle with space
  const circle = `<circle cx="${smallTriangleX}" cy="${centerY - smallTriangleHeight / 2 - circleRadius - 3 * scale}" r="${circleRadius}" fill="#718096"/>`

  return mediumTriangle + smallTriangle + circle
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
          <rect x="40" y="40" width="120" height="70" fill="#4a5568"/>
          ${generateImageIcon(40, 40, 120, 70)}
        </svg>
      `,
    },
    '2 vertical images': {
      title: '2 Vertical Images',
      svg: `
        <svg viewBox="0 0 200 150" class="w-full h-full">
          <rect x="0" y="0" width="200" height="150" fill="#384152"/>
          <rect x="20" y="20" width="65" height="110" fill="#4a5568"/>
          <rect x="115" y="20" width="65" height="110" fill="#4a5568"/>
          ${generateImageIcon(20, 20, 65, 110)}
          ${generateImageIcon(115, 20, 65, 110)}
        </svg>
      `,
    },
    '2 images': {
      title: '2 Images',
      svg: `
        <svg viewBox="0 0 200 150" class="w-full h-full">
          <rect x="0" y="0" width="200" height="150" fill="#384152"/>
          <rect x="30" y="40" width="55" height="60" fill="#4a5568"/>
          <rect x="115" y="40" width="55" height="60" fill="#4a5568"/>
          ${generateImageIcon(30, 40, 55, 60)}
          ${generateImageIcon(115, 40, 55, 60)}
        </svg>
      `,
    },
    '3 images': {
      title: '3 Images',
      svg: `
        <svg viewBox="0 0 200 150" class="w-full h-full">
          <rect x="0" y="0" width="200" height="150" fill="#384152"/>
          <rect x="20" y="40" width="40" height="45" fill="#4a5568"/>
          <rect x="80" y="40" width="40" height="45" fill="#4a5568"/>
          <rect x="140" y="40" width="40" height="45" fill="#4a5568"/>
          ${generateImageIcon(20, 40, 40, 45)}
          ${generateImageIcon(80, 40, 40, 45)}
          ${generateImageIcon(140, 40, 40, 45)}
        </svg>
      `,
    },
    '6 Images Grid': {
      title: '6 Images Grid',
      svg: `
        <svg viewBox="0 0 200 150" class="w-full h-full">
          <rect x="0" y="0" width="200" height="150" fill="#384151"/>
          <rect x="25" y="25" width="45" height="30" fill="#4a5568"/>
          <rect x="80" y="25" width="45" height="30" fill="#4a5568"/>
          <rect x="135" y="25" width="45" height="30" fill="#4a5568"/>
          <rect x="25" y="65" width="45" height="30" fill="#4a5568"/>
          <rect x="80" y="65" width="45" height="30" fill="#4a5568"/>
          <rect x="135" y="65" width="45" height="30" fill="#4a5568"/>
          <rect x="70" y="25" width="10" height="30" fill="white"/>
          <rect x="125" y="25" width="10" height="30" fill="white"/>
          <rect x="70" y="65" width="10" height="30" fill="white"/>
          <rect x="125" y="65" width="10" height="30" fill="white"/>
          <rect x="25" y="55" width="45" height="10" fill="white"/>
          <rect x="80" y="55" width="45" height="10" fill="white"/>
          <rect x="135" y="55" width="45" height="10" fill="white"/>
          ${generateImageIcon(25, 25, 45, 30)}
          ${generateImageIcon(80, 25, 45, 30)}
          ${generateImageIcon(135, 25, 45, 30)}
          ${generateImageIcon(25, 65, 45, 30)}
          ${generateImageIcon(80, 65, 45, 30)}
          ${generateImageIcon(135, 65, 45, 30)}
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
          ${generateImageIcon(20, 30, 35, 35)}
          ${generateImageIcon(20, 75, 35, 35)}
        </svg>
      `,
    },
    '3 Vertical Images': {
      title: '3 Vertical Images',
      svg: `
        <svg viewBox="0 0 200 150" class="w-full h-full">
          <rect x="0" y="0" width="200" height="150" fill="#384152"/>
          <rect x="25" y="25" width="35" height="70" fill="#4a5568"/>
          <rect x="82" y="25" width="35" height="70" fill="#4a5568"/>
          <rect x="140" y="25" width="35" height="70" fill="#4a5568"/>
          ${generateImageIcon(25, 25, 35, 70)}
          ${generateImageIcon(82, 25, 35, 70)}
          ${generateImageIcon(140, 25, 35, 70)}
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
          <rect x="15" y="20" width="30" height="25" fill="#4a5568"/>
          <rect x="60" y="20" width="30" height="25" fill="#4a5568"/>
          <rect x="105" y="20" width="30" height="25" fill="#4a5568"/>
          <rect x="150" y="20" width="30" height="25" fill="#4a5568"/>
          <rect x="15" y="50" width="30" height="4" fill="#718096"/>
          <rect x="60" y="50" width="30" height="4" fill="#718096"/>
          <rect x="105" y="50" width="30" height="4" fill="#718096"/>
          <rect x="150" y="50" width="30" height="4" fill="#718096"/>
          ${generateImageIcon(15, 20, 30, 25)}
          ${generateImageIcon(60, 20, 30, 25)}
          ${generateImageIcon(105, 20, 30, 25)}
          ${generateImageIcon(150, 20, 30, 25)}
        </svg>
      `,
    },
    '3 Images With Text': {
      title: '3 Images + Text',
      svg: `
        <svg viewBox="0 0 200 150" class="w-full h-full">
          <rect x="0" y="0" width="200" height="150" fill="#384152"/>
          <rect x="35" y="30" width="35" height="30" fill="#4a5568"/>
          <rect x="82" y="30" width="35" height="30" fill="#4a5568"/>
          <rect x="130" y="30" width="35" height="30" fill="#4a5568"/>
          <rect x="35" y="65" width="35" height="5" fill="#718096"/>
          <rect x="82" y="65" width="35" height="5" fill="#718096"/>
          <rect x="130" y="65" width="35" height="5" fill="#718096"/>
          ${generateImageIcon(35, 30, 35, 30)}
          ${generateImageIcon(82, 30, 35, 30)}
          ${generateImageIcon(130, 30, 35, 30)}
        </svg>
      `,
    },
    '2 Images With Text': {
      title: '2 Images + Text',
      svg: `
        <svg viewBox="0 0 200 150" class="w-full h-full">
          <rect x="0" y="0" width="200" height="150" fill="#384152"/>
          <rect x="45" y="35" width="45" height="40" fill="#4a5568"/>
          <rect x="110" y="35" width="45" height="40" fill="#4a5568"/>
          <rect x="45" y="80" width="45" height="6" fill="#718096"/>
          <rect x="110" y="80" width="45" height="6" fill="#718096"/>
          ${generateImageIcon(45, 35, 45, 40)}
          ${generateImageIcon(110, 35, 45, 40)}
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
      ${generateImageIcon(20, 20, 160, 110)}
    </svg>
  `
}

export default {
  generateComponentPreview,
  getPlaceholderImageDataUrl,
}
