import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import './assets/base.css'
import './assets/main.css'

import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()
app.use(createPinia())
pinia.use(piniaPluginPersistedstate)
app.use(pinia)

app.use(router)
app.mount('#app')
