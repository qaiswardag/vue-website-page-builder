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
-
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

Grammar: Should be "Get up and running quickly by initializing the builder in your Vue project. The following code example demonstrates the minimal setup required to start building pages.

- You must explicitly call initPageBuilder() once in your app entry (e.g. main.ts) before using any Page Builder features.

- Then, use `getPageBuilder()` anywhere to access the shared builder instance.

- Import the CSS file once, ideally in your `main.js`/`main.ts` or root component for proper styling and automatic icon loading.

```typescript
import { createApp } from 'vue'
import App from './App.vue'
import { initPageBuilder } from '@myissue/vue-website-page-builder'
import '@myissue/vue-website-page-builder/style.css'

// Initialize shared builder instance
// MUST be called once
initPageBuilder()

const app = createApp(App)
app.mount('#app')
```

#### Accessing the Shared Page Builder Service

Once you have initialized the Page Builder service in your application (by calling `initPageBuilder()` once in your app entry), you can access the shared instance anywhere by using the `getPageBuilder()` composable. This ensures you are always working with the same underlying builder service and state, keeping your application consistent and synchronized.

**Why Access the Shared Instance?**
The Page Builder is implemented as a singleton service. This means there is only one instance that manages all page-building logic and state across your app. Using this shared instance avoids creating multiple, isolated copies of the builder, which can lead to data inconsistencies, synchronization issues, and unpredictable behavior.

**There’s only one source of truth:**  
By accessing the shared instance, your components and modules interact with the same centralized service, allowing smooth and reliable updates and coordination. This guarantees that all builder actions and state changes are reflected everywhere in your app.

**How to Use the Shared Instance**
Whenever you need to interact with the Page Builder service, import and call the `getPageBuilder()` function. This will return the existing instance you initialized earlier — no need to create a new one.

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

// Retrieve Page Builder service instance
const pageBuilderService = getPageBuilder()
await pageBuilderService.startBuilder(configPageBuilder)
</script>

<template>
  <PageBuilder />
</template>
```

### Important: CSS Import Required

The Page Builder requires its CSS file to be imported for proper styling and automatic icon loading.

**You only need to import the CSS file once, ideally in your `main.js`/`main.ts` or root component.**  
If you have already imported it in your app entry, you do not need to import it again in individual components.

```vue
<script setup>
import '@myissue/vue-website-page-builder/style.css'
</script>
```

This import automatically includes:

- ✅ Page Builder styles
- ✅ Responsive design utilities

### Important: CSS Prefix (`pbx-`) for All Builder Styles

The Page Builder automatically adds a `pbx-` prefix to **all CSS classes** it generates or processes, including Tailwind utility classes and any custom classes you add through the builder interface. This namespacing ensures that the builder’s styles will **not conflict** with your application's existing CSS or Tailwind classes.

**What does this mean for you?**

- If you create your own custom components to use with the Page Builder (instead of the default ones), **remember that the builder will automatically add the `pbx-` prefix to every CSS class** in your component’s markup. This applies to both Tailwind utility classes and any custom classes you define.
- For example, if you use a custom class called `myCustomCSSClass` in your component, it will be rendered as `pbx-myCustomCSSClass` in the final HTML output.
- All Tailwind classes are also prefixed, e.g. `bg-red-100` becomes `pbx-bg-red-100`, `md:grid-cols-2` becomes `md:pbx-grid-cols-2`, etc.

**Why is this important?**

- The prefixing is done automatically by the builder to avoid style conflicts between the builder’s output and your own app’s CSS or Tailwind setup.

**Example:**

```html
<!-- Builder output -->
<div class="pbx-myCustomCSSClass pbx-bg-blue-100 md:pbx-grid-cols-2"></div>
```

```css
/* To style this element, use the pbx- prefix */
.pbx-myCustomCSSClass {
  margin-bottom: 2rem;
}
```

**When** you import the builder’s CSS file:

```vue
<script setup>
import '@myissue/vue-website-page-builder/style.css'
</script>
```

**What does this mean for you?**

- ✅ **All Tailwind and custom CSS classes in this file prefixed with `pbx-` to prevent style conflicts.**.
- ✅ **There is no risk of style conflicts between the builder and your app, since all builder-related styles are namespaced.**.

### Rendering Only the HTML Output from the Page Builder in Other Frameworks (React, Nuxt, etc.)

If you use the Page Builder to generate HTML pages and want to render them in another application (such as React, Nuxt, or any server-side app), simply install the Page Builder package in your target project and import its CSS file. This ensures that all prefix Tailwind and builder-specific styles are applied to the rendered HTML.

```vue
<script setup>
import '@myissue/vue-website-page-builder/style.css'
</script>
```

This will apply all the necessary styles to any HTML output from the builder, even if you render it with `dangerouslySetInnerHTML`, `v-html`, or similar methods.

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

> **Note:** You do not need to import any Vue components if you only want to render the HTML. Just import the CSS file.

### Provide Config to PageBuilder

Get up and running quickly by importing the PageBuilder component, setting up your configuration, and initializing the builder in your Vue project. The following example demonstrates the minimal setup required to start building pages with your own config and logo.

- Provide a `configPageBuilder` object to customize the builder, such as:
  - `formType` (required): Used to retrieve the correct content from local storage. Specify whether you are creating or updating a resource by setting this to `create` or `update` in the `updateOrCreate` config.
  - `formName` (required): Specify the resource type (e.g., `"article"`, `"jobPost"`, `"store"`, etc.) in the `updateOrCreate` config. This is especially useful if your platform supports multiple resource types. By providing a unique name, the Page Builder can correctly manage layouts and local storage for each resource type, allowing users to continue where they left off for different resources.
  - `resourceData` (optional): Prefill the builder with initial resource data (e.g., `"title"`, `"id"`).
  - `userForPageBuilder` (optional): Pass an object with user information (e.g., `name` and `image`) in your config to display the logged-in user's details within the builder interface.
  - `pageBuilderLogo` (optional): Display your company logo in the builder toolbar.
  - `userSettings` (optional): Set user preferences such as theme, language, or autoSave.
  - `brandColor` (optional): Set your brand’s primary color for key UI elements in the builder (inside the `settings` config).

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
await pageBuilderService.startBuilder(configPageBuilder)
</script>

<template>
  <PageBuilder />
</template>
```

