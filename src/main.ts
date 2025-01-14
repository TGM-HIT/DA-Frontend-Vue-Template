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

const port = 8080
axios.defaults.baseURL = "http://localhost:" + port
axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true
axios.defaults.xsrfCookieName = "XSRF-TOKEN"
axios.defaults.xsrfHeaderName = "X-XSRF-TOKEN"
axios.interceptors.response.use(null, (error) => {
  switch (error.response.status) {
    case 400:
      snackbar.push(error.response.data)
      break
    case 401:
      snackbar.push("Sie müssen sich einloggen, um diese Seite anzuzeigen.")
      router.push("/login")
      break
    case 403:
      snackbar.push("Sie haben nicht die notwendigen Berechtigungen, um diese Seite aufzurufen.")
      break
    default:
      console.log("axios.interceptors.response error", error)
      break
  }
  return Promise.reject(error)
})

app.mount("#app")
