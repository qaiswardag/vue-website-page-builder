// Main Page Builder Components
export { default as PageBuilder } from './PageBuilder/PageBuilder.vue'
export { default as Preview } from './PageBuilder/Preview.vue'

// Export stores (consolidated into single store)
export { usePageBuilderStateStore } from './stores/page-builder-state'

// Export composables
export { usePageBuilderModal } from './composables/usePageBuilderModal'

// Export types
export type { PageBuilderUser, ComponentObject, ImageObject, PageBuilderConfig } from './types'

// Export Pinia for convenience (same version as package uses)
export { createPinia } from 'pinia'

// Export CSS (users will need to import this separately)
import './css/app.css'

// Export shared store instances for external access
export { sharedPageBuilderPinia, sharedPageBuilderStore } from './stores/shared-store'

// export { PageBuilderService } from './composables/PageBuilderService.ts'
