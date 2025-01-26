<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router"
import { useTheme } from "vuetify"
import { useAuthenticationStore } from "@/stores/AuthenticationStore.ts"
import Snackbar from "@/components/SnackbarDisplayer.vue"
import { ref } from "vue"

const auth = useAuthenticationStore()

const theme = useTheme()

const drawer = ref<boolean>(false)

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark"
}
</script>

<template>
  <v-layout>
    <v-app-bar color="primary" density="compact">
      <template v-slot:image>
        <v-img
          src="https://www.tgm.ac.at/wp-content/uploads/2022/03/cropped-tgm_logo_300dpi.jpg"
          height="36"
          class="my-auto"
        />
      </template>
      <template v-slot:prepend>
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <router-link to="/"></router-link>
        <router-link to="/logged-in" v-slot="{ href, route, navigate }">
          <v-btn :href="href" @click="navigate" v-if="auth.isRouteVisible(route)">
            {{ route.name }}
          </v-btn>
        </router-link>

        <router-link to="/just-teacher" v-slot="{ href, route, navigate }">
          <v-btn :href="href" @click="navigate" v-if="auth.isRouteVisible(route)">
            {{ route.name }}
          </v-btn>
        </router-link>
      </template>

      <template v-slot:append>
        <v-btn icon="mdi-theme-light-dark" @click="toggleTheme"></v-btn>
        <v-btn v-if="auth.loggedIn" @click="auth.logout">Logout</v-btn>
        <router-link v-else to="/login" v-slot="{ href, route, navigate }">
          <v-btn :href="href" @click="navigate">
            {{ route.name }}
          </v-btn>
        </router-link>
      </template>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" temporary>
      <v-list>
        <router-link to="/" v-slot="{ href, route, navigate }">
          <v-list-item value="home" @click="() => navigate">
            <v-list-item-title :href="href">{{ route.name }}</v-list-item-title>
          </v-list-item>
        </router-link>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <RouterView v-slot="{ Component }">
        <template v-if="Component">
          <Transition mode="out-in">
            <Suspense>
              <component :is="Component"></component>
            </Suspense>
          </Transition>
        </template>
      </RouterView>
    </v-main>
  </v-layout>
  <snackbar></snackbar>
</template>

<style scoped>
.v-navigation-drawer a {
  color: inherit;
  text-decoration-color: inherit;
  text-decoration: inherit;
}
</style>
