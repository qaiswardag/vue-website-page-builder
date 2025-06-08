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
<?xml version="1.0" encoding="UTF-8"?>
<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150">
  <defs>
    <style>
      .cls-1 {
        fill: #384152;
      }

      .cls-2 {
        fill: #718096;
      }
    </style>
  </defs>
  <rect class="cls-1" width="200" height="150"/>
  <g>
    <polygon class="cls-2" points="65 90.01 90 60.01 115 90.01 65 90.01"/>
    <polygon class="cls-2" points="110 90.01 122.5 75.01 135 90.01 110 90.01"/>
    <circle class="cls-2" cx="122.5" cy="64.15" r="4.16"/>
  </g>
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
<?xml version="1.0" encoding="UTF-8"?>
<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150">
  <defs>
    <style>
      .cls-1 {
        fill: #384152;
      }

      .cls-2 {
        fill: #718096;
      }
    </style>
  </defs>
  <rect class="cls-1" width="200" height="150"/>
  <g>
    <polygon class="cls-2" points="65 90.01 90 60.01 115 90.01 65 90.01"/>
    <polygon class="cls-2" points="110 90.01 122.5 75.01 135 90.01 110 90.01"/>
    <circle class="cls-2" cx="122.5" cy="64.15" r="4.16"/>
  </g>
</svg>
      `,
    },
    '2 Vertical Images': {
      title: '2 Vertical Images',
      svg: `
<?xml version="1.0" encoding="UTF-8"?>
<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 137.88 122.11">
  <defs>
    <style>
      .cls-1 {
        fill: #384152;
      }

      .cls-2 {
        fill: #718096;
      }
    </style>
  </defs>
  <g>
    <rect class="cls-1" width="63.93" height="122.11"/>
    <g>
      <polygon class="cls-2" points="8.68 71.04 25.31 51.08 41.94 71.04 8.68 71.04"/>
      <polygon class="cls-2" points="38.62 71.04 46.93 61.06 55.24 71.04 38.62 71.04"/>
      <circle class="cls-2" cx="46.93" cy="53.84" r="2.77"/>
    </g>
  </g>
  <g>
    <rect class="cls-1" x="73.95" width="63.93" height="122.11"/>
    <g>
      <polygon class="cls-2" points="82.64 71.04 99.27 51.08 115.89 71.04 82.64 71.04"/>
      <polygon class="cls-2" points="112.57 71.04 120.88 61.06 129.2 71.04 112.57 71.04"/>
      <circle class="cls-2" cx="120.88" cy="53.84" r="2.77"/>
    </g>
  </g>
</svg>
      `,
    },
    '2 Square Images': {
      title: '2 Square Images',
      svg: `
<?xml version="1.0" encoding="UTF-8"?>
<svg id="Isolation_Mode" data-name="Isolation Mode" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 159.09 73.9">
  <defs>
    <style>
      .cls-1 {
        fill: #384152;
      }

      .cls-2 {
        fill: #718096;
      }
    </style>
  </defs>
  <g>
    <rect class="cls-1" width="73.9" height="73.9"/>
    <g>
      <polygon class="cls-2" points="11.24 47.97 29.6 25.94 47.97 47.97 11.24 47.97"/>
      <polygon class="cls-2" points="44.29 47.97 53.48 36.96 62.66 47.97 44.29 47.97"/>
      <circle class="cls-2" cx="53.48" cy="28.98" r="3.06"/>
    </g>
  </g>
  <g>
    <rect class="cls-1" x="85.19" width="73.9" height="73.9"/>
    <g>
      <polygon class="cls-2" points="96.43 47.97 114.8 25.94 133.16 47.97 96.43 47.97"/>
      <polygon class="cls-2" points="129.49 47.97 138.67 36.96 147.85 47.97 129.49 47.97"/>
      <circle class="cls-2" cx="138.67" cy="28.98" r="3.06"/>
    </g>
  </g>
</svg>
      `,
    },
    '3 Square Images': {
      title: '3 Square Images',
      svg: `
