<script setup lang="ts">
import { ref } from "vue"
import { useAuthenticationStore } from "@/stores/AuthenticationStore.ts"
import type { LoginRequest } from "@/types/LoginRequest.ts"
import { useRouter } from "vue-router"

const authenticationStore = useAuthenticationStore()
const router = useRouter()

const form = ref<LoginRequest>({
  username: "mpointner@tgm.ac.at",
  password: "sdfsdfs",
  simulate: true,
})

async function login() {
  const sucessful = await authenticationStore.login(form.value)
  if (sucessful) {
    router.back()
  }
}
</script>

<template>
  <v-sheet class="mx-auto" width="300">
    <h1>Login</h1>
    <form>
      <v-text-field v-model="form.username" label="Username" required></v-text-field>

      <v-text-field
        v-model="form.password"
        type="password"
        label="Password"
        required
      ></v-text-field>

      <v-checkbox v-model="form.simulate" label="Simulate Login"></v-checkbox>

      <v-btn @click="login">Login</v-btn>
    </form>
  </v-sheet>
</template>

<style scoped></style>
