// Main Page Builder Components
export { default as PageBuilder } from './PageBuilder/PageBuilder.vue'
export { default as Preview } from './PageBuilder/Preview.vue'

// Export stores (consolidated into single store)
export { usePageBuilderStateStore } from './stores/page-builder-state'

export { default as PageBuilderClass } from './composables/PageBuilderClass'

// Export composables
export { usePageBuilderModal } from './composables/usePageBuilderModal'

// Export types
export type { PageBuilderUser, ComponentObject, ImageObject } from './types'

// Export Pinia for convenience (same version as package uses)
export { createPinia } from 'pinia'

// Export CSS (users will need to import this separately)
import './css/app.css'
