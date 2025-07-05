import './css/dev-global.css'
import './css/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { pageBuilder } from './plugin'

const app = createApp(App)

app.use(createPinia())
app.use(pageBuilder)

app.mount('#app')
