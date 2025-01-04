import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

import App from './App.vue'
import router from './router'
import axios from 'axios'

const app = createApp(App)

app.use(createPinia())
app.use(createVuetify({ components, directives, theme: { defaultTheme: 'light' } }))
app.use(router)

const port = 8081
axios.defaults.baseURL = 'http://localhost:' + port
axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true
axios.defaults.xsrfCookieName = 'XSRF-TOKEN'
axios.defaults.xsrfHeaderName = 'X-XSRF-TOKEN'
axios.interceptors.request.use((request) => {
  console.log('axios.interceptors.request', request)
  return request
})
axios.interceptors.response.use(null, (error) => {
  console.log('axios.interceptors.response error', error)
  if (error.response.status == 401) {
    router.push('/login')
  }
  return error
})

app.mount('#app')
