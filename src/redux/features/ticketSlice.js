import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    selectTicket (state, { payload }) {
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

export const { selectEvent, selectTicket, clear } =
  ticketSlice.actions
const ticketReducer = ticketSlice.reducer

export default ticketReducer
