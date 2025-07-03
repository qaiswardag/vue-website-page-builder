import { createI18n } from 'vue-i18n'

// Function to load all locale messages from JSON files
async function loadLocaleMessages() {
  const locales = import.meta.glob('./locales/*.json')
  const messages: Record<string, object> = {}
  for (const path in locales) {
    const matched = path.match(/([A-Za-z0-9-_]+)\.json$/i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      const module = (await locales[path]()) as { default: object }
      messages[locale] = module.default
    }
  }
  return messages
}

// Use this in main.ts: const i18n = await setupI18n()
export async function setupI18n() {
  const messages = await loadLocaleMessages()
  return createI18n({
    legacy: false, // you must set `false`, to use Composition API
    locale: 'en', // set locale
    fallbackLocale: 'en', // set fallback locale
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    messages: messages as any, // typecast to satisfy vue-i18n
  })
}
