import "./assets/main.css"

import { createApp } from "vue"
import { createPinia } from "pinia"
import "@mdi/font/css/materialdesignicons.css"

import "materialize-css/dist/css/materialize.min.css"
import "material-design-icons/iconfont/material-icons.css"

import App from "./App.vue"
import router from "./router"
import axios from "axios"
import { useSnackbarStore } from "@/stores/SnackbarStore.ts"

const app = createApp(App)

app.use(createPinia())
//app.use(createVuetify({ components, directives, theme: { defaultTheme: "light" } }))
app.use(router)

const snackbar = useSnackbarStore()

let xsrfToken: string | null = null

//const port = 8080
axios.defaults.baseURL = "http://10.2.24.50:10001" //"http://localhost:" + port
axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true
axios.defaults.xsrfCookieName = "XSRF-TOKEN"
axios.defaults.xsrfHeaderName = "X-XSRF-TOKEN"
axios.interceptors.request.use((request) => {
  if (xsrfToken != null) {
    request.headers.set("X-XSRF-TOKEN", xsrfToken)
  }
  return request
})
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

type XSRF = {
  parameterName: string
  token: string
  headerName: string
}

axios.get<XSRF>("/auth/csrf-token").then((response) => {
  if (response.status == 200) {
    xsrfToken = response.data.token
  }
})

app.mount("#app")
