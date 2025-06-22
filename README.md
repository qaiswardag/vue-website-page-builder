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

## Installation

The web builder for stunning pages. Enable users to design and publish modern pages at any scale.

```bash
npm install @myissue/vue-website-page-builder
```

## Click & Drop Page Builder

[Play around with the Page Builder](https://www.builder-demo.myissue.dk)

Lightweight & Minimalist Page Builder with an elegant and intuitive design, focused on simplicity and speed.

Build responsive pages like listings, jobs or blog posts and manage content easily using the free Click & Drop Page Builder.

To star the repository, simply click on the **Star** button located at the top-right corner of the GitHub page.

<img style="max-width: 100%;" src="./public/home/editor.jpg" alt="Vue Website Page Builder - the editor" />

## Demo

Introducing the **The Lightweight Free Vue Click & Drop Page Builder**
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

Get up and running quickly and initializing the builder in your Vue project. The following example demonstrates the minimal setup required to start building pages.

- The Page Builder requires its CSS file to be imported for proper styling and automatic icon loading:

```vue
<script setup>
import { PageBuilder } from '@myissue/vue-website-page-builder'
import '@myissue/vue-website-page-builder/style.css'
</script>

<template>
  <PageBuilder />
</template>
```

### Important: CSS Import Required

The Page Builder requires its CSS file to be imported for proper styling and automatic icon loading:

```js
import '@myissue/vue-website-page-builder/style.css'
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

```js
import '@myissue/vue-website-page-builder/style.css'
```

**What does this mean for you?**

- ✅ **All Tailwind and custom CSS classes in this file prefixed with `pbx-` to prevent style conflicts.**.
- ✅ **There is no risk of style conflicts between the builder and your app, since all builder-related styles are namespaced.**.

### Rendering Only the HTML Output from the Page Builder in Other Frameworks (React, Nuxt, etc.)

If you use the Page Builder to generate HTML pages and want to render them in another application (such as React, Nuxt, or any server-side app), simply install the Page Builder package in your target project and import its CSS file. This ensures that all Tailwind and builder-specific styles are applied to the rendered HTML.

```js
import '@myissue/vue-website-page-builder/style.css'
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

```js
import '@myissue/vue-website-page-builder/style.css'
```

Then use `v-html` to render the HTML.

> **Note:** You do not need to import any Vue components if you only want to render the HTML. Just import the CSS file.

### Optional: Provide Config to PageBuilder

Get up and running quickly by importing the PageBuilder component, setting up your configuration, and initializing the builder in your Vue project. The following example demonstrates the minimal setup required to start building pages with your own config and logo.

- Use `sharedPageBuilderStore` to ensure the external PageBuilderClass and internal PageBuilder component share the same state
- (Optional) Provide a `configPageBuilder` object to customize the builder, such as:
  - `pageBuilderLogo` to display your company logo in the builder toolbar
  - `resourceData` to prefill the builder with initial data
  - `userSettings` to set user preferences such as theme, language, or autoSave
  - `brandColor` set brand’s primary color, which will be used for key UI elements in the builder in the `settings` config
  - `formName` (recommended): Specify the resource type (e.g., `"article"`, `"jobPost"`, `"store"`, etc.) in the `updateOrCreate` config. This is especially useful if your platform supports multiple resource types. By providing a unique name, the Page Builder can correctly manage layouts and local storage for each resource type, allowing users to continue where they left off for different resources.
  - Pass a `userForPageBuilder` object in your config to display or use the logged-in user's information within the builder (e.g., name and user image).

```vue
<script setup>
import {
  PageBuilder,
  PageBuilderClass,
  sharedPageBuilderStore,
} from '@myissue/vue-website-page-builder'
import '@myissue/vue-website-page-builder/style.css'

const configPageBuilder = {
  updateOrCreate: {
    // Set the resource type for better local storage and multi-resource support
    formName: 'article',
  },
  pageBuilderLogo: {
    src: '/logo/logo.svg',
  },
  userForPageBuilder: { name: 'John Doe', image: '/jane_doe.jpg' },
  resourceData: {
    title: 'Demo Article',
    id: 1,
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

// Use sharedPageBuilderStore for shared state between PageBuilderClass and PageBuilder component
const pageBuilderStateStore = sharedPageBuilderStore
const pageBuilderClass = new PageBuilderClass(pageBuilderStateStore)

// Initializing Page Builder with essential configuration
await pageBuilderClass.start(configPageBuilder)
</script>

<template>
  <PageBuilder />
</template>
```

### Company Logo & Logged-in User

You can display your company logo in the Page Builder interface and set the currently logged-in user by passing both a logo URL and user information in your config object:

- **Company Logo:** Set the logo URL in your config object and pass it to the PageBuilder using `pageBuilderClass.start(configPageBuilder)`. When provided, the logo will appear at the top of the Page Builder with proper spacing in the toolbar.
- **Logged-in User:** Pass a `userForPageBuilder` object in your config to display or use the logged-in user's information within the builder (e.g., name and user image).

**Basic Usage:**

- You can display your company logo in the page builder interface by setting the `src` in your config object and passing it to the PageBuilder using `pageBuilderClass.start(configPageBuilder)`. When provided, the logo will appear in the top of the page builder.

Basic Usage:

```vue
<script setup>
import {
  PageBuilder,
  PageBuilderClass,
  sharedPageBuilderStore,
} from '@myissue/vue-website-page-builder'
import '@myissue/vue-website-page-builder/style.css'

const configPageBuilder = {
  pageBuilderLogo: {
    src: '/logo/logo.svg',
  },
  userForPageBuilder: { name: 'John Doe', image: '/jane_doe.jpg' },
}

// Use sharedPageBuilderStore for shared state between PageBuilderClass and PageBuilder component
const pageBuilderStateStore = sharedPageBuilderStore
const pageBuilderClass = new PageBuilderClass(pageBuilderStateStore)

// Initializing Page Builder with essential configuration
await pageBuilderClass.start(configPageBuilder)
</script>

<template>
  <PageBuilder />
</template>
```

Configuration Options

| Prop              | Type     | Default | Description                         |
| ----------------- | -------- | ------- | ----------------------------------- |
| `PageBuilderLogo` | `String` | `null`  | URL path to your company logo image |

### Local Storage

The Page Builder automatically manages all changes using the browser's local storage. Every change you make—such as adding, editing, or deleting components—is saved in local storage. This ensures that your progress is not lost, even if you accidentally close the browser or navigate away.

- **Auto-Save:** The builder periodically auto-saves your changes to local storage, so you don't have to worry about losing your work.
- **Manual Save:** When the user clicks the Save button, the current state is also saved to local storage.

### Getting HTML Content from Local Storage for Form Submission

To use the builder’s saved data in your form submission, you may want both the combined HTML content and the titles of each component. The PageBuilderClass provides a method to access the latest saved state from local storage. The example below demonstrates how to retrieve and parse this data, combining all component HTML into a single string and collecting all titles into an array. This is useful if you want to display or store both the rendered content and the structure or headings of your page.

You should call this logic when you want to submit or save the builder’s output, for example, when the user clicks a “Save” or “Publish” button. The code safely parses the local storage data, handles errors, and assigns the results to your form fields.

**Important:**
To retrieve the correct content from local storage, you must pass the same resourceData (such as formType and formName) to the Page Builder that was used when the content was originally saved. If the resource data does not match, the Page Builder will look for a different local storage key and may not find the expected content.
Example:

```js
const configPageBuilder = {
  updateOrCreate: {
    formType: 'create',
    formName: 'article',
  },
}
```

Example Getting HTML Content from Local Storage for Form Submission

```vue
<script setup>
import {
    PageBuilder,
    PageBuilderClass,
    sharedPageBuilderStore,
} from "@myissue/vue-website-page-builder";
import "@myissue/vue-website-page-builder/style.css";

// Make sure to initialize these before using
const pageBuilderStateStore = sharedPageBuilderStore;
const pageBuilderClass = new PageBuilderClass(pageBuilderStateStore);


const configPageBuilder = {
  updateOrCreate: {
    formType: 'create',
    formName: 'article',
  },
};

await pageBuilderClass.start(configPageBuilder);


let storedComponents = pageBuilderClass.loadStoredComponentsFromStorage();
let contentFromPageBuilder = "";

try {
    storedComponents = JSON.parse(storedComponents);
    contentFromPageBuilder = storedComponents && Array.isArray(storedComponents.components)
        ? storedComponents.components
          .map((component) => component.html_code).join("")
          : "";
} catch (e) {
    console.error(
        "Unable to parse storedComponents from localStorage:",
        e
    );
    contentFromPageBuilder = "";
} finally {
    yourForm.content = contentFromPageBuilder;
}
<script>
```

#### Resetting the Builder After Successful Resource Creation

After you have successfully created a new resource (such as a post, article, or listing) using the Page Builder with formType: 'create', it is important to clear the builder’s draft state and remove the corresponding local storage entry. This ensures that old drafts do not appear the next time the builder is opened for a new resource.

Always call these methods after a successful post or resource creation to ensure users start with a fresh builder the next time they create a new resource.

```vue
<script setup>
import {
    PageBuilder,
    PageBuilderClass,
    sharedPageBuilderStore,
} from "@myissue/vue-website-page-builder";
import "@myissue/vue-website-page-builder/style.css";

// Make sure to initialize these before using
const pageBuilderStateStore = sharedPageBuilderStore;
const pageBuilderClass = new PageBuilderClass(pageBuilderStateStore);


const configPageBuilder = {
  updateOrCreate: {
    formType: 'create',
    formName: 'article',
  },
};

await pageBuilderClass.start(configPageBuilder);

const createResource = async function(){
pageBuilderClass.deleteAllComponents();
await pageBuilderClass.removeItemComponentsLocalStorage();
};
<script>
```

#### Resetting the Builder After Successful Resource Update

After you have successfully updated an existing resource (such as a post, article, or listing) using the Page Builder with formType: 'update', you should clear the builder’s state and remove the corresponding local storage entry. This prevents outdated drafts from being loaded the next time you edit the same resource.

```vue
<script setup>
import {
    PageBuilder,
    PageBuilderClass,
    sharedPageBuilderStore,
} from "@myissue/vue-website-page-builder";
import "@myissue/vue-website-page-builder/style.css";

// Make sure to initialize these before using
const pageBuilderStateStore = sharedPageBuilderStore;
const pageBuilderClass = new PageBuilderClass(pageBuilderStateStore);


const configPageBuilder = {
  updateOrCreate: {
    formType: 'update',
    formName: 'article',
  },
};

await pageBuilderClass.start(configPageBuilder);

const updateResource = async function() {
  pageBuilderClass.deleteAllComponents();
  await pageBuilderClass.removeItemComponentsLocalStorage();
};

<script>
```

#### Resource-Specific Storage Keys

Each save is stored in local storage using a unique key. The key is determined by whether you are creating a new resource or updating an existing one:

- **New Resource:** The key will be prefixed with `page-builder-create-resource`.
- **Updating Resource:** The key will be prefixed with `page-builder-update-resource`.

You can further customize and uniquely identify the storage key by providing a `formName` in your `configPageBuilder`:

```vue
<script setup>
import {
  PageBuilder,
  PageBuilderClass,
  sharedPageBuilderStore,
} from '@myissue/vue-website-page-builder'
import '@myissue/vue-website-page-builder/style.css'

const configPageBuilder = {
  updateOrCreate: {
    // Set the resource type for better local storage and multi-resource support
    formName: 'article',
  },
  // ...other config options
}

const pageBuilderClass = new PageBuilderClass(pageBuilderStateStore)

// Initializing Page Builder with essential configuration
await pageBuilderClass.start(configPageBuilder)

// Populating page builder with existing resource content
pageBuilderClass.mountComponentsToDOM(existingResourceFromBackend)
</script>

<template>
  <PageBuilder />
</template>
```

This allows you to manage drafts for multiple resource types (e.g., articles, jobs, stores) independently in local storage.

> **Tip:** The local storage key will automatically include the resource type if `formName` is provided, ensuring that drafts for different resource types do not overwrite each other.

### Restoring Unfinished Drafts for New Resources

If a user started creating a new resource but hasn't finished (e.g., they want to continue the next day), you can restore their draft from local storage:

- Set `formType` to `"create"` in your config object.
- The PageBuilder will automatically look for any saved draft in local storage (based on the resource type) and load it if available.

**Example: Set `formType` to "create" for continuing a new resource draft**

```vue
<script setup>
import {
  PageBuilder,
  PageBuilderClass,
  sharedPageBuilderStore,
} from '@myissue/vue-website-page-builder'
import '@myissue/vue-website-page-builder/style.css'

const pageBuilderStateStore = sharedPageBuilderStore

const configPageBuilder = {
  updateOrCreate: {
    formType: 'create',
    formName: 'article',
  },
}

const pageBuilderClass = new PageBuilderClass(pageBuilderStateStore)

// Initializing Page Builder with essential configuration
await pageBuilderClass.start(configPageBuilder)
</script>

<template>
  <PageBuilder />
</template>
```

> **Tip:** Use `formType: 'create'` for new resources and `formType: 'update'` for editing existing resources. This ensures the correct local storage key is used and the right content is loaded.

### Loading Published Content from the Backend into the Page Builder

To load existing content that was created with this PageBuilder from any backend:

- Use `sharedPageBuilderStore` to ensure the external `PageBuilderClass` and internal `PageBuilder` component share the same state.
- Import `PageBuilderClass` which contains all methods to manipulate and control the page builder state. Use the `mountComponentsToDOM()` method to load existing content into the page builder.
- The `PageBuilderClass` uses the shared store to maintain state consistency between external operations and the internal `PageBuilder` component, ensuring that when you load content externally it appears correctly in the PageBuilder interface.
- Set `formType` to `"update"` in your config object and pass it to the PageBuilder using `pageBuilderClass.start(configPageBuilder)`. This tells the PageBuilder that you're editing an existing resource rather than creating a new one, which affects how the component handles data and interactions.

**Example: Set `formType` to "update" for editing an existing resource**

```vue
<script setup>
import {
  PageBuilder,
  PageBuilderClass,
  sharedPageBuilderStore,
} from '@myissue/vue-website-page-builder'
import '@myissue/vue-website-page-builder/style.css'

const pageBuilderStateStore = sharedPageBuilderStore

const configPageBuilder = {
  updateOrCreate: {
    formType: 'update',
    formName: 'article',
  },
}

const pageBuilderClass = new PageBuilderClass(pageBuilderStateStore)

// Saved content in DB from already created content using the Page Builder
const existingResourceFromBackend = [
  {
    html_code:
      '<section><div class="relative py-4"><div class="mx-auto max-w-7xl lg:px-4 px-2"><div class="break-words"><h2>Component Example One</h2></div></div></div></section>',
    id: null,
    title: 'Header H2',
  },
  {
    html_code:
      '<section><div class="relative py-4"><div class="mx-auto max-w-7xl lg:px-4 px-2"><div class="break-words" selected=""><h3>Component Example Two</h3></div></div></div></section>',
    id: null,
    title: 'Header H3',
  },
]

// Populating page builder with existing resource content from backend
pageBuilderClass.mountComponentsToDOM(existingResourceFromBackend)
</script>

<template>
  <PageBuilder />
</template>
```

#### How should `existingResourceFromBackend` look?

The example below shows the structure as it would appear when loaded from local storage after components have been added in the builder.

- Example JSON string (from localStorage or backend)
- For existing resources, id will always be present and set by the page builder.

Example `existingResourceFromBackend`:

```json
[
  {
    "html_code": "<section><div class=\"relative py-4\"><div class=\"mx-auto max-w-7xl lg:px-4 px-2\"><div class=\"break-words\"><h2>Component Example One</h2></div></div></div></section>",
    "id": null,
    "title": "Header H2"
  },
  {
    "html_code": "<section><div class=\"relative py-4\"><div class=\"mx-auto max-w-7xl lg:px-4 px-2\"><div class=\"break-words\" selected=\"\"><h3>Component Example Two</h3></div></div></div></section>",
    "id": null,
    "title": "Header H3"
  }
]
```

### Automatic Draft Recovery for Updates

When you set `formType: 'update'` in your config, the Page Builder will automatically check for any unsaved draft in local storage for that resource.  
If a draft is found, the user will be prompted to either continue where they left off or use the version currently loaded from your backend.

- `formName` (recommended): Specify the resource type (e.g., `"article"`, `"jobPost"`, `"store"`, etc.) in the `updateOrCreate` config. This is especially useful if your platform supports multiple resource types. By providing a unique name, the Page Builder can correctly manage layouts and local storage for each resource type, allowing users to continue where they left off for different resources.
  - Pass a `userForPageBuilder` object in your config to display or use the logged-in user's information within the builder (e.g., name and user image).
  - No extra setup is required—just set `formType: 'update'` and the feature is enabled by default.

```vue
<script setup>
import {
  PageBuilder,
  PageBuilderClass,
  sharedPageBuilderStore,
} from '@myissue/vue-website-page-builder'
import '@myissue/vue-website-page-builder/style.css'

const pageBuilderStateStore = sharedPageBuilderStore

const configPageBuilder = {
  updateOrCreate: {
    formType: 'update',
    formName: 'article',
  },
}

const pageBuilderClass = new PageBuilderClass(pageBuilderStateStore)

// Initializing Page Builder with essential configuration
pageBuilderClass.start(configPageBuilder)
</script>

<template>
  <PageBuilder />
</template>
```

### Custom Components

Want to add your own media library or Create custom components that can be injected into the page builder:

📚 **[Custom Components Setup Guide](./CUSTOM_COMPONENTS_SETUP.md)** - Learn how to create and integrate your own components

Example integration:

```javascript
<script setup>
import { PageBuilder } from '@myissue/vue-website-page-builder'
import YourMediaLibraryComponent from './ComponentsPageBuilder/YourMediaLibraryComponent.vue'
import YourCustomBuilderComponents from './ComponentsPageBuilder/YourCustomBuilderComponents.vue'
</script>

<template>
  <PageBuilder :CustomMediaLibraryComponent="YourMediaLibraryComponent" :CustomBuilderComponents="YourCustomBuilderComponents" />
</template>
```

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
