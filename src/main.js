import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import './assets/main.css'
import './assets/base.css'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
const app = createApp(App)
const pinia = createPinia()
app.use(createPinia())
pinia.use(piniaPluginPersistedstate) // 여기 추가
app.use(pinia)
app.use(router)
app.mount('#app')