### Local Storage & Auto-Save

The Page Builder automatically manages all changes using the browser's local storage. Every change you make—such as adding, editing, or deleting components—is saved in local storage. This ensures your progress is not lost, even if you accidentally close the browser or navigate away.

- **Auto-Save:** The builder periodically auto-saves your changes to local storage, so you don't have to worry about losing your work.
- **Manual Save:** When the user clicks the Save button, the current state is also saved to local storage.

#### Example: Retrieving the Most Up-to-Date HTML Content for Form Submission

The Page Builder uses auto-save, so the data you retrieve from local storage always reflects the latest state of the builder—what the user currently sees in the editor. This means you are getting the most up-to-date content, saved live as the user edits.

To use the builder’s saved data in your form submission, you may want both the combined HTML content and the titles of each component. The `PageBuilderClass` provides a method to access the latest saved state from local storage. The example below demonstrates how to retrieve and parse this data, combining all component HTML into a single string and collecting all titles into an array. This is useful if you want to display or store both the rendered content and the structure or headings of your page.

**Important:**  
To retrieve the correct content from local storage, you must pass the same `resourceData` (such as `formType` and `formName`) to the Page Builder that was used when the content was originally saved. If the resource data does not match, the Page Builder will look for a different local storage key and may not find the expected content.

Example:

```js
const configPageBuilder = {
  updateOrCreate: {
    formType: 'create',
    formName: 'article',
  },
}
```

Call this logic when you want to submit or save the builder’s output, for example, when the user clicks a “Save” or “Publish” button. The code safely parses the local storage data, handles errors, and assigns the results to your form fields.

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

#### Resetting the Builder After Successful Resource Creation or Update

After you have successfully created or updated a resource (such as a post, article, or listing) using the Page Builder, it is important to clear the builder’s draft state and remove the corresponding local storage entry. This ensures that old drafts do not appear the next time the builder is opened for a new or existing resource.

You can reset the builder state and clear the draft with:

```js
// Delete the HTML from the Live DOM
pageBuilderService.deleteAllComponents()
// Clear Local Storage for the created or updated resource
await pageBuilderService.removeItemComponentsLocalStorage()
```

Always call these methods after a successful post or resource update to ensure users start with a fresh builder the next time they create or edit a resource.

### Loading Published Content from the Backend into the Page Builder

You can easily load existing content—created with this Page Builder—from any backend source.

- **Set `formType` (required):** This tells the builder to look for the correct content in local storage. Set `formType` to `update`.
- **Set `formName` (required):** Specify the resource type (for example, `"article"`, `"jobPost"`, `"store"`, etc.) in the `updateOrCreate` config.
- Even when loading an existing resource, these values are important if your platform supports multiple resource types. By providing a unique name, the Page Builder can properly manage layouts and local storage for the resource, allowing users to pick up right where they left off.

```vue
<script setup>
import { getPageBuilder } from '@myissue/vue-website-page-builder'
import html from './html.json'

const configPageBuilder = {
  updateOrCreate: {
    formType: 'update',
    formName: 'article',
  },
}

// Retrieve Page Builder service instance
const pageBuilderService = getPageBuilder()
await pageBuilderService.startBuilder(configPageBuilder)

// Load content from your backend or a JSON file into the Page Buildder
await pageBuilderService.mountComponentsToDOM(JSON.stringify(html))
</script>

<template>
  <PageBuilder />
</template>
```

**Note:**  
Your `html.json` file should contain an array of component objects, each with a `html_code` and `title` (optional) property, as shown below:

```json
{
  "components": [
    {
      "html_code": "<section><div class=\"relative py-4\"><div class=\"mx-auto max-w-7xl lg:px-4 px-2\"><div class=\"pbx-break-words pbx-text-5xl\"><h2><strong>Demo Content</strong></h2></div></div></div></section>",
      "title": "Header H2"
    },
    {
      "html_code": "<section>...</section>",
      "title": "Text"
    }
    // ...more components
  ]
}
```

This approach ensures your users can seamlessly load and edit previously published content, providing a smooth and reliable editing experience.

### Automatic Draft Recovery

The Page Builder automatically checks for any unsaved drafts in local storage for the current resource.  
If a draft is found, users will be prompted to either continue where they left off or use the version currently loaded from your backend.

- **`formType` (required):** Used to retrieve the correct content from local storage. Set this to either `create` or `update` in the `updateOrCreate` config, depending on your use case.
- **`formName` (required):** Specify the resource type (e.g., `"article"`, `"jobPost"`, `"store"`, etc.) in the `updateOrCreate` config. This is especially useful if your platform supports multiple resource types. By providing a unique name, the Page Builder can correctly manage layouts and local storage for each resource type, allowing users to continue where they left off for different resources.

```vue
<script setup>
import { getPageBuilder } from '@myissue/vue-website-page-builder'

const configPageBuilder = {
  updateOrCreate: {
    formType: 'update',
    formName: 'article',
  },
}

// Retrieve Page Builder service instance
const pageBuilderService = getPageBuilder()
await pageBuilderService.startBuilder(configPageBuilder)
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
