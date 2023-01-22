import { createSlice } from "@reduxjs/toolkit"
import { OrderType, Person, PersonHelper } from "shared/models/person"
import { RolllStateType } from "shared/models/roll"

interface PersonState {
  persons: Person[]
  filteredPersons: Person[]
}

const initialState: PersonState = {
  persons: [],
  filteredPersons: [],
}

const getFilteredPersons = (list: Person[], value: string) => {
  return list?.filter((_item) => PersonHelper.getFullName(_item).toLowerCase().includes(value.toLowerCase()))
}

const addRollWithPersonList = (list: Person[], id: number, roll: RolllStateType) => {
  return list?.map((_item) => (_item.id === id ? { ..._item, roll } : _item))
}

const getFilteredPersonByRoll = (list: Person[], roll: RolllStateType | "all" | "none") => {
  if (roll === "all") {
    return list
  }
  if (roll === "none") {
    return []
  }
  return list?.filter((_item) => _item?.roll === roll)
}

const getOrderedPersons = (list: Person[], type: OrderType) => {
  if (type === "asc") {
    return list
  }
  if (type === "desc") {
    return list.slice().reverse()
  }

  if (type === "first_name") {
    return list.slice().sort((a, b) => (a.first_name > b.first_name ? 1 : -1))
  }

  if (type === "last_name") {
    return list.slice().sort((a, b) => (a.last_name > b.last_name ? 1 : -1))
  }

  return list
}

export const personSlice = createSlice({
  name: "person",
  initialState,
  reducers: {
    filterPersons: (state, action) => {
      state.filteredPersons = getFilteredPersons(state.persons, action.payload.value)
    },
    addPersons: (state, action) => {
      state.persons = action.payload
    },
    filterPersonsByRoll: (state, action) => {
      state.filteredPersons = getFilteredPersonByRoll(state.persons, action.payload)
    },
    assignRoll: (state, action) => {
      const { id, roll } = action.payload
      state.persons = addRollWithPersonList(state.persons, id, roll)
    },
    orderPersons: (state, action) => {
      state.filteredPersons = getOrderedPersons(state.persons, action.payload)
    },
  },
})

export const { filterPersons, addPersons, assignRoll, filterPersonsByRoll, orderPersons } = personSlice.actions

export default personSlice.reducer
