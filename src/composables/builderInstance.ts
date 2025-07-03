// builderInstance.ts
import { PageBuilderService } from '../services/PageBuilderService'
import type { I18n } from 'vue-i18n'
import { sharedPageBuilderStore } from '../stores/shared-store'

// Singleton instance
let instance: PageBuilderService | null = null

// Used to create and store the single instance
export function initPageBuilder(i18n: I18n): PageBuilderService {
  if (!instance) {
    const pageBuilderStateStore = sharedPageBuilderStore
    instance = new PageBuilderService(pageBuilderStateStore, i18n)
  }
  return instance
}

// Used to access the existing instance anywhere else
export function getPageBuilder(): PageBuilderService {
  if (!instance) {
    throw new Error(
      'PageBuilderService has not been created. Please call initPageBuilder() first in your App.vue or setup file.',
    )
  }
  return instance
}
