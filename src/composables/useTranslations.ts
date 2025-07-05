import { ref, readonly } from 'vue'
import type { Ref } from 'vue'

const translations: Ref<Record<string, string>> = ref({})

async function loadTranslations(language: string) {
  try {
    const localeModule = await import(`../locales/${language}.json`)
    translations.value = localeModule.default
  } catch (error) {
    console.error(`Could not load translations for language: ${language}`, error)
    if (language !== 'en') {
      await loadTranslations('en')
    }
  }
}

export function useTranslations() {
  function t(key: string): string {
    return translations.value[key] || key
  }

  return {
    t,
    loadTranslations,
    currentTranslations: readonly(translations)
  }
}
