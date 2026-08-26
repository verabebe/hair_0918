import { createApp } from 'vue'
import App from './App.vue'
import "./assets/main.css"
import "./assets/style.css"

import router from "./router"

import { createPinia } from 'pinia'

// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'
// Bootstrap Javascript
import 'bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css'

const app =createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)
app.mount('#app')

// createApp(App).use(router).mount('#app')