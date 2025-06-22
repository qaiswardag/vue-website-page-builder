import './css/dev-global.css'
import './css/app.css'
import { createPageBuilder } from './composables/builderInstance'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

createPageBuilder()

const app = createApp(App)

app.use(createPinia())

app.mount('#app')
