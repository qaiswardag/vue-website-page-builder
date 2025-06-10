# Custom Components Setup Guide

This guide shows you how to create custom components that can be injected into the Vue Website Page Builder.

## Quick Setup

Create a `ComponentsPageBuilder` folder in your project two customizable components:

```
your-project/
├── src/
│   └── ComponentsPageBuilder/
│       ├── MediaLibraryComponent.vue
│       ├── SearchComponent.vue
│       └── README.md (optional)
```

## Component Templates

### 1. MediaLibraryComponent.vue

Once you've created your custom components, inject them into the page builder:

```vue
<script setup>
import { PageBuilder } from '@myissue/vue-website-page-builder'
import MyMediaLibraryComponent from './ComponentsPageBuilder/MyMediaLibraryComponent.vue'
import MySearchComponent from './ComponentsPageBuilder/MySearchComponent.vue'
</script>

<template>
  <div>
    <PageBuilder
      :CustomMediaLibraryComponent="YourMediaLibraryComponent"
      :CustomSearchComponent="YourSearchComponent"
    />
  </div>
</template>
```

## Benefits of This Approach

✅ **Full Control**: You decide where and when to create components  
✅ **Flexible**: Adapt to any project structure  
✅ **Secure**: No postinstall scripts to worry about  
✅ **Simple**: Clean package with clear documentation  
✅ **Optional**: Only create components you actually need
