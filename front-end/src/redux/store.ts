import { configureStore } from "@reduxjs/toolkit"
import personSlice from "./person.slice"
import { createLogger } from "redux-logger"
import rollsSlice from "./rolls.slice"

const logger = createLogger()

export const store = configureStore({
  reducer: {
    person: personSlice,
    rolls: rollsSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
