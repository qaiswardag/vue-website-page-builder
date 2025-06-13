import type { PageBuilderConfig } from '../types'
import { sharedPageBuilderStore } from '../stores/shared-store'
import PageBuilderClass from '../composables/PageBuilderClass.ts'
import { isEmptyObject } from './isEmptyObject.ts'

const pageBuilderStateStore = sharedPageBuilderStore

// Initialize PageBuilder with store
const pageBuilderClass = new PageBuilderClass(pageBuilderStateStore)

export const isChildrenEmpty = function (config: PageBuilderConfig) {
  if (
    (!config.updateOrCreate || isEmptyObject(config.updateOrCreate)) &&
    (!config.pageBuilderLogo || isEmptyObject(config.pageBuilderLogo)) &&
    (!config.resourceData || isEmptyObject(config.resourceData)) &&
    (!config.userForPageBuilder || isEmptyObject(config.userForPageBuilder)) &&
    (!config.userSettings || isEmptyObject(config.userSettings))
  ) {
    const editorConfig = {
      updateOrCreate: {
        formType: 'create' as 'create',
        formName: 'post',
      },
      userSettings: {
        theme: 'light' as 'light',
        language: 'en',
        autoSave: false,
      },
      pageBuilderLogo: null,
      resourceData: null,
      userForPageBuilder: null,
    }
    pageBuilderClass.setConfigPageBuilder(editorConfig)
    return true
  } else {
    return false
  }
}
export const onlyUserIsValid = function (config: PageBuilderConfig) {
  if (
    config.userForPageBuilder &&
    typeof config.userForPageBuilder.name === 'string' &&
    config.userForPageBuilder.name.length > 0
  ) {
    if (!config.userSettings || (config.userSettings && isEmptyObject(config.userSettings))) {
      if (
        !config.updateOrCreate ||
        (config.updateOrCreate && typeof config.updateOrCreate.formType !== 'string') ||
        (config.updateOrCreate && isEmptyObject(config.updateOrCreate))
      ) {
        if (
          !config.pageBuilderLogo ||
          (config.pageBuilderLogo &&
            config.pageBuilderLogo.src &&
            typeof config.pageBuilderLogo.src === 'string' &&
            config.pageBuilderLogo.src.length === 0) ||
          (config.pageBuilderLogo && isEmptyObject(config.pageBuilderLogo))
        ) {
          if (!config.resourceData || (config.resourceData && isEmptyObject(config.resourceData))) {
            const editorConfig = {
              userForPageBuilder: config.userForPageBuilder,
              updateOrCreate: {
                formType: 'create' as 'create',
                formName: 'post',
              },
              userSettings: {
                theme: 'light' as 'light',
                language: 'en',
                autoSave: false,
              },
            }

            pageBuilderClass.setConfigPageBuilder(editorConfig)
            return true
          } else {
            return false
          }
        }
      }
    }
  }
}

export const onlyUpdateOrCreateIsValid = function (config: PageBuilderConfig) {
  if (
    !config.updateOrCreate ||
    (config.updateOrCreate && typeof config.updateOrCreate.formType !== 'string') ||
    (config.updateOrCreate && isEmptyObject(config.updateOrCreate))
  ) {
    if (
      !config.userForPageBuilder ||
      (config.userForPageBuilder && typeof config.userForPageBuilder.name !== 'string') ||
      (typeof config.userForPageBuilder.name === 'string' &&
        config.userForPageBuilder.name.length < 1) ||
      (config.userForPageBuilder && isEmptyObject(config.userForPageBuilder))
    ) {
      if (
        !config.pageBuilderLogo ||
        (config.pageBuilderLogo &&
          config.pageBuilderLogo.src &&
          typeof config.pageBuilderLogo.src === 'string' &&
          config.pageBuilderLogo.src.length === 0) ||
        (config.pageBuilderLogo && isEmptyObject(config.pageBuilderLogo))
      ) {
        if (!config.userSettings || (config.userSettings && isEmptyObject(config.userSettings))) {
          if (!config.resourceData || (config.resourceData && isEmptyObject(config.resourceData))) {
            const editorConfig = {
              updateOrCreate: config.updateOrCreate,
              userSettings: {
                theme: 'light' as 'light',
                language: 'en',
                autoSave: false,
              },
            }
            pageBuilderClass.setConfigPageBuilder(editorConfig)
            return true
          } else {
            return false
          }
        }
      }
    }
  }
}

export const onlyPageBuilderLogoIsValid = function (config: PageBuilderConfig) {
  if (
    config.updateOrCreate &&
    typeof config.updateOrCreate.formType === 'string' &&
    (config.updateOrCreate.formType === 'create' || config.updateOrCreate.formType === 'update')
  ) {
    if (
      !config.userForPageBuilder ||
      (config.userForPageBuilder && typeof config.userForPageBuilder.name !== 'string') ||
      (typeof config.userForPageBuilder.name === 'string' &&
        config.userForPageBuilder.name.length < 1) ||
      (config.userForPageBuilder && isEmptyObject(config.userForPageBuilder))
    ) {
      if (
        !config.pageBuilderLogo ||
        (config.pageBuilderLogo &&
          config.pageBuilderLogo.src &&
          typeof config.pageBuilderLogo.src === 'string' &&
          config.pageBuilderLogo.src.length === 0) ||
        (config.pageBuilderLogo && isEmptyObject(config.pageBuilderLogo))
      ) {
        if (!config.userSettings || (config.userSettings && isEmptyObject(config.userSettings))) {
          if (!config.resourceData || (config.resourceData && isEmptyObject(config.resourceData))) {
            const editorConfig = {
              updateOrCreate: {
                formType: 'create' as 'create',
                formName: 'post',
              },
              userSettings: {
                theme: 'light' as 'light',
                language: 'en',
                autoSave: false,
              },
              pageBuilderLogo: config.pageBuilderLogo,
              resourceData: null,
              userForPageBuilder: null,
            }
            pageBuilderClass.setConfigPageBuilder(editorConfig)
            return true
          } else {
            return false
          }
        }
      }
    }
  }
}

