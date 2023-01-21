import { createSlice } from "@reduxjs/toolkit"
import { Person, PersonHelper } from "shared/models/person"

interface PersonState {
  persons: Person[]
}

const initialState: PersonState = {
  persons: [],
}

const getFilteredPersons = (list: Person[], value: string) => {
  return list?.filter((_item) => PersonHelper.getFullName(_item).toLowerCase().includes(value.toLowerCase()))
}

export const personSlice = createSlice({
  name: "person",
  initialState,
  reducers: {
    filterPersons: (state, action) => {
      state.persons = getFilteredPersons(action.payload.students, action.payload.value)
    },
  },
})

export const { filterPersons } = personSlice.actions

export default personSlice.reducer
