import type { PageBuilderConfig } from '../types'
import { sharedPageBuilderStore } from '../stores/shared-store'
import PageBuilderClass from '../composables/PageBuilderClass.ts'
import { isEmptyObject } from './isEmptyObject.ts'

const pageBuilderStateStore = sharedPageBuilderStore

// Initialize PageBuilder with store
const pageBuilderClass = new PageBuilderClass(pageBuilderStateStore)

export const updateOrCreateIsFalsy = function (config: PageBuilderConfig) {
  // Case A: updateOrCreate is missing, not an object, has an invalid formType, or is an empty object
  if (
    !config.updateOrCreate ||
    (config.updateOrCreate && typeof config.updateOrCreate.formType !== 'string') ||
    (config.updateOrCreate && isEmptyObject(config.updateOrCreate))
  ) {
    const updatedConfig = {
      ...config,
      updateOrCreate: {
        formType: 'create' as 'create',
        formName: 'post',
      },
    }

    pageBuilderClass.applyPageBuilderConfig(updatedConfig)
    return true
  }

  // Case B: formType exists but is not 'create' or 'update', and formName is missing or invalid
  if (
    config.updateOrCreate &&
    typeof config.updateOrCreate.formType === 'string' &&
    config.updateOrCreate.formType !== 'create' &&
    config.updateOrCreate.formType !== 'update' &&
    typeof config.formName !== 'string'
  ) {
    const updatedConfig = {
      ...config,
      updateOrCreate: {
        formType: 'create',
        formName: 'post',
      },
    } as const

    pageBuilderClass.applyPageBuilderConfig(updatedConfig)
    return true
  }

  // Case C: formType is valid ('create' or 'update'), but formName is missing or an empty string
  if (
    (config.updateOrCreate &&
      typeof config.updateOrCreate.formType === 'string' &&
      (config.updateOrCreate.formType === 'create' ||
        config.updateOrCreate.formType === 'update') &&
      typeof config.updateOrCreate.formName !== 'string') ||
    (typeof config.updateOrCreate.formName === 'string' &&
      config.updateOrCreate.formName.length === 0)
  ) {
    const updatedConfig = {
      ...config,
      updateOrCreate: {
        formType: config.updateOrCreate.formType,
        formName: 'post',
      },
    }

    pageBuilderClass.applyPageBuilderConfig(updatedConfig)
    return true
  }
}
