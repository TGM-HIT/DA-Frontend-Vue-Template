import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios, { type AxiosResponse } from 'axios'
import type { LoginRequest } from '@/types/LoginRequest.ts'
import type { Authentication } from '@/types/Authentication.ts'
import { Roles } from '@/enum/Roles.ts'

export const useAuthenticationStore = defineStore('authentication', () => {
  const loggedIn = ref(false)
  const role = ref<Roles | null>(null)

  //const doubleCount = computed(() => count.value * 2)
  async function login(loginRequest: LoginRequest): Promise<boolean> {
    const response = await axios.post<Authentication, AxiosResponse<Authentication>, LoginRequest>(
      '/auth/login',
      loginRequest,
    )
    if (response.status == 200) {
      setAuthentication(response.data)
      return true
    }
    return false
  }

  async function logout(): Promise<boolean> {
    const response = await axios.get<string>('/auth/logout')
    if (response.status == 200) {
      loggedIn.value = false
      role.value = null
      return true
    }
    return false
  }

  function setAuthentication(data: Authentication) {
    const authorities = data.authorities.map((value) => value.authority)
    console.log(authorities)
    if (authorities.includes('ROLE_LEHRER')) {
      loggedIn.value = true
      role.value = Roles.TEACHER
    } else if (authorities.includes('ROLE_SCHUELER')) {
      loggedIn.value = true
      role.value = Roles.STUDENT
    } else {
      loggedIn.value = false
      role.value = null
    }
  }

  async function checkLoggedIn() {
    axios
      .get<Authentication>('/')
      .then((response) => {
        console.log('checkLoggedIn returned with ok ', response)
        if (response.status == 200) {
          setAuthentication(response.data)
        }
        console.log(response)
      })
      .catch((err) => {
        console.log('checkLoggedIn returned with error ', err)
      })
  }

  void checkLoggedIn()

  return { loggedIn, login, logout }
})
