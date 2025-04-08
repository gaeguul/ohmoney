import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import './assets/main.css'
import './assets/base.css'

import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.mount('#app')
