import "./assets/main.css"

import { createApp } from "vue"
import { createPinia } from "pinia"
import { createVuetify } from "vuetify"
import * as components from "vuetify/components"
import * as directives from "vuetify/directives"
import "vuetify/styles"
import "@mdi/font/css/materialdesignicons.css"

import App from "./App.vue"
import router from "./router"
import axios from "axios"
import { useSnackbarStore } from "@/stores/SnackbarStore.ts"

const app = createApp(App)

app.use(createPinia())
app.use(createVuetify({ components, directives, theme: { defaultTheme: "light" } }))
app.use(router)

const snackbar = useSnackbarStore()

const port = 8081
axios.defaults.baseURL = "http://localhost:" + port
axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true
axios.defaults.xsrfCookieName = "XSRF-TOKEN"
axios.defaults.xsrfHeaderName = "X-XSRF-TOKEN"
axios.interceptors.request.use((request) => {
  console.log("axios.interceptors.request", request)
  return request
})
axios.interceptors.response.use(null, (error) => {
  console.log("axios.interceptors.response error", error)
  if (error.response.status == 401) {
    snackbar.push("Sie müssen sich einloggen, um diese Seite anzuzeigen.")
    router.push("/login")
  }
  if (error.response.status == 403) {
    snackbar.push("Sie haben nicht die notwendigen Berechtigungen, um diese Seite aufzurufen.")
  }
  return Promise.reject(error)
})

app.mount("#app")
