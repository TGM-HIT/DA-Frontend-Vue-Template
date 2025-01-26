import { ref } from "vue"
import { defineStore } from "pinia"
import axios, { type AxiosResponse } from "axios"
import type { LoginRequest } from "@/types/LoginRequest.ts"
import type { Authentication } from "@/types/Authentication.ts"
import { Roles } from "@/enum/Roles.ts"
import type { RouteRecord } from "vue-router"
import { useSnackbarStore } from "@/stores/SnackbarStore.ts"
import router from "@/router"

export const useAuthenticationStore = defineStore("authentication", () => {
  const loggedIn = ref(false)
  const role = ref<Roles | null>(null)

  const snackbarStore = useSnackbarStore()

  //const doubleCount = computed(() => count.value * 2)
  async function login(loginRequest: LoginRequest): Promise<boolean> {
    const response = await axios.post<Authentication, AxiosResponse<Authentication>, LoginRequest>(
      "/auth/login",
      loginRequest,
    )
    if (response.status == 200) {
      setAuthentication(response.data)
      return true
    }
    return false
  }

  async function logout(): Promise<boolean> {
    const response = await axios.get<string>("/auth/logout")
    if (response.status == 200) {
      loggedIn.value = false
      role.value = null
      snackbarStore.push("Sie wurden erfolgreich ausgeloggt!")
      await router.push("/")
      return true
    }
    return false
  }

  function setAuthentication(data: Authentication) {
    const authorities = data.authorities.map((value) => value.authority)
    if (authorities.includes("ROLE_TEACHER")) {
      loggedIn.value = true
      role.value = Roles.TEACHER
    } else if (authorities.includes("ROLE_STUDENT")) {
      loggedIn.value = true
      role.value = Roles.STUDENT
    } else {
      loggedIn.value = false
      role.value = null
    }
  }

  function isRouteVisible(route: RouteRecord): boolean {
    if (
      route.meta?.role != undefined &&
      Array.isArray(route.meta.role) &&
      route.meta.role.length > 0 &&
      (!loggedIn.value || !route.meta.role.includes(role.value))
    ) {
      return false
    } else {
      return true
    }
  }

  async function checkLoggedIn() {
    axios
      .get<Authentication>("/")
      .then((response) => {
        if (response.status == 200) {
          setAuthentication(response.data)
        }
      })
      .catch((err) => {
        console.log("checkLoggedIn returned with error ", err)
      })
  }

  void checkLoggedIn()

  return { loggedIn, login, logout, role, isRouteVisible }
})
