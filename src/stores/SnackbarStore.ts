import { computed, ref } from "vue"
import { defineStore } from "pinia"
import type { SnackbarMessage } from "@/types/SnackbarMessage.ts"

export const useSnackbarStore = defineStore("snackbar", () => {
  const queue = ref<SnackbarMessage[]>([])

  //const doubleCount = computed(() => count.value * 2)
  function push(snackbarMessage: SnackbarMessage | string): void {
    if (typeof snackbarMessage === "string") {
      console.log("Message " + snackbarMessage)
      queue.value.push({ message: snackbarMessage })
    } else {
      console.log("Message " + snackbarMessage.message)
      queue.value.push(snackbarMessage)
    }
  }

  function close(): void {
    queue.value.pop()
  }

  const current = computed(() => (queue.value.length > 0 ? queue.value[0] : null))

  const open = computed(() => queue.value.length > 0)

  return { push, close, current, open }
})
