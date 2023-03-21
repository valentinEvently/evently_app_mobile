import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    selectEvent (state, { payload }) {
      //   console.log(payload);
      // uid is the unique id of the item
      return payload
      // const { id } = payload
    },

    addSection (state, { payload }) {
      //   console.log(payload);
      // uid is the unique id of the item
      state.push(payload)
      // const { id } = payload
    },
    clear (state) {
      return []
    }
  }
})

export const { selectEvent, clear } =
  eventSlice.actions
const eventReducer = eventSlice.reducer

export default eventReducer
