<script setup lang="ts">
import router from "@/router"
import { RouterLink } from "vue-router"
import { useAuthenticationStore } from "@/stores/AuthenticationStore.ts"

const authStore = useAuthenticationStore()

const routes = router.getRoutes().filter((route) => authStore.isRouteVisible(route))
</script>

<template>
  <nav>
    <div class="nav-wrapper">
      <a href="#" class="brand-logo">Logo</a>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li v-for="route in routes" :key="route.path">
          <router-link :to="route.path">{{ route.name }}</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped></style>
