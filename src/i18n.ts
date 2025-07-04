import type { I18n } from 'vue-i18n'

let i18nInstance: I18n | null = null

export function setI18nInstance(instance: I18n) {
  i18nInstance = instance
}

export function getI18nInstance(): I18n {
  if (!i18nInstance) {
    throw new Error('i18n instance not set. Ensure initApp() in main.ts has been called.')
  }
  return i18nInstance
}
