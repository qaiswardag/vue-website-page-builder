import './css/dev-global.css'
import './css/app.css'
import { initPageBuilder } from './composables/builderInstance'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import { setI18nInstance } from './i18n'

// Function to load all locale messages from JSON files
async function loadLocaleMessages() {
  const locales = import.meta.glob('./locales/*.json')
  const messages: Record<string, any> = {}
  for (const path in locales) {
    const matched = path.match(/([A-Za-z0-9-_]+)\.json$/i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      const module: any = await locales[path]()
      messages[locale] = module.default
    }
  }
  return messages
}

async function initApp() {
  const messages = await loadLocaleMessages()

  const i18n = createI18n({
    legacy: false, // set `false`, to use Composition API
    locale: 'en', // set locale
    fallbackLocale: 'en', // set fallback locale
    messages, // set locale messages
  })

  // Set the i18n instance in the i18n.ts module for global access
  setI18nInstance(i18n)

  initPageBuilder()

  const app = createApp(App)

  app.use(createPinia())
  app.use(i18n)

  app.mount('#app')
}

initApp()
