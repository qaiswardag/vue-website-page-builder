# Custom Components Setup Guide

This guide shows you how to create custom components that can be injected into the Vue Website Page Builder.

## Quick Setup

Create a `ComponentsPageBuilder` folder in your project two customizable components:

```
your-project/
├── src/
│   └── ComponentsPageBuilder/
│       ├── YourMediaLibraryComponent.vue
│       ├── YourSearchComponent.vue
│       └── README.md (optional)
```

## Component Templates

---

### 1. Custom Media Library Component

Once you've created your custom components, inject them into the page builder:

//TODO: Write how to: Close the Modal, Inject Selected Image or Component into the page builder

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

Once you've created your custom components, inject them into the page builder:

//TODO: Write how to: Close the Modal, Inject Selected Image or Component into the page builder

```vue
<script setup>
import {
  PageBuilder,
  PageBuilderClass,
  sharedPageBuilderStore,
} from '@myissue/vue-website-page-builder'
import '@myissue/vue-website-page-builder/style.css'
import YourSearchComponent from './ComponentsPageBuilder/YourSearchComponent.vue'

// Use sharedPageBuilderStore for shared state between PageBuilderClass and PageBuilder component and how components object should look like
const pageBuilderStateStore = sharedPageBuilderStore
const pageBuilderClass = new PageBuilderClass(pageBuilderStateStore)

// Run page builder method
</script>

<template>
  <div>
    <PageBuilder :CustomSearchComponent="YourSearchComponent" />
  </div>
</template>
```

## Benefits of This Approach

✅ **Full Control**: You decide where and when to create components  
✅ **Flexible**: Adapt to any project structure  
✅ **Secure**: No postinstall scripts to worry about  
✅ **Simple**: Clean package with clear documentation  
✅ **Optional**: Only create components you actually need
