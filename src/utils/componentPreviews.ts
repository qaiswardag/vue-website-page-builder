// Component Preview Generator
// Generates SVG previews for components to avoid external image dependencies

export interface ComponentPreviewConfig {
  title: string
  svg: string
  description?: string
}

export const generateComponentPreview = (title: string): string => {
  const previewConfigs: Record<string, ComponentPreviewConfig> = {
    'Single Image': {
      title: 'Single Image',
      svg: `
        <svg viewBox="0 0 200 150" class="w-full h-full">
          <rect x="20" y="20" width="160" height="110" fill="#f3f4f6" stroke="#d1d5db" stroke-width="2" rx="8"/>
          <rect x="40" y="40" width="120" height="70" fill="#e5e7eb" rx="4"/>
          <circle cx="70" cy="60" r="8" fill="#9ca3af"/>
          <path d="M85 75 L95 65 L110 80 L125 70 L135 85" stroke="#9ca3af" stroke-width="2" fill="none"/>
          <text x="100" y="125" text-anchor="middle" fill="#6b7280" font-size="12">Single Image</text>
        </svg>
      `,
    },
    '2 vertical images': {
      title: '2 Vertical Images',
      svg: `
        <svg viewBox="0 0 200 150" class="w-full h-full">
          <rect x="10" y="20" width="70" height="110" fill="#f3f4f6" stroke="#d1d5db" stroke-width="2" rx="8"/>
          <rect x="120" y="20" width="70" height="110" fill="#f3f4f6" stroke="#d1d5db" stroke-width="2" rx="8"/>
          <rect x="20" y="30" width="50" height="90" fill="#e5e7eb" rx="4"/>
          <rect x="130" y="30" width="50" height="90" fill="#e5e7eb" rx="4"/>
          <text x="100" y="145" text-anchor="middle" fill="#6b7280" font-size="10">2 Vertical Images</text>
        </svg>
      `,
    },
    '2 images': {
      title: '2 Images',
      svg: `
        <svg viewBox="0 0 200 150" class="w-full h-full">
          <rect x="20" y="30" width="70" height="70" fill="#f3f4f6" stroke="#d1d5db" stroke-width="2" rx="8"/>
          <rect x="110" y="30" width="70" height="70" fill="#f3f4f6" stroke="#d1d5db" stroke-width="2" rx="8"/>
          <rect x="30" y="40" width="50" height="50" fill="#e5e7eb" rx="4"/>
          <rect x="120" y="40" width="50" height="50" fill="#e5e7eb" rx="4"/>
          <text x="100" y="125" text-anchor="middle" fill="#6b7280" font-size="12">2 Images</text>
        </svg>
      `,
    },
    '3 images': {
      title: '3 Images',
      svg: `
        <svg viewBox="0 0 200 150" class="w-full h-full">
          <rect x="10" y="30" width="50" height="50" fill="#f3f4f6" stroke="#d1d5db" stroke-width="2" rx="6"/>
          <rect x="75" y="30" width="50" height="50" fill="#f3f4f6" stroke="#d1d5db" stroke-width="2" rx="6"/>
          <rect x="140" y="30" width="50" height="50" fill="#f3f4f6" stroke="#d1d5db" stroke-width="2" rx="6"/>
          <text x="100" y="110" text-anchor="middle" fill="#6b7280" font-size="12">3 Images</text>
        </svg>
      `,
    },
    '6 Images Grid': {
      title: '6 Images Grid',
      svg: `
        <svg viewBox="0 0 200 150" class="w-full h-full">
          <rect x="20" y="20" width="45" height="35" fill="#f3f4f6" stroke="#d1d5db" stroke-width="1" rx="4"/>
          <rect x="77" y="20" width="45" height="35" fill="#f3f4f6" stroke="#d1d5db" stroke-width="1" rx="4"/>
          <rect x="135" y="20" width="45" height="35" fill="#f3f4f6" stroke="#d1d5db" stroke-width="1" rx="4"/>
          <rect x="20" y="67" width="45" height="35" fill="#f3f4f6" stroke="#d1d5db" stroke-width="1" rx="4"/>
          <rect x="77" y="67" width="45" height="35" fill="#f3f4f6" stroke="#d1d5db" stroke-width="1" rx="4"/>
          <rect x="135" y="67" width="45" height="35" fill="#f3f4f6" stroke="#d1d5db" stroke-width="1" rx="4"/>
          <text x="100" y="125" text-anchor="middle" fill="#6b7280" font-size="10">6 Images Grid</text>
        </svg>
      `,
    },
    'Two Images With Right Text Top': {
      title: 'Images + Text',
      svg: `
        <svg viewBox="0 0 200 150" class="w-full h-full">
          <rect x="20" y="20" width="35" height="35" fill="#f3f4f6" stroke="#d1d5db" stroke-width="2" rx="4"/>
          <rect x="20" y="65" width="35" height="35" fill="#f3f4f6" stroke="#d1d5db" stroke-width="2" rx="4"/>
          <rect x="70" y="25" width="110" height="8" fill="#e5e7eb" rx="4"/>
          <rect x="70" y="40" width="90" height="6" fill="#f3f4f6" rx="3"/>
          <rect x="70" y="50" width="100" height="6" fill="#f3f4f6" rx="3"/>
          <rect x="70" y="60" width="80" height="6" fill="#f3f4f6" rx="3"/>
          <text x="100" y="130" text-anchor="middle" fill="#6b7280" font-size="10">Images + Text</text>
        </svg>
      `,
    },
    '3 Vertical Images': {
      title: '3 Vertical Images',
      svg: `
        <svg viewBox="0 0 200 150" class="w-full h-full">
          <rect x="15" y="20" width="45" height="80" fill="#f3f4f6" stroke="#d1d5db" stroke-width="2" rx="6"/>
          <rect x="77" y="20" width="45" height="80" fill="#f3f4f6" stroke="#d1d5db" stroke-width="2" rx="6"/>
          <rect x="140" y="20" width="45" height="80" fill="#f3f4f6" stroke="#d1d5db" stroke-width="2" rx="6"/>
          <text x="100" y="125" text-anchor="middle" fill="#6b7280" font-size="10">3 Vertical Images</text>
        </svg>
      `,
    },
    'Link Button': {
      title: 'Link Button',
      svg: `
        <svg viewBox="0 0 200 150" class="w-full h-full">
          <rect x="50" y="60" width="100" height="30" fill="#3b82f6" stroke="#2563eb" stroke-width="2" rx="15"/>
          <text x="100" y="78" text-anchor="middle" fill="white" font-size="12" font-weight="500">Link Button</text>
          <path d="M75 75 L80 70 M80 70 L80 80 M80 70 L70 70" stroke="white" stroke-width="2" fill="none"/>
          <text x="100" y="110" text-anchor="middle" fill="#6b7280" font-size="10">Link Button</text>
        </svg>
      `,
    },
    '4 Images With Text': {
      title: '4 Images + Text',
      svg: `
        <svg viewBox="0 0 200 150" class="w-full h-full">
          <rect x="15" y="15" width="35" height="25" fill="#f3f4f6" stroke="#d1d5db" stroke-width="1" rx="3"/>
          <rect x="60" y="15" width="35" height="25" fill="#f3f4f6" stroke="#d1d5db" stroke-width="1" rx="3"/>
          <rect x="105" y="15" width="35" height="25" fill="#f3f4f6" stroke="#d1d5db" stroke-width="1" rx="3"/>
          <rect x="150" y="15" width="35" height="25" fill="#f3f4f6" stroke="#d1d5db" stroke-width="1" rx="3"/>
          <rect x="15" y="45" width="35" height="4" fill="#e5e7eb" rx="2"/>
          <rect x="60" y="45" width="35" height="4" fill="#e5e7eb" rx="2"/>
          <rect x="105" y="45" width="35" height="4" fill="#e5e7eb" rx="2"/>
          <rect x="150" y="45" width="35" height="4" fill="#e5e7eb" rx="2"/>
          <text x="100" y="70" text-anchor="middle" fill="#6b7280" font-size="9">4 Images + Text</text>
        </svg>
      `,
    },
    '3 Images With Text': {
      title: '3 Images + Text',
      svg: `
        <svg viewBox="0 0 200 150" class="w-full h-full">
          <rect x="25" y="20" width="40" height="30" fill="#f3f4f6" stroke="#d1d5db" stroke-width="1" rx="4"/>
          <rect x="80" y="20" width="40" height="30" fill="#f3f4f6" stroke="#d1d5db" stroke-width="1" rx="4"/>
          <rect x="135" y="20" width="40" height="30" fill="#f3f4f6" stroke="#d1d5db" stroke-width="1" rx="4"/>
          <rect x="25" y="55" width="40" height="5" fill="#e5e7eb" rx="2"/>
          <rect x="80" y="55" width="40" height="5" fill="#e5e7eb" rx="2"/>
          <rect x="135" y="55" width="40" height="5" fill="#e5e7eb" rx="2"/>
          <text x="100" y="85" text-anchor="middle" fill="#6b7280" font-size="10">3 Images + Text</text>
        </svg>
      `,
    },
    '2 Images With Text': {
      title: '2 Images + Text',
      svg: `
        <svg viewBox="0 0 200 150" class="w-full h-full">
          <rect x="40" y="25" width="50" height="40" fill="#f3f4f6" stroke="#d1d5db" stroke-width="2" rx="6"/>
          <rect x="110" y="25" width="50" height="40" fill="#f3f4f6" stroke="#d1d5db" stroke-width="2" rx="6"/>
          <rect x="40" y="75" width="50" height="6" fill="#e5e7eb" rx="3"/>
          <rect x="110" y="75" width="50" height="6" fill="#e5e7eb" rx="3"/>
          <text x="100" y="105" text-anchor="middle" fill="#6b7280" font-size="10">2 Images + Text</text>
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
      <rect x="20" y="20" width="160" height="110" fill="#f9fafb" stroke="#e5e7eb" stroke-width="2" rx="8" stroke-dasharray="5,5"/>
      <text x="100" y="70" text-anchor="middle" fill="#6b7280" font-size="14" font-weight="500">${title}</text>
      <text x="100" y="90" text-anchor="middle" fill="#9ca3af" font-size="10">Component Preview</text>
    </svg>
  `
}

export default {
  generateComponentPreview,
}
