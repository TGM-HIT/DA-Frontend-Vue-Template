<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useTheme } from 'vuetify'
import { useAuthenticationStore } from '@/stores/AuthenticationStore.ts'

const authenticationStore = useAuthenticationStore()

const theme = useTheme()

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}
</script>

<template>
  <v-layout>
    <v-app-bar color="primary" density="compact">
      <v-app-bar-title>DA-Frontend-Vue-Template</v-app-bar-title>

      <router-link to="/about" v-slot="{ href, route, navigate }">
        <v-btn :href="href" @click="navigate">
          {{ route.name }}
        </v-btn>
      </router-link>

      <template v-slot:append>
        <v-btn icon="mdi-theme-light-dark" @click="toggleTheme"></v-btn>
        <v-btn v-if="authenticationStore.loggedIn" @click="authenticationStore.logout"
          >Logout</v-btn
        >
        <router-link v-else to="/login" v-slot="{ href, route, navigate }">
          <v-btn :href="href" @click="navigate">
            {{ route.name }}
          </v-btn>
        </router-link>
      </template>
    </v-app-bar>
    <v-main>
      <RouterView />
    </v-main>
  </v-layout>
</template>

<style scoped></style>
