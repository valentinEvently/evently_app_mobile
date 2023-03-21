import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    selectUser (state, { payload }) {
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
  userSlice.actions
const userReducer = userSlice.reducer

export default userReducer
