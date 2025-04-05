<script setup async lang="ts">
import axios, { HttpStatusCode } from "axios"
import { onMounted, reactive } from "vue"
import type { Item, NewItem } from "@/types/Item.ts"

const items = reactive<Item[]>([])

async function loading(): Promise<void> {
  await axios
    .get<Item[]>("/beispiel/item")
    .then((response) => {
      console.log("loading successful", response)
      if (response.status == 200) {
        items.splice(0)
        items.push(...response.data)
        return true
      } else {
        return false
      }
    })
    .catch((error) => {
      console.log("loading", error)
    })
}

onMounted(async () => await loading())

const newItem = reactive<NewItem>({
  id: null,
  name: "",
})

async function createItem() {
  const response = await axios.post<Item>("/beispiel/item", newItem)
  if (response.status == HttpStatusCode.Created) {
    items.push(response.data)
  }
}
</script>

<template>
  <div>
    <h1>Item View</h1>
    <ul>
      <li v-for="item in items" :key="item.id">{{ item.id }}: {{ item.name }}</li>
    </ul>
    <div><input v-model="newItem.name" /><button @click="createItem">Create</button></div>
  </div>
</template>

<style scoped></style>
