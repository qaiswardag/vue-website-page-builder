# @myissue/vue-website-page-builder

<p align="center" dir="auto">
<img width="200" style="max-width: 100%;" src="./public/logo/logo.svg" alt="Logo">
</p>

## **DEVELOPMENT VERSION - NOT READY FOR PRODUCTION**

## Overview

A Vue 3 page builder component with drag & drop functionality for creating dynamic web pages.

## Installation

```bash
npm install @myissue/vue-website-page-builder
```

# Free Click & Drop Page Builder

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

## Contributing

1. Fork the repository
2. Create your feature branch
3. Make your changes
4. Build and test locally
5. Submit a pull request

## License

[MIT License](./LICENSE)
