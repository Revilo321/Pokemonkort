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
    const cocktailsWithPricing = data.drinks.map((drink) => {
      const priceToMake = parseFloat((Math.random() * 2 + 1).toFixed(2))
      const sellingPrice = parseFloat(
        (priceToMake + Math.random() * 3 + 0.5).toFixed(2)
      )

      return {
        ...drink,
        priceToMake,
        sellingPrice,
      }
    })
    return cocktailsWithPricing
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
