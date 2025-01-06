<script setup lang="ts">
import { useSnackbarStore } from "@/stores/SnackbarStore.ts"

const snackbar = useSnackbarStore()

function snackbarTimeout(open: boolean): void {
  if (open == false) {
    snackbar.close()
  }
}
</script>

<template>
  <v-snackbar
    location="top"
    :model-value="snackbar.open"
    @update:model-value="snackbarTimeout"
    :timeout="snackbar.current?.timeout ?? 2000"
  >
    {{ snackbar.current?.message ?? "" }}

    <template v-slot:actions>
      <v-btn v-if="snackbar.current?.closeable ?? true" icon="mdi-close" @click="snackbar.close">
      </v-btn>
    </template>
  </v-snackbar>
</template>

<style scoped></style>
