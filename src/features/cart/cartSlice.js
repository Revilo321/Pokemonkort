import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: {},
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const cocktail = action.payload
      if (state.items[cocktail.idDrink]) {
        state.items[cocktail.idDrink].quantity += 1
      } else {
        state.items[cocktail.idDrink] = { data: cocktail, quantity: 1 }
      }
    },
    removeFromCart: (state, action) => {
      const cocktailId = action.payload
      if (state.items[cocktailId] && state.items[cocktailId].quantity > 1) {
        state.items[cocktailId].quantity -= 1
      } else {
        delete state.items[cocktailId]
      }
    },
    incrementQuantity: (state, action) => {
      const itemId = action.payload
      if (state.items[itemId]) {
        state.items[itemId].quantity += 1
      }
    },
    decrementQuantity: (state, action) => {
      const itemId = action.payload
      if (state.items[itemId] && state.items[itemId].quantity > 1) {
        state.items[itemId].quantity -= 1
      } else {
        delete state.items[itemId]
      }
    },
    deleteFromCart: (state, action) => {
      const cocktailId = action.payload
      if (state.items[cocktailId]) {
        delete state.items[cocktailId]
      }
    },
  },
})

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  deleteFromCart,
} = cartSlice.actions

export default cartSlice.reducer
