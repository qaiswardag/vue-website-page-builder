import './css/dev-global.css'
import './css/app.css'
import { initPageBuilder } from './composables/builderInstance'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { setupI18n } from './i18n'

async function bootstrap() {
  const i18n = await setupI18n()
  initPageBuilder(i18n)

  const app = createApp(App)
  app.use(createPinia())
  app.use(i18n)
  app.mount('#app')
}

bootstrap()
