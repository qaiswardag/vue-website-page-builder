# Custom Components Setup Guide

This guide shows you how to create custom components that can be injected into the Vue Website Page Builder.

## Quick Setup

Create a `ComponentsPageBuilder` folder in your project root with two customizable components:

```
your-project/
├── ComponentsPageBuilder/
│   ├── MediaLibraryComponent.vue
│   ├── SearchComponent.vue
│   └── README.md (optional)
├── app/
├── resources/
└── ... (your other project files)
```

## Component Templates

### 1. MediaLibraryComponent.vue

Create `ComponentsPageBuilder/MediaLibraryComponent.vue`:

```vue
<template>
  <div class="media-library-container">
    <h2 class="text-xl font-semibold text-gray-800 mb-4">Media Library</h2>

    <!-- Replace this with your custom media library -->
    <div class="custom-media-implementation">
      <p class="text-gray-600">Your custom media library goes here</p>
      <!-- Examples:
      - File upload interface
      - Media gallery grid
      - Search and filter controls
      - Integration with AWS S3, Cloudinary, etc.
      -->
    </div>
  </div>
</template>

<script setup>
// Your custom props
defineProps({
  // selectedMedia: Object,
  // onMediaSelect: Function,
  // uploadEndpoint: String,
  // mediaItems: Array
})

// Your custom events
defineEmits([
  // 'media-selected',
  // 'media-uploaded',
  // 'media-deleted'
])

// Add your custom logic here
</script>

<style scoped>
.media-library-container {
  @apply w-full;
}
</style>
```

### 2. SearchComponent.vue

Create `ComponentsPageBuilder/SearchComponent.vue`:

```vue
<template>
  <div class="search-components-container">
    <h2 class="text-xl font-semibold text-gray-800 mb-4">Search Components</h2>

    <!-- Replace this with your custom search -->
    <div class="custom-search-implementation">
      <p class="text-gray-600">Your custom search functionality goes here</p>
      <!-- Examples:
      - Search input and filters
      - Component results grid
      - Pagination controls
      - Integration with Elasticsearch, Algolia, etc.
      -->
    </div>
  </div>
</template>

<script setup>
// Your custom props
defineProps({
  // searchQuery: String,
  // searchResults: Array,
  // totalResults: Number,
  // currentPage: Number,
  // itemsPerPage: Number
})

// Your custom events
defineEmits([
  // 'search',
  // 'page-changed',
  // 'filter-applied',
  // 'component-selected'
])

// Add your custom logic here
</script>

<style scoped>
.search-components-container {
  @apply w-full;
}
</style>
```

## Integration with Page Builder

Once you've created your custom components, inject them into the page builder:

```vue
<template>
  <div>
    <VueWebsitePageBuilder
      :MediaLibraryComponent="MediaLibraryComponent"
      :SearchComponent="SearchComponent"
      v-model="pageData"
    />
  </div>
</template>

<script setup>
import { VueWebsitePageBuilder } from '@myissue/vue-website-page-builder'
import MediaLibraryComponent from './ComponentsPageBuilder/MediaLibraryComponent.vue'
import SearchComponent from './ComponentsPageBuilder/SearchComponent.vue'

const pageData = ref({})
</script>
```

## Customization Examples

### Media Library Examples

- **Cloudinary Integration**: Connect to Cloudinary API for image management
- **AWS S3**: Direct upload to S3 buckets
- **Local Storage**: File upload to your Laravel storage
- **Unsplash**: Integration with Unsplash API for stock photos

### Search Examples

- **Component Library**: Search through your component library
- **Elasticsearch**: Full-text search with advanced filters
- **Database Search**: Search your database for dynamic content
- **API Integration**: Connect to external search services

## Benefits of This Approach

✅ **Full Control**: You decide where and when to create components  
✅ **Flexible**: Adapt to any project structure  
✅ **Secure**: No postinstall scripts to worry about  
✅ **Simple**: Clean package with clear documentation  
✅ **Optional**: Only create components you actually need

## Need Help?

Check out the [examples repository](https://github.com/qaiswardag/vue-website-page-builder-examples) for complete implementation examples.
