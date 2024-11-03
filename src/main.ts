import { createHead } from '@unhead/vue'
import routes from '~pages'
import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import '@unocss/reset/tailwind-compat.css'
import './assets/styles/main.css'
import 'uno.css'

const head = createHead()
const app = createApp(App)
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
})
app.use(router).use(head)
app.mount('#app')
