import { RolllStateType } from "./roll"

export interface Person {
  id: number
  first_name: string
  last_name: string
  photo_url?: string
  roll?: RolllStateType
}

export const PersonHelper = {
  getFullName: (p: Person) => `${p.first_name} ${p.last_name}`,
  getTime: (date: Date) => `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} - ${date.getDate()}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`,
}

export type OrderType = "first_name" | "last_name" | "asc" | "desc"

export const OrderList = [
  { label: "First Name", value: "first_name" },
  { label: "Last Name", value: "last_name" },
  { label: "ASC Order", value: "asc" },
  { label: "DESC Order", value: "desc" },
]
