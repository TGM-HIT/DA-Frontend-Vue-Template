import type { Nullable } from "./Nullable.ts"

export interface Item {
  id: number
  name: string
}

export type NewItem = Nullable<Item, "id">
