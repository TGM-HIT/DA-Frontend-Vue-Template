import { ref } from "vue"
import { defineStore } from "pinia"
import axios, { type AxiosResponse } from "axios"
import type { LoginRequest } from "@/types/LoginRequest.ts"
import type { Authentication } from "@/types/Authentication.ts"
import { Roles } from "@/enum/Roles.ts"
import type { RouteLocationResolvedGeneric } from "vue-router"
import { useSnackbarStore } from "@/stores/SnackbarStore.ts"
import router from "@/router"

export const useAuthenticationStore = defineStore("authentication", () => {
  const loaded = ref(false)
  const loggedIn = ref(false)
  const roles = ref<Roles[]>([])

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
    const response = await axios.post<string>("/auth/logout")
    if (response.status == 200) {
      loggedIn.value = false
      roles.value = []
      snackbarStore.push("Sie wurden erfolgreich ausgeloggt!")
      await router.push("/")
      return true
    }
    return false
  }

  function setAuthentication(data: Authentication) {
    if (!data.authenticated) {
      loggedIn.value = false
      roles.value = []
    } else {
      const authorities = data.authorities.map((value) => value.authority)
      const newRoles = []
      if (authorities.includes("ROLE_TEACHER")) {
        newRoles.push(Roles.TEACHER)
      }
      if (authorities.includes("ROLE_STUDENT")) {
        newRoles.push(Roles.STUDENT)
      }
      if (authorities.includes("ROLE_ADMIN")) {
        newRoles.push(Roles.ADMIN)
      }
      loggedIn.value = true
      roles.value = newRoles
    }
    loaded.value = true
  }

  function isRouteVisible(route: RouteLocationResolvedGeneric): boolean {
    if (
      route.meta?.roles != undefined &&
      Array.isArray(route.meta.roles) &&
      route.meta.roles.length > 0 &&
      (!loggedIn.value || !route.meta.roles.some((role) => roles.value.includes(role)))
    ) {
      return false
    } else {
      return true
    }
  }

  async function checkLoggedIn() {
    axios.get<Authentication>("/").then((response) => {
      if (response.status == 200) {
        setAuthentication(response.data)
      }
    })
  }

  void checkLoggedIn()

  return { loaded, loggedIn, login, logout, roles, isRouteVisible }
})
