import { createSlice } from '@reduxjs/toolkit'

let idInitial = 0
const eventsSlice = createSlice({
  name: 'events',
  initialState: [],
  reducers: {
    addEvent: (state, action) => {
      // return [...state, action.payload]
      state.push({ id: idInitial++, text: action.payload })
    },
    deleteEvent: (state, action) => {
      // const newEventArray = state
      // return newEventArray.filter(event => event !== action.payload)
      return state.filter(event => event !== action.payload)
    }
  }
})

export const { addEvent, deleteEvent } = eventsSlice.actions

export default eventsSlice.reducer
