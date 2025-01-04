<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'

const schueler = ref(null)

async function load() {
  const response = await axios.get('/list/schueler')
  if (response.status == 200) {
    schueler.value = response.data
  }
}
void load()
</script>

<template>
  <h1>Only visible for logged-in user</h1>
  <div>{{ schueler }}</div>
</template>

<style scoped></style>
