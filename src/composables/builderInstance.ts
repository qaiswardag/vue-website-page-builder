// builderInstance.ts
import { PageBuilderService } from '../services/PageBuilderService'

// Singleton instance
let instance: PageBuilderService | null = null

// Used by the plugin to set the instance
export function setBuilderInstance(newInstance: PageBuilderService): void {
  if (!instance) {
    instance = newInstance
  }
}

// Used to access the existing instance anywhere else
export function getPageBuilder(): PageBuilderService {
  if (!instance) {
    throw new Error(
      'PageBuilder has not been initialized. Please call app.use(pageBuilder) in your main application file.',
    )
  }
  return instance
}
