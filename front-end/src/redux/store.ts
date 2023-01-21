import { configureStore } from "@reduxjs/toolkit"
import personSlice from "./person.slice"
import { createLogger } from "redux-logger"

const logger = createLogger()

export const store = configureStore({
  reducer: {
    person: personSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
