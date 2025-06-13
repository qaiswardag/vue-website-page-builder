# Custom Components Setup Guide

This guide shows you how to create custom components that can be injected into the Vue Website Page Builder.

## Quick Setup

Create a `ComponentsPageBuilder` folder in your project two customizable components:

```
your-project/
├── src/
│   └── ComponentsPageBuilder/
│       ├── YourMediaLibraryComponent.vue
│       ├── YourCustomBuilderComponents.vue
│       └── README.md (optional)
```

## Component Templates

---

### 1. Custom Media Library Component

By default, the Page Builder does not include a built-in media library.

This is intentional — without a custom media library, layout components that rely on images (like Image Blocks, Hero Sections, etc.) are disabled by default. Only helper components such as containers, headings, text, and buttons are available in this state.

To enable image-related components in the builder, you must inject your own media library by passing it to the PageBuilder via the :CustomMediaLibraryComponent prop:

//TODO: How to: Close the Modal, inject selected Image into the page builder

```vue
<script setup>
import {
  PageBuilder,
  PageBuilderClass,
  sharedPageBuilderStore,
} from '@myissue/vue-website-page-builder'
import '@myissue/vue-website-page-builder/style.css'
import YourMediaLibraryComponent from './ComponentsPageBuilder/YourMediaLibraryComponent.vue'

// Use sharedPageBuilderStore for shared state between PageBuilderClass and PageBuilder component and how components object should look like
const pageBuilderStateStore = sharedPageBuilderStore
const pageBuilderClass = new PageBuilderClass(pageBuilderStateStore)

// Run page builder method
</script>

<template>
  <div>
    <PageBuilder :CustomMediaLibraryComponent="YourMediaLibraryComponent" />
  </div>
</template>
```

---

### 2. Custom Components

The Page Builder includes a growing collection of built-in components available out of the box, including layout components and helper components. These default components are continuously improved and expanded over time.

If you'd like to use your own components—whether custom-designed or tailored to specific needs—you can inject them directly into the builder.

Here’s how to do it:

//TODO: How to: Close the Modal, Inject Selected Components into the page builder

```vue
<script setup>
import {
  PageBuilder,
  PageBuilderClass,
  sharedPageBuilderStore,
} from '@myissue/vue-website-page-builder'
import '@myissue/vue-website-page-builder/style.css'
import YourCustomBuilderComponents from './ComponentsPageBuilder/YourCustomBuilderComponents.vue'

// Use sharedPageBuilderStore for shared state between PageBuilderClass and PageBuilder component and how components object should look like
const pageBuilderStateStore = sharedPageBuilderStore
const pageBuilderClass = new PageBuilderClass(pageBuilderStateStore)

// Run page builder method
</script>

<template>
  <div>
    <PageBuilder :CustomBuilderComponents="YourCustomBuilderComponents" />
  </div>
</template>
```

## Benefits of This Approach

✅ **Full Control**: You decide where and when to create components  
✅ **Flexible**: Adapt to any project structure  
✅ **Secure**: No postinstall scripts to worry about  
✅ **Simple**: Clean package with clear documentation  
✅ **Optional**: Only create components you actually need
