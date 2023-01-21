import { createSlice } from "@reduxjs/toolkit"
import { Roll, RollInput } from "shared/models/roll"

interface PersonState {
  rolls: Roll[]
}

const initialState: PersonState = {
  rolls: [],
}

function createRoll(id: number, input: RollInput) {
  return {
    id,
    name: `Roll ${id}`,
    student_roll_states: input.student_roll_states,
    completed_at: new Date(),
  }
}

const addRollsOnList = (list: Roll[], roll: RollInput) => {
  const newRollId = list.length ? list[0].id + 1 : 1
  const rollsToSave = list.length ? [...list, createRoll(newRollId, roll)] : [createRoll(newRollId, roll)]

  return [createRoll(newRollId, roll), ...list]
}

export const rollsSlice = createSlice({
  name: "rolls",
  initialState,
  reducers: {
    addRolls: (state, action) => {
      state.rolls = addRollsOnList(state.rolls, action.payload)
    },
  },
})

export const { addRolls } = rollsSlice.actions

export default rollsSlice.reducer
