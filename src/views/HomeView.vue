<script setup lang="ts">
import axios from "axios"
import { ref } from "vue"
import Button from "primevue/button"

const currentUser = ref(null)

async function load() {
  const response = await axios.get("/")
  if (response.status == 200) {
    currentUser.value = response.data
  }
}
await load()
</script>

<template>
  <main>
    <h1>Startseite</h1>
    <Button>Verify</Button>
    {{ currentUser }}
  </main>
</template>

<style scoped></style>
