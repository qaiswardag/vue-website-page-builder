<p align="center" dir="auto">
<img width="200" style="max-width: 100%;" src="./public/logo/logo.svg" alt="Logo">
</p>

## **DEVELOPMENT VERSION - NOT READY FOR PRODUCTION**

🚀 **Official Launch Date: June 15, 2025**  
_We're working hard to bring you a production-ready page builder. Stay tuned for updates!_

# Free Click & Drop Page Builder

## Overview

A Vue 3 page builder component with drag & drop functionality for creating dynamic web pages.

## Installation

```bash
npm install @myissue/vue-website-page-builder
```

### Important: CSS Import Required

The page builder requires its CSS file to be imported for proper styling and automatic icon loading:

```js
import '@myissue/vue-website-page-builder/style.css'
```

This import automatically includes:

- ✅ Page builder styles
- ✅ Google Fonts (Jost, Cormorant - no additional setup needed)
- ✅ Google Material Icons (no additional setup needed)
- ✅ Responsive design utilities

## Click & Drop Page Builder

[Play around with the page builder](https://www.builder-demo.myissue.dk)

This app was born out of my desire to create a minimalist page builder with an elegant and intuitive design.

The web builder for stunning pages. Enable users to design and publish modern pages at any scale. Build responsive pages like listings, jobs or blog posts and manage content easily using the free Click & Drop Page Builder.

To star the repository, simply click on the **Star** button located at the top-right corner of the GitHub page. Thank you in advance for your support! 🙌

## Demo

Introducing the **Free Vue Click & Drop Page Builder**
create and enhance digital experiences with Vue on any backend.

[Play around with the page builder](https://www.builder-demo.myissue.dk)

## About

A Page Builder designed for growth. Build your website pages with ready-made components that are fully customizable and always responsive, designed to fit every need. A powerful Page Builder for growing merchants, brands, and agencies.

## Features

Includes:

- **Page Builder**: Click & Drop Page Builder.
- **Customizable Design**: Tailor the look to match your brand.

The Page Builder is packed with features:

- **Click & Drop**: Easily rearrange elements on your page.
- **Reordering**: Change the order of your content without hassle.
- **True Visual Editing**: See your changes in real-time as you make them.
- **Media Library**: Access and manage your media files effortlessly.
- **Unsplash**: Unsplash Integration.
- **Responsive Editing**: Ensure your site looks great on all devices.
- **Text Editing**: Customize your text with ease.
- **Font Customization**: Choose the perfect fonts to match your style.
- **Undo & Redo**: Experiment confidently with the ability to revert changes.
- **Global Styles**: Global Styles for fonts, designs, & colors.
- **YouTube Videos**: Integrate video content smoothly.

Powerful Page Builder for any growing merchants, brands, &
agencies. Empower users to create the perfect content with the Page Builder.

## Technical details

- **Technologies**: This Page Builder is developed using JavaScript, Vue 3, the Composition API, Pinia, CSS, Tailwind CSS, and HTML.
- **Features**: Click & Drop Page Builder.

## Documentation

### Requirements

Please note that these instructions assume you have Node.js installed.

- Node.js ≥ 18.0.0
- Vue.js ≥ 3.0.0
- Modern browser with ES6+ support

### Getting started & installation

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

### Quick Start

```vue
<script setup>
import { PageBuilder } from '@myissue/vue-website-page-builder'
import '@myissue/vue-website-page-builder/style.css'
</script>

<template>
  <PageBuilder />
</template>
```

> **📝 Note**: Google Fonts (Jost, Cormorant) and Material Icons are automatically loaded when you import the CSS file. No additional setup required for fonts or icons!

### Updating Existing Resources

To load existing content that was created with this PageBuilder:

- Use `sharedPageBuilderStore` to ensure the external PageBuilderClass and internal PageBuilder component share the same state
- Import `PageBuilderClass` which contains all methods to manipulate and control the page builder state - in this case we need the `loadExistingContent()` method to load existing content into the page builder
- The PageBuilderClass uses the shared store to maintain state consistency between external operations and the internal PageBuilder component, ensuring that when you load content externally it appears correctly in the PageBuilder interface
- Set formType to "update" to tell the PageBuilder that you're editing an existing resource rather than creating a new one, which affects how the component handles data and interactions

1. **Set formType to "update"** in template:

```javascript
<PageBuilder
    updateOrCreate: {
      formType: 'update',
    }
/>
```

2. **Load existing content on mount**:

```javascript
import { onMounted } from 'vue'
import {
  PageBuilder,
  PageBuilderClass,
  sharedPageBuilderStore,
} from '@myissue/vue-website-page-builder'

const pageBuilderStateStore = sharedPageBuilderStore
const pageBuilderClass = new PageBuilderClass(pageBuilderStateStore)

onMounted(() => {
  pageBuilderClass.loadExistingContent(existingResourceFromBackend)
})
```

### Customization

Customizing the page builder is made simple since all the logic resides in the PageBuilder Class.

### Custom Components

Want to add your own media library or search functionality? Create custom components that can be injected into the page builder:

📚 **[Custom Components Setup Guide](./CUSTOM_COMPONENTS_SETUP.md)** - Learn how to create and integrate your own components

Example integration:

```vue
<script setup>
import { PageBuilder } from '@myissue/vue-website-page-builder'
import MediaLibraryComponent from './ComponentsPageBuilder/MediaLibraryComponent.vue'
import SearchComponent from './ComponentsPageBuilder/SearchComponent.vue'
</script>

<template>
  <PageBuilder :MediaLibraryComponent="MediaLibraryComponent" :SearchComponent="SearchComponent" />
</template>
```

### Company Logo

You can display your company logo in the page builder interface by passing a logo URL to the `PageBuilderLogo` prop. When provided, the logo will appear in the top toolbar of the page builder.

Basic Usage:

```vue
<script setup>
import { PageBuilder } from '@myissue/vue-website-page-builder'
import '@myissue/vue-website-page-builder/style.css'
</script>

<template>
  <PageBuilder PageBuilderLogo="/logo/square-logo.svg" />
</template>
```

configuration Options

| Prop              | Type     | Default | Description                         |
| ----------------- | -------- | ------- | ----------------------------------- |
| `PageBuilderLogo` | `String` | `null`  | URL path to your company logo image |

#### Examples

The logo will be displayed with a subtle border separator and proper spacing in the page builder toolbar.

## Troubleshooting

### Fonts or Icons Not Displaying

If fonts (Jost, Cormorant) or Material Icons are not displaying correctly, verify that:

1. **CSS Import**: Ensure you're importing the CSS file:

   ```js
   import '@myissue/vue-website-page-builder/style.css'
   ```

2. **Network Access**: The package loads fonts and icons from Google Fonts CDN. Ensure your application can access:

   ```
   https://fonts.googleapis.com/css2?family=Jost:*
   https://fonts.googleapis.com/css2?family=Cormorant:*
   https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined
   ```

3. **Content Security Policy**: If using CSP, allow Google Fonts:
   ```html
   <meta
     http-equiv="Content-Security-Policy"
     content="font-src 'self' https://fonts.googleapis.com;"
   />
   ```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Make your changes
4. Build and test locally
5. Submit a pull request

## License

[MIT License](./LICENSE)