<?xml version="1.0" encoding="UTF-8"?>
<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 177.28 53.92">
  <defs>
    <style>
      .cls-1 {
        fill: #384152;
      }

      .cls-2 {
        fill: #718096;
      }
    </style>
  </defs>
  <g>
    <rect class="cls-1" width="53.92" height="53.92"/>
    <g>
      <polygon class="cls-2" points="8.2 35 21.6 18.92 35 35 8.2 35"/>
      <polygon class="cls-2" points="32.32 35 39.02 26.96 45.71 35 32.32 35"/>
      <circle class="cls-2" cx="39.02" cy="21.15" r="2.23"/>
    </g>
  </g>
  <g>
    <rect class="cls-1" x="62.15" width="53.92" height="53.92"/>
    <g>
      <polygon class="cls-2" points="70.36 35 83.75 18.92 97.15 35 70.36 35"/>
      <polygon class="cls-2" points="94.47 35 101.17 26.96 107.87 35 94.47 35"/>
      <circle class="cls-2" cx="101.17" cy="21.15" r="2.23"/>
    </g>
  </g>
  <g>
    <rect class="cls-1" x="123.37" width="53.92" height="53.92"/>
    <g>
      <polygon class="cls-2" points="131.57 35 144.96 18.92 158.36 35 131.57 35"/>
      <polygon class="cls-2" points="155.68 35 162.38 26.96 169.08 35 155.68 35"/>
      <circle class="cls-2" cx="162.38" cy="21.15" r="2.23"/>
    </g>
  </g>
</svg>
      `,
    },
    '6 Square Images Grid': {
      title: '6 SquareImages Grid',
      svg: `
<?xml version="1.0" encoding="UTF-8"?>
<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 177.28 120.27">
  <defs>
    <style>
      .cls-1 {
        fill: #384152;
      }

      .cls-2 {
        fill: #718096;
      }
    </style>
  </defs>
  <g>
    <g>
      <rect class="cls-1" width="53.92" height="53.92"/>
      <g>
        <polygon class="cls-2" points="8.2 35 21.6 18.92 35 35 8.2 35"/>
        <polygon class="cls-2" points="32.32 35 39.02 26.96 45.71 35 32.32 35"/>
        <circle class="cls-2" cx="39.02" cy="21.15" r="2.23"/>
      </g>
    </g>
    <g>
      <rect class="cls-1" x="62.15" width="53.92" height="53.92"/>
      <g>
        <polygon class="cls-2" points="70.36 35 83.75 18.92 97.15 35 70.36 35"/>
        <polygon class="cls-2" points="94.47 35 101.17 26.96 107.87 35 94.47 35"/>
        <circle class="cls-2" cx="101.17" cy="21.15" r="2.23"/>
      </g>
    </g>
    <g>
      <rect class="cls-1" x="123.37" width="53.92" height="53.92"/>
      <g>
        <polygon class="cls-2" points="131.57 35 144.96 18.92 158.36 35 131.57 35"/>
        <polygon class="cls-2" points="155.68 35 162.38 26.96 169.08 35 155.68 35"/>
        <circle class="cls-2" cx="162.38" cy="21.15" r="2.23"/>
      </g>
    </g>
  </g>
  <g>
    <g>
      <rect class="cls-1" y="66.35" width="53.92" height="53.92"/>
      <g>
        <polygon class="cls-2" points="8.2 101.35 21.6 85.28 35 101.35 8.2 101.35"/>
        <polygon class="cls-2" points="32.32 101.35 39.02 93.32 45.71 101.35 32.32 101.35"/>
        <circle class="cls-2" cx="39.02" cy="87.5" r="2.23"/>
      </g>
    </g>
    <g>
      <rect class="cls-1" x="62.15" y="66.35" width="53.92" height="53.92"/>
      <g>
        <polygon class="cls-2" points="70.36 101.35 83.75 85.28 97.15 101.35 70.36 101.35"/>
        <polygon class="cls-2" points="94.47 101.35 101.17 93.32 107.87 101.35 94.47 101.35"/>
        <circle class="cls-2" cx="101.17" cy="87.5" r="2.23"/>
      </g>
    </g>
    <g>
      <rect class="cls-1" x="123.37" y="66.35" width="53.92" height="53.92"/>
      <g>
        <polygon class="cls-2" points="131.57 101.35 144.96 85.28 158.36 101.35 131.57 101.35"/>
        <polygon class="cls-2" points="155.68 101.35 162.38 93.32 169.08 101.35 155.68 101.35"/>
        <circle class="cls-2" cx="162.38" cy="87.5" r="2.23"/>
      </g>
    </g>
  </g>
