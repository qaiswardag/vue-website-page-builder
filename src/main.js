import './css/app.css';
// remove store / vuex from here
import store from './store/index';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

const app = createApp(App);

// remove store / vuex from here
app.use(store);
app.use(createPinia());

app.mount('#app');
