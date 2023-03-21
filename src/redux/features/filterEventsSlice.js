import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  months: [],
  years: [],
  rangePrice: {
    minPrice: 0,
    maxPrice: 0
  }
}

const filterEventsSlice = createSlice({
  name: 'filterEvents',
  initialState,
  reducers: {
    addMonth (state, action) {
      if (state.months.includes(action.payload)) {
        state.months = state.months.filter((month) => month !== action.payload)
      } else {
        state.months.push(action.payload)
      }
    },
    addYear (state, action) {
      if (state.years.includes(action.payload)) {
        state.years = state.years.filter((year) => year !== action.payload)
      } else {
        state.years.push(action.payload)
      }
    },
    addMinPrice (state, action) {
      state.rangePrice.minPrice = action.payload
    },
    addMaxPrice (state, action) {
      state.rangePrice.maxPrice = action.payload
    },

    clear (state) {
      return initialState
    }
  }
})

export const { clear, addMonth, addYear, addMinPrice, addMaxPrice } = filterEventsSlice.actions

export default filterEventsSlice.reducer
