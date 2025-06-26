<p align="center" dir="auto">
<img width="200" style="max-width: 100%;" src="./public/logo/logo.svg" alt="Vue Website Page Builder Logo" />
</p>

# Free Click & Drop Page Builder

## Overview

A Vue 3 page builder component with drag & drop functionality for creating dynamic web pages.

Tailored for Vue Developers
If you're a Vue 3 developer, this builder feels right at home. It installs quickly via npm and supports full customization through props and configuration objects. You can even set specific user settings like image, name, theme, language, and autosave preferences, making it a personalized experience for every user.

Integration is easy, and content is safely auto stored in the browser's local storage. You can retrieve HTML content when you're ready to publish, giving you total control over content output.

Want to include your company logo in the editor toolbar or reflect your brand's color scheme throughout the builder interface? Done. With robust configuration options, branding the builder to match your product or client identity is quick and effortless.

## 🚀 Get Started in Minutes

Easy setup and instant productivity.  
Follow the [Quick Start](#quick-start) guide to begin building with just a few simple steps.

---

## Installation

The web builder for stunning pages. Enable users to design and publish modern pages at any scale.

```bash
npm install @myissue/vue-website-page-builder
```

## Click & Drop Page Builder

[Play around with the Page Builder](https://www.builder-demo.myissue.dk)

Lightweight & Minimalist Page Builder with an elegant and intuitive design, focused on simplicity and speed.

Build responsive pages like listings, jobs or blog posts and manage content easily using the free Click & Drop Page Builder.

<img style="max-width: 100%;" src="./public/home/editor.jpg" alt="Vue Website Page Builder - the editor" />

## Demo

Introducing **The Lightweight Free Vue Click & Drop Page Builder**
create and enhance digital experiences with Vue on any backend.

[Play around with the Page Builder](https://www.builder-demo.myissue.dk)

## About

A Page Builder designed for growth. Build your website pages with ready-made components that are fully customizable and always responsive, designed to fit every need. A powerful Page Builder for growing merchants, brands, and agencies.

<img style="max-width: 100%;" src="./public/home/media_library.jpg" alt="Vue Website Page Builder - the editor" />

## Features

Includes:

- **Page Builder**: Click & Drop Page Builder.
- **Customizable Design**: Tailor the look to match your brand.

The Page Builder is packed with features:

- **Click & Drop**: Easily rearrange elements on your page.
- **Reordering**: Change the order of your content without hassle.
- **True Visual Editing**: See your changes in real-time as you make them.
- **Media Library**: Easily inject your own custom media library component.
- **Local Storage & Auto-Save**: Never lose your work - changes are saved as you go.
- **Unsplash**: Unsplash Integration.
- **Responsive Editing**: Ensure your site looks great on all devices.
- **Text Editing:** Edit text content live and in real-time.
- **Font Customization**: Choose the perfect fonts to match your style.
- **Undo & Redo**: Experiment confidently with the ability to revert changes.
- **Global Styles**: Global Styles for fonts, designs, & colors.
- **YouTube Videos**: Integrate video content smoothly.
- **Tailwind Support**: Fully compatible with Tailwind CSS (with automatic class prefixing to avoid conflicts).
- **Styles Prefixed**: No risk of style conflicts between the builder and your app.

Powerful Page Builder for any growing merchants, brands, & agencies. Empower users to create the perfect content with the Page Builder.

<img style="max-width: 100%;" src="./public/home/text_editor.jpg" alt="Vue Website Page Builder - the media library" />

## Technical details

- **Technologies**: This Page Builder is developed using TypeScript, Vue 3, the Composition API, Pinia, CSS, Tailwind CSS, and HTML.
- **Features**: Click & Drop Page Builder.

## Documentation

## Requirements

Please note that these instructions assume you have Node.js installed.

- Node.js ≥ 18.0.0
- Vue.js ≥ 3.0.0
- Modern browser with ES6+ support

## Getting started & installation

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

## Quick Start

### Initializing the Page Builder

To get started with the Page Builder, follow these steps:

- **Call `initPageBuilder()` once** in your application entry point (e.g., `main.ts` or `main.js`). This sets up the shared builder instance for your entire app.
- **Access the shared builder instance** anywhere in your application using the `getPageBuilder()` composable.
- **Import the CSS file once** in your `main.js`, `main.ts`, or root component to ensure proper styling and automatic icon loading.

```typescript
import { createApp } from 'vue'
import App from './App.vue'
import { initPageBuilder } from '@myissue/vue-website-page-builder'
import '@myissue/vue-website-page-builder/style.css'

// Initialize the shared Page Builder instance
// This must be called once in your app entry point
initPageBuilder()

const app = createApp(App)
app.mount('#app')
```

> **Note:**  
> You only need to import the CSS file once. If you have already imported it in your app entry, you do not need to import it again in individual components.

### Accessing the Shared Page Builder Service

After initializing the Page Builder service in your application (by calling `initPageBuilder()` once in your app entry point), you may access the shared instance from anywhere in your application using the `getPageBuilder()` composable.

> **Note**  
> The Page Builder is implemented as a singleton service. This ensures that all page-building logic and state are managed by a single, shared instance throughout your application.

#### Why Use the Shared Instance?

By always accessing the shared instance, you avoid creating multiple, isolated copies of the builder. This prevents data inconsistencies, synchronization issues, and unpredictable behavior. All components and modules interact with the same centralized service, ensuring that updates and state changes are reflected everywhere in your application.

#### Usage

Ensure the following configuration options are set:

- **`formType` (required):**  
  Indicates whether you are creating or updating a resource. This is used to retrieve the correct content from local storage.

- **`formName` (required):**  
  Specifies the resource type (for example, `article`, `jobPost`, `store`, etc.). This is essential for platforms supporting multiple resource types, as it enables the builder to manage layouts and local storage for each resource uniquely.

```vue
<script setup>
import { PageBuilder, getPageBuilder } from '@myissue/vue-website-page-builder'
import '@myissue/vue-website-page-builder/style.css'

const configPageBuilder = {
  updateOrCreate: {
    formType: 'create',
    formName: 'article',
  },
}

const pageBuilderService = getPageBuilder()
const result = await pageBuilderService.startBuilder(configPageBuilder)

console.info('You may inspect this result for message, status, or error:', result)
</script>

<template>
  <PageBuilder />
</template>
```

## Important: CSS Prefixing (`pbx-`)

All CSS classes generated or processed by the Page Builder—including Tailwind utilities and your custom classes—are automatically prefixed with `pbx-`. This ensures the builder’s styles never conflict with your app’s existing CSS or Tailwind setup.

**How does this affect you?**

- Any class you use in builder components will be output as `pbx-ClassName`.
- Tailwind classes are also prefixed, e.g. `bg-red-100` becomes `pbx-bg-red-100`, `md:grid-cols-2` becomes `md:pbx-grid-cols-2`.

**Example:**

```html
<div class="pbx-myCustomCSSClass pbx-bg-blue-100 md:pbx-grid-cols-2"></div>
```

```css
.pbx-myCustomCSSClass {
  margin-bottom: 2rem;
}
```

> **Note:**  
> Simply import the builder’s CSS file once in your project. All builder styles are namespaced, so there is no risk of style conflicts

## Rendering HTML Output in Other Frameworks (React, Nuxt, etc.)

You can use the Page Builder to generate HTML and render it in any frontend framework, such as React, Nuxt, or even server-side apps.

To ensure your content is styled correctly, simply install the Page Builder package in your target project and import its CSS file. All builder and Tailwind-prefixed styles will be applied automatically.

```js
// Import the builder's CSS file once in your project
import '@myissue/vue-website-page-builder/style.css'
```

This will apply all necessary styles to any HTML output from the builder, even if you render it with `dangerouslySetInnerHTML`, `v-html`, or similar methods.

**Example (React):**

```jsx
import '@myissue/vue-website-page-builder/style.css'

function MyPage({ html }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}
```

**Example (Nuxt/Vue):**

```vue
<script setup>
import '@myissue/vue-website-page-builder/style.css'
</script>
```

Then use `v-html` to render the HTML.

> **Note:**  
> You do not need to import any Vue components if you only want to render the HTML. Just import the CSS file.

## Providing Configuration to the Page Builder

The example below demonstrates the setup to start building pages, with additional options available for customization and branding.

Your `configPageBuilder` object can include:

- **`formType` (required):**  
  Used to retrieve the correct content from local storage. Specify whether you are creating or updating a resource.
- **`formName` (required):**  
  The resource type (e.g., `article`, `jobPost`, `store`, etc.). This is especially useful for platforms supporting multiple resource types, allowing the builder to manage layouts and storage for each resource uniquely.
- **`resourceData` (optional):**  
  Prefill the builder with initial resource data (e.g., `title`, `id`).
- **`userForPageBuilder` (optional):**  
  Pass user information (such as `name` and `image`) to display the logged-in user’s details in the builder.
- **`pageBuilderLogo` (optional):**  
  Display your company logo in the builder toolbar.
- **`userSettings` (optional):**  
  Set user preferences such as theme, language, or auto-save.
- **`brandColor` (optional):**  
  Set your brand’s primary color for key UI elements (inside the `settings` config).

```vue
<script setup>
import { getPageBuilder } from '@myissue/vue-website-page-builder'

const configPageBuilder = {
  updateOrCreate: {
    formType: 'create', // Set to 'create' or 'update'
    // Set the resource type for better local storage and multi-resource support
    formName: 'article',
  },
  resourceData: {
    title: 'Demo Article',
    id: 1,
  },
  userForPageBuilder: { name: 'John Doe', image: '/jon_doe.jpg' },
  pageBuilderLogo: {
    src: '/logo/logo.svg',
  },
  userSettings: {
    theme: 'light',
    language: 'en',
    autoSave: true,
  },
  settings: {
    brandColor: '#DB93B0',
  },
}

// Retrieve Page Builder service instance
const pageBuilderService = getPageBuilder()
const result = await pageBuilderService.startBuilder(configPageBuilder)

console.info('You may inspect this result for message, status, or error:', result)
</script>

<template>
  <PageBuilder />
</template>
```

## Local Storage & Auto-Save

The Page Builder automatically saves all changes to the browser’s local storage. Every time you add, edit, or delete a component, your progress is preserved—even if you close the browser or navigate away.

- **Auto-Save:** Changes are periodically saved as you work.
- **Manual Save:** Clicking the Save button also stores the current state.

## Retrieving the Latest HTML Content for Form Submission

The builder’s auto-save ensures that the data in local storage always reflects the latest state of your page. You can retrieve this data at any time for form submission, publishing, or preview.

To get the most up-to-date content, use the same `resourceData` (such as `formType` and `formName`) that was used when saving. If these values do not match, the builder may not find the expected content.

**Example:**

```js
const configPageBuilder = {
  updateOrCreate: {
    formType: 'create',
    formName: 'article',
  },
}
```

Call this logic when you need to submit or save the builder’s output—for example, when the user clicks “Save” or “Publish.” The code below safely retrieves and parses the latest data from local storage, handling errors and assigning the results to your form fields.

```vue
<script setup>
import { getPageBuilder } from '@myissue/vue-website-page-builder'

const configPageBuilder = {
  updateOrCreate: {
    formType: 'create',
    formName: 'article',
  },
}

// Retrieve Page Builder service instance
const pageBuilderService = getPageBuilder()
await pageBuilderService.startBuilder(configPageBuilder)

let storedComponents = pageBuilderService.loadStoredComponentsFromStorage()
let contentFromPageBuilder = ''

try {
  storedComponents = JSON.parse(storedComponents)
  contentFromPageBuilder =
    storedComponents && Array.isArray(storedComponents.components)
      ? storedComponents.components.map((component) => component.html_code).join('')
      : ''
} catch (e) {
  console.error('Unable to parse storedComponents from localStorage:', e)
  contentFromPageBuilder = ''
} finally {
  yourForm.content = contentFromPageBuilder
}
</script>
```

### Resetting the Builder After Successful Resource Creation or Update

After you have successfully created or updated a resource (such as a post, article, or listing) using the Page Builder, it is important to clear the builder’s draft state and remove the corresponding local storage entry. This ensures that old drafts do not appear the next time the builder is opened for a new or existing resource.

You can reset the builder state and clear the draft with:

```js
// Delete the HTML from the Live DOM
pageBuilderService.deleteAllComponentsFromDOM()
// Clear Local Storage for the created or updated resource
await pageBuilderService.removeCurrentComponentsFromLocalStorage()
```

Always call these methods after a successful post or resource update to ensure users start with a fresh builder the next time they create or edit a resource.

## Loading existing Content or Components into the Page Builder

The Page Builder makes it simple to load previously published content from any backend source, such as your database or API.

The `startBuilder` method accepts two arguments:

1. **Configuration** (required):  
   The builder configuration object.
2. **Components Data** (optional):  
   An array of component objects. Each object must include a `html_code` string and may optionally include a title string. This is especially useful when loading previously published or saved content into the builder.

**Important**

To load existing content into the Page Builder, ensure that the formType is set to update in your configuration.
This tells the builder to expect and load your provided components array as the initial content.

```vue
<script setup>
import { getPageBuilder } from '@myissue/vue-website-page-builder'

const configPageBuilder = {
  updateOrCreate: {
    formType: 'update',
    formName: 'article',
  },
}

// Retrieve the Page Builder service instance
const pageBuilderService = getPageBuilder()

// Load existing components into the builder (title is optional)
const myArticle = [
  { html_code: '<section>...</section>', title: 'Header H2' },
  { html_code: '<section>...</section>', title: 'Text' },
  { html_code: '<section>...</section>', title: 'Image' },
]

const result = await pageBuilderService.startBuilder(configPageBuilder, myArticle)

console.info('You may inspect this result for message, status, or error:', result)
</script>

<template>
  <PageBuilder />
</template>
```

> **Note:**  
> Each component’s `html_code` must be wrapped in a `<section>...</section>` tag.  
> This is how the Page Builder defines and separates individual components.

This approach ensures your users can seamlessly load and edit previously published content, providing a smooth and reliable editing.

## Automatic Draft Recovery

The Page Builder automatically checks for unsaved drafts in local storage for the current resource.  
If a draft is found, users are prompted to either continue where they left off or use the version loaded from your backend.

- **`formType` (required):**  
  Determines which draft to load from local storage. Set this to either `create` or `update` in the `updateOrCreate` config, depending on your use case.
- **`formName` (required):**  
  Specifies the resource type (e.g., `article`, `jobPost`, `store`, etc.) in the `updateOrCreate` config. This is especially important if your platform supports multiple resource types. By providing a unique name, the Page Builder can correctly manage layouts and drafts for each resource, allowing users to pick up where they left

```vue
<script setup>
import { getPageBuilder } from '@myissue/vue-website-page-builder'

const configPageBuilder = {
  updateOrCreate: {
    formType: 'update',
    formName: 'article',
  },
}

const result = await pageBuilderService.startBuilder(configPageBuilder)

console.info('You may inspect this result for message, status, or error:', result)
</script>

<template>
  <PageBuilder />
</template>
```

### Custom Media Library Component or Custom Layout Builder Component

You may extend the Page Builder by adding your own media library or custom layout builder Component.  
Inject your components easily to tailor the builder to your application's needs.

📚 **[Custom Components Setup Guide](./CUSTOM_COMPONENTS_SETUP.md)**  
Learn how to create and integrate your own components step by step.

## Troubleshooting

### Fonts or Icons Not Displaying

If fonts or Material Icons are not displaying correctly, verify that:

**CSS Import**: Ensure you're importing the CSS file:

```js
import '@myissue/vue-website-page-builder/style.css'
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Make your changes
4. Build and test locally
5. Submit a pull request

## Security Vulnerabilities

If you discover a security vulnerability, please send us a message.

## Get in touch for customization or any questions

If you have any questions or if you're looking for customization, feel free to connect with our developer.

- [Email](mailto:qais.wardag@outlook.com)
- [LinkedIn](https://www.linkedin.com/in/qaiswardag)

## Feedback

Suggestions, or any issues you encounter while using this app. Feel free to reach out.

## Support the Project

We would greatly appreciate it if you could star the GitHub repository. Starring the project helps to boost its visibility.

## License

[MIT License](./LICENSE)