</svg>
      `,
    },
    'Two Square Images With Text': {
      title: 'Two Square Images With Text',
      svg: `
<?xml version="1.0" encoding="UTF-8"?>
<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 179.99 53.92">
  <defs>
    <style>
      .cls-1 {
        fill: #384152;
      }

      .cls-2 {
        fill: #718096;
      }
    </style>
  </defs>
  <g>
    <rect class="cls-1" width="53.92" height="53.92"/>
    <g>
      <polygon class="cls-2" points="8.2 35 21.6 18.92 35 35 8.2 35"/>
      <polygon class="cls-2" points="32.32 35 39.02 26.96 45.71 35 32.32 35"/>
      <circle class="cls-2" cx="39.02" cy="21.15" r="2.23"/>
    </g>
  </g>
  <g>
    <rect class="cls-1" x="62.15" width="53.92" height="53.92"/>
    <g>
      <rect class="cls-1" x="126.07" width="53.92" height="2.93"/>
      <rect class="cls-1" x="126.07" y="4" width="53.92" height="2.93"/>
      <rect class="cls-1" x="126.07" y="7.99" width="53.92" height="2.93"/>
    </g>
    <g>
      <rect class="cls-1" x="126.07" y="7.99" width="53.92" height="2.93"/>
      <rect class="cls-1" x="126.07" y="11.99" width="53.92" height="2.93"/>
      <rect class="cls-1" x="126.07" y="15.99" width="53.92" height="2.93"/>
    </g>
    <g>
      <polygon class="cls-2" points="70.36 35 83.75 18.92 97.15 35 70.36 35"/>
      <polygon class="cls-2" points="94.47 35 101.17 26.96 107.87 35 94.47 35"/>
      <circle class="cls-2" cx="101.17" cy="21.15" r="2.23"/>
    </g>
  </g>
</svg>
      `,
    },
    '3 Vertical Images': {
      title: '3 Vertical Images',
      svg: `
<?xml version="1.0" encoding="UTF-8"?>
<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 179.84 110.72">
  <defs>
    <style>
      .cls-1 {
        fill: #384152;
      }

      .cls-2 {
        fill: #718096;
      }
    </style>
  </defs>
  <g>
    <rect class="cls-1" width="54.28" height="110.72"/>
    <g>
      <polygon class="cls-2" points="7.37 63.83 21.49 46.89 35.61 63.83 7.37 63.83"/>
      <polygon class="cls-2" points="32.79 63.83 39.85 55.36 46.91 63.83 32.79 63.83"/>
      <circle class="cls-2" cx="39.85" cy="49.23" r="2.35"/>
    </g>
  </g>
  <g>
    <rect class="cls-1" x="62.79" width="54.28" height="110.72"/>
    <g>
      <polygon class="cls-2" points="70.17 63.83 84.29 46.89 98.4 63.83 70.17 63.83"/>
      <polygon class="cls-2" points="95.58 63.83 102.64 55.36 109.7 63.83 95.58 63.83"/>
      <circle class="cls-2" cx="102.64" cy="49.23" r="2.35"/>
    </g>
  </g>
  <g>
    <rect class="cls-1" x="125.56" width="54.28" height="110.72"/>
    <g>
      <polygon class="cls-2" points="132.94 63.83 147.06 46.89 161.18 63.83 132.94 63.83"/>
      <polygon class="cls-2" points="158.35 63.83 165.41 55.36 172.47 63.83 158.35 63.83"/>
      <circle class="cls-2" cx="165.41" cy="49.23" r="2.35"/>
    </g>
  </g>