export const onlyResourceDataIsValid = function (config: PageBuilderConfig) {
  if (
    config.resourceData &&
    typeof config.resourceData.title === 'string' &&
    config.resourceData.title.length > 0
  ) {
    if (
      !config.updateOrCreate ||
      (config.updateOrCreate && typeof config.updateOrCreate.formType !== 'string') ||
      (config.updateOrCreate && isEmptyObject(config.updateOrCreate))
    ) {
      if (
        !config.userForPageBuilder ||
        (config.userForPageBuilder && typeof config.userForPageBuilder.name !== 'string') ||
        (typeof config.userForPageBuilder.name === 'string' &&
          config.userForPageBuilder.name.length < 1) ||
        (config.userForPageBuilder && isEmptyObject(config.userForPageBuilder))
      ) {
        if (
          !config.pageBuilderLogo ||
          (config.pageBuilderLogo &&
            config.pageBuilderLogo.src &&
            typeof config.pageBuilderLogo.src === 'string' &&
            config.pageBuilderLogo.src.length === 0) ||
          (config.pageBuilderLogo && isEmptyObject(config.pageBuilderLogo))
        ) {
          if (!config.userSettings || (config.userSettings && isEmptyObject(config.userSettings))) {
            const editorConfig = {
              updateOrCreate: {
                formType: 'create' as 'create',
                formName: 'post',
              },
              userSettings: {
                theme: 'light' as 'light',
                language: 'en',
                autoSave: false,
              },
              pageBuilderLogo: config.pageBuilderLogo,
              resourceData: null,
              userForPageBuilder: null,
            }
            pageBuilderClass.setConfigPageBuilder(editorConfig)
            return true
          } else {
            return false
          }
        }
      }
    }
  }
}

export const onlyUserSettingsIsValid = function (config: PageBuilderConfig) {
  if (
    config.userSettings &&
    typeof config.userSettings.theme === 'string' &&
    config.userSettings.theme.length > 0
  ) {
    if (
      config.resourceData &&
      typeof config.resourceData.title === 'string' &&
      config.resourceData.title.length > 0
    ) {
      if (
        !config.updateOrCreate ||
        (config.updateOrCreate && typeof config.updateOrCreate.formType !== 'string') ||
        (config.updateOrCreate && isEmptyObject(config.updateOrCreate))
      ) {
        if (
          !config.userForPageBuilder ||
          (config.userForPageBuilder && typeof config.userForPageBuilder.name !== 'string') ||
          (typeof config.userForPageBuilder.name === 'string' &&
            config.userForPageBuilder.name.length < 1) ||
          (config.userForPageBuilder && isEmptyObject(config.userForPageBuilder))
        ) {
          if (
            !config.pageBuilderLogo ||
            (config.pageBuilderLogo &&
              config.pageBuilderLogo.src &&
              typeof config.pageBuilderLogo.src === 'string' &&
              config.pageBuilderLogo.src.length === 0) ||
            (config.pageBuilderLogo && isEmptyObject(config.pageBuilderLogo))
          ) {
            const editorConfig = {
              updateOrCreate: {
                formType: 'create' as 'create',
                formName: 'post',
              },
              userSettings: {
                theme: 'light' as 'light',
                language: 'en',
                autoSave: false,
              },
              pageBuilderLogo: config.pageBuilderLogo,
              resourceData: null,
              userForPageBuilder: null,
            }
            pageBuilderClass.setConfigPageBuilder(editorConfig)
            return true
          } else {
            return false
          }
        }
      }
    }
  }
}

export const updateOrCreateIsFalsy = function (config: PageBuilderConfig) {
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
      userSettings: {
        theme: 'light' as 'light',
        language: 'en',
        autoSave: false,
      },
    }

    pageBuilderClass.setConfigPageBuilder(updatedConfig)
    return true
  }

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
        formType: 'create' as 'create',
        formName: 'post',
      },
      userSettings: {
        theme: 'light' as 'light',
        language: 'en',
        autoSave: false,
      },
    }

    pageBuilderClass.setConfigPageBuilder(updatedConfig)
    return true
  }
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
        formType: 'create' as 'create',
        formName: 'post',
      },
      userSettings: {
        theme: 'light' as 'light',
        language: 'en',
        autoSave: false,
      },
    }

    pageBuilderClass.setConfigPageBuilder(updatedConfig)
    return true
  }
  if (
    config.updateOrCreate &&
    typeof config.updateOrCreate.formType === 'string' &&
    (config.updateOrCreate.formType === 'create' || config.updateOrCreate.formType === 'update') &&
    typeof config.updateOrCreate.formName === 'string' &&
    config.updateOrCreate.formName.length > 0
  ) {
    const updatedConfig = {
      ...config,
      updateOrCreate: {
        formType: 'create' as 'create',
        formName: config.updateOrCreate.formName,
      },
      userSettings: {
        theme: 'light' as 'light',
        language: 'en',
        autoSave: false,
      },
    }

    pageBuilderClass.setConfigPageBuilder(updatedConfig)
    return true
  }
}
