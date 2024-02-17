import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { doc, updateDoc } from 'firebase/firestore'
import { auth, db } from '../../firebase'

const initialState = {
  items: {},
}

export const addToCartAsync = createAsyncThunk(
  'cart/addToCartAsync',
  async (cocktail, { getState, dispatch }) => {
    dispatch(addToCart(cocktail))
    const userId = auth.currentUser.uid
    if (userId) {
      const cartRef = doc(db, 'carts', userId)
      const updatedCart = getState().cart.items
      await updateDoc(cartRef, { items: updatedCart })
    }
  }
)
export const incrementQuantityAsync = createAsyncThunk(
  'cart/incrementQuantityAsync',
  async (itemId, { getState, dispatch }) => {
    dispatch(incrementQuantity(itemId))
    const userId = auth.currentUser.uid
    if (userId) {
      const updatedCart = getState().cart.items
      const cartRef = doc(db, 'carts', userId)
      await updateDoc(cartRef, { items: updatedCart })
    }
  }
)
export const decrementQuantityAsync = createAsyncThunk(
  'cart/decrementQuantityAsync',
  async (itemId, { getState, dispatch }) => {
    dispatch(decrementQuantity(itemId))
    const userId = auth.currentUser.uid

    if (userId) {
      const updatedCart = getState().cart.items
      const cartRef = doc(db, 'carts', userId)
      await updateDoc(cartRef, { items: updatedCart })
    }
  }
)
export const deleteFromCartAsync = createAsyncThunk(
  'cart/deleteFromCartAsync',
  async (itemId, { getState, dispatch }) => {
    dispatch(deleteFromCart(itemId))
    const userId = auth.currentUser.uid
    if (userId) {
      const updatedCart = getState().cart.items
      const cartRef = doc(db, 'carts', userId)
      await updateDoc(cartRef, { items: updatedCart })
    }
  }
)

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartItems: (state, action) => {
      state.items = action.payload
    },
    clearCart: (state) => {
      state.items = {}
    },
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
  setCartItems,
  clearCart,
} = cartSlice.actions

export default cartSlice.reducer
