import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  cocktails: [],
  status: 'idle',
  error: null,
}

export const fetchCocktails = createAsyncThunk(
  'cocktails/fetchCocktails',
  async () => {
    const response = await fetch(
      'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
    )
    const data = await response.json()
    return data.drinks
  }
)

const cocktailsSlice = createSlice({
  name: 'cocktails',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCocktails.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchCocktails.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.cocktails = action.payload
      })
      .addCase(fetchCocktails.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const selectCocktails = (state) => state.cocktails

export default cocktailsSlice.reducer
