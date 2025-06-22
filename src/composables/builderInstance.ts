// builderInstance.ts
import { PageBuilderService } from '../composables/PageBuilderService'
import { sharedPageBuilderStore } from '../stores/shared-store'

// Singleton instance
let instance: PageBuilderService | null = null

// Used to create and store the single instance
export function initPageBuilder(): PageBuilderService {
  if (!instance) {
    const pageBuilderStateStore = sharedPageBuilderStore
    instance = new PageBuilderService(pageBuilderStateStore)
  }
  return instance
}

// Used to access the existing instance anywhere else
export function getPageBuilder(): PageBuilderService {
  if (!instance) {
    throw new Error(
      'PageBuilderService has not been created. Please call createPageBuilder() first in your App.vue or setup file.',
    )
  }
  return instance
}
