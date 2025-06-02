// Main Page Builder Components
export { default as PageBuilder } from './PageBuilder/PageBuilder.vue'
export { default as Preview } from './PageBuilder/Preview.vue'

// Export stores
export { usePageBuilderStateStore } from './stores/page-builder-state'
export { useMediaLibraryStore } from './stores/media-library'

// Export PageBuilder composable/class
export { default as PageBuilderComposable } from './composables/PageBuilder'

// Export CSS (users will need to import this separately)
import './css/app.css'