</svg>
      `,
    },
    '4 Square Images With Text': {
      title: '4 Square Images With Text',
      svg: `
<?xml version="1.0" encoding="UTF-8"?>
<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 190.33 55.9">
  <defs>
    <style>
      .cls-1 {
        fill: #384152;
      }

      .cls-2 {
        fill: #718096;
      }
    </style>
  </defs>
  <g>
    <g>
      <rect class="cls-1" width="42.55" height="42.55"/>
      <g>
        <polygon class="cls-2" points="6.47 27.62 17.04 14.93 27.62 27.62 6.47 27.62"/>
        <polygon class="cls-2" points="25.5 27.62 30.79 21.28 36.07 27.62 25.5 27.62"/>
        <circle class="cls-2" cx="30.79" cy="16.69" r="1.76"/>
      </g>
    </g>
    <g>
      <rect class="cls-1" x="49.05" width="42.55" height="42.55"/>
      <g>
        <polygon class="cls-2" points="55.52 27.62 66.09 14.93 76.66 27.62 55.52 27.62"/>
        <polygon class="cls-2" points="74.55 27.62 79.83 21.28 85.12 27.62 74.55 27.62"/>
        <circle class="cls-2" cx="79.83" cy="16.69" r="1.76"/>
      </g>
    </g>
    <g>
      <rect class="cls-1" x="97.35" width="42.55" height="42.55"/>
      <g>
        <polygon class="cls-2" points="103.82 27.62 114.39 14.93 124.97 27.62 103.82 27.62"/>
        <polygon class="cls-2" points="122.85 27.62 128.14 21.28 133.42 27.62 122.85 27.62"/>
        <circle class="cls-2" cx="128.14" cy="16.69" r="1.76"/>
      </g>
    </g>
    <g>
      <rect class="cls-1" x="147.79" width="42.55" height="42.55"/>
      <g>
        <polygon class="cls-2" points="154.26 27.62 164.83 14.93 175.4 27.62 154.26 27.62"/>
        <polygon class="cls-2" points="173.29 27.62 178.57 21.28 183.86 27.62 173.29 27.62"/>
        <circle class="cls-2" cx="178.57" cy="16.69" r="1.76"/>
      </g>
    </g>
  </g>
  <g>
    <rect class="cls-1" y="47.28" width="42.55" height="2.31"/>
    <rect class="cls-1" y="50.43" width="42.55" height="2.31"/>
    <rect class="cls-1" y="53.59" width="42.55" height="2.31"/>
    <rect class="cls-1" x="49.05" y="47.28" width="42.55" height="2.31"/>
    <rect class="cls-1" x="49.05" y="50.43" width="42.55" height="2.31"/>
    <rect class="cls-1" x="49.05" y="53.59" width="42.55" height="2.31"/>
    <rect class="cls-1" x="97.35" y="47.28" width="42.55" height="2.31"/>
    <rect class="cls-1" x="97.35" y="50.43" width="42.55" height="2.31"/>
    <rect class="cls-1" x="97.35" y="53.59" width="42.55" height="2.31"/>
    <rect class="cls-1" x="147.79" y="47.28" width="42.55" height="2.31"/>
    <rect class="cls-1" x="147.79" y="50.43" width="42.55" height="2.31"/>
    <rect class="cls-1" x="147.79" y="53.59" width="42.55" height="2.31"/>
  </g>
</svg>
      `,
    },
    '3 Square Images With Text': {
      title: '3 Square Images With Text',
      svg: `
