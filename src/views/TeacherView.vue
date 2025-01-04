<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'

const teacher = ref(null)

async function load() {
  const response = await axios.get('/list/lehrer')
  if (response.status == 200) {
    teacher.value = response.data
  }
}
void load()
</script>

<template>
  <h1>Only visible for logged-in teachers</h1>
  <div>{{ teacher }}</div>
</template>

<style scoped></style>
