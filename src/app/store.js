import { combineReducers, configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import cocktailsReducer from '../features/cocktails/cocktailSlice'
import storage from 'redux-persist/lib/storage'
import cartReducer from '../features/cart/cartSlice'
import persistReducer from 'redux-persist/es/persistReducer'
import persistStore from 'redux-persist/es/persistStore'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart', 'cocktails'],
}

const rootReducer = combineReducers({
  cart: cartReducer,
  cocktails: cocktailsReducer,
  counter: counterReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)
