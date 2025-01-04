<script setup lang="ts">
import axios from 'axios'

async function load() {
  const sdfsdf = await axios.get('/')
  console.log(sdfsdf)
  const axiosResponse = await axios.get('/list/schueler')
  console.log(axiosResponse)
}
void load()
</script>

<template>
  <main>
    <TheWelcome />
  </main>
</template>