<?xml version="1.0" encoding="UTF-8"?>
<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 177.28 70.84">
  <defs>
    <style>
      .cls-1 {
        fill: #384152;
      }

      .cls-2 {
        fill: #718096;
      }
    </style>
  </defs>
  <g>
    <g>
      <rect class="cls-1" width="53.92" height="53.92"/>
      <g>
        <polygon class="cls-2" points="8.2 35 21.6 18.92 35 35 8.2 35"/>
        <polygon class="cls-2" points="32.32 35 39.02 26.96 45.71 35 32.32 35"/>
        <circle class="cls-2" cx="39.02" cy="21.15" r="2.23"/>
      </g>
    </g>
    <g>
      <rect class="cls-1" x="62.15" width="53.92" height="53.92"/>
      <g>
        <polygon class="cls-2" points="70.36 35 83.75 18.92 97.15 35 70.36 35"/>
        <polygon class="cls-2" points="94.47 35 101.17 26.96 107.87 35 94.47 35"/>
        <circle class="cls-2" cx="101.17" cy="21.15" r="2.23"/>
      </g>
    </g>
    <g>
      <rect class="cls-1" x="123.37" width="53.92" height="53.92"/>
      <g>
        <polygon class="cls-2" points="131.57 35 144.96 18.92 158.36 35 131.57 35"/>
        <polygon class="cls-2" points="155.68 35 162.38 26.96 169.08 35 155.68 35"/>
        <circle class="cls-2" cx="162.38" cy="21.15" r="2.23"/>
      </g>
    </g>
  </g>
  <g>
    <rect class="cls-1" y="59.92" width="53.92" height="2.93"/>
    <rect class="cls-1" y="63.91" width="53.92" height="2.93"/>
    <rect class="cls-1" y="67.91" width="53.92" height="2.93"/>
    <rect class="cls-1" x="62.15" y="59.92" width="53.92" height="2.93"/>
    <rect class="cls-1" x="62.15" y="63.91" width="53.92" height="2.93"/>
    <rect class="cls-1" x="62.15" y="67.91" width="53.92" height="2.93"/>
    <rect class="cls-1" x="123.37" y="59.92" width="53.92" height="2.93"/>
    <rect class="cls-1" x="123.37" y="63.91" width="53.92" height="2.93"/>
    <rect class="cls-1" x="123.37" y="67.91" width="53.92" height="2.93"/>
  </g>
</svg>
      `,
    },
    '2 Square Images With Text': {
      title: '2 Square Images With Text',
      svg: `
        <?xml version="1.0" encoding="UTF-8"?>
<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 124.18 75.79">
  <defs>
    <style>
      .cls-1 {
        fill: #384152;
      }

      .cls-2 {
        fill: #718096;
      }
    </style>
  </defs>
  <g>
    <g>
      <rect class="cls-1" width="57.68" height="57.68"/>
      <g>
        <polygon class="cls-2" points="8.77 37.45 23.11 20.25 37.44 37.45 8.77 37.45"/>
        <polygon class="cls-2" points="34.58 37.45 41.74 28.85 48.91 37.45 34.58 37.45"/>
        <circle class="cls-2" cx="41.74" cy="22.62" r="2.39"/>
      </g>
    </g>
    <g>
      <rect class="cls-1" x="66.5" width="57.68" height="57.68"/>
      <g>
        <polygon class="cls-2" points="75.27 37.45 89.61 20.25 103.94 37.45 75.27 37.45"/>
        <polygon class="cls-2" points="101.07 37.45 108.24 28.85 115.41 37.45 101.07 37.45"/>
        <circle class="cls-2" cx="108.24" cy="22.62" r="2.39"/>
      </g>
    </g>
  </g>
  <g>
    <rect class="cls-1" y="64.1" width="57.68" height="3.13"/>
    <rect class="cls-1" y="68.38" width="57.68" height="3.13"/>
    <rect class="cls-1" y="72.65" width="57.68" height="3.13"/>
    <rect class="cls-1" x="66.5" y="64.1" width="57.68" height="3.13"/>
    <rect class="cls-1" x="66.5" y="68.38" width="57.68" height="3.13"/>
    <rect class="cls-1" x="66.5" y="72.65" width="57.68" height="3.13"/>
  </g>
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
    </svg>
  `
}

export default {
  generateComponentPreview,
  getPlaceholderImageDataUrl,
}
