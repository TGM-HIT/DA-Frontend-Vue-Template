import { createRouter, createWebHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"
import LoginView from "@/views/LoginView.vue"
import TeacherView from "@/views/TeacherView.vue"
import LoggedInView from "@/views/LoggedInView.vue"
import { Roles } from "@/enum/Roles.ts"
import { useAuthenticationStore } from "@/stores/AuthenticationStore.ts"
import { useSnackbarStore } from "@/stores/SnackbarStore.ts"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/logged-in",
      name: "logged-in",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: LoggedInView,
      meta: {
        authRequired: true,
      },
    },
    {
      path: "/just-teacher",
      name: "teacher",
      component: TeacherView,
      meta: {
        authRequired: true,
        role: [Roles.TEACHER],
      },
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
  ],
})

router.beforeResolve((to, from, next) => {
  const auth = useAuthenticationStore()
  const snackbar = useSnackbarStore()
  if (
    (to.meta?.authRequired == true && !auth.loggedIn) ||
    (to.meta?.role != undefined &&
      Array.isArray(to.meta.role) &&
      to.meta.role.length > 0 &&
      !auth.loggedIn)
  ) {
    snackbar.push("Sie müssen sich einloggen, um diese Seite anzuzeigen.")
    router.push({ name: "login" })
  } else if (
    to.meta?.role != undefined &&
    Array.isArray(to.meta.role) &&
    to.meta.role.length > 0 &&
    !to.meta.role.includes(auth.role)
  ) {
    snackbar.push("Sie haben nicht die notwendigen Berechtigungen, um diese Seite aufzurufen.")
    router.push("/login")
  }
  next()
})

export default router
