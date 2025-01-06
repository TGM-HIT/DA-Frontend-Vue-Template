<script setup async lang="ts">
import axios from "axios"
import { ref } from "vue"

const teacher = ref(null)

function log() {
  console.log("Teacher View rendered")
}

async function loading(): Promise<void> {
  await axios
    .get("/list/lehrer")
    .then((response) => {
      console.log("loading successful", response)
      if (response.status == 200) {
        teacher.value = response.data
        return true
      } else {
        return false
      }
    })
    .catch((error) => {
      console.log("loading", error)
    })
}
await loading()
</script>

<template>
  <div>
    <h1>Only visible for logged-in teachers</h1>
    <div>{{ teacher }}{{ log() }}</div>
  </div>
</template>

<style scoped></style>
