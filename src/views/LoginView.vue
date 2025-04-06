<script setup lang="ts">
import { reactive } from "vue"
import { useAuthenticationStore } from "@/stores/AuthenticationStore.ts"
import type { LoginRequest } from "@/types/LoginRequest.ts"
import { useRouter } from "vue-router"
import Card from "primevue/card"
import InputText from "primevue/inputtext"

const authenticationStore = useAuthenticationStore()
const router = useRouter()

const form = reactive<LoginRequest>({
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
  <Card>
    <template #title>Login</template>
    <template #content>
      <div class="flex flex-col gap-2">
        <label for="username">Username</label>
        <InputText id="username" v-model="form.username" />
        <Message size="small" severity="secondary" variant="simple"
          >Enter your username to reset your password.</Message
        >
      </div>
      <div class="flex flex-col gap-2">
        <label for="password">Password</label>
        <InputText id="password" v-model="form.password" />
        <Message size="small" severity="secondary" variant="simple"
          >Enter your username to reset your password.</Message
        >
      </div>
    </template>
  </Card>
  <!--  <v-sheet class="mx-auto" width="300">
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
    </v-sheet>-->
</template>

<style scoped>
.p-card {
  width: 480px;
  margin: 50px auto;
}
</style>
