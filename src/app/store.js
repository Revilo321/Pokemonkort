import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import cocktailsReducer from '../features/cocktails/cocktailSlice'

export const store = configureStore({
  reducer: {
    cocktails: cocktailsReducer,
    counter: counterReducer,
  },
})
