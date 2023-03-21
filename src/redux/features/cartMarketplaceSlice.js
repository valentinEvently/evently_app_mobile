import { createSlice } from '@reduxjs/toolkit'

const cartMarketplaceSlice = createSlice({
  name: 'cartMarketplace',
  initialState: { value: null },
  reducers: {
    setToken: (state, action) => {
      state.value = action.payload
    }
  }
})

export const { setToken } = cartMarketplaceSlice.actions

export const guardarToken = (token) => (dispatch) => {
  dispatch(setToken(token))
}
const cartMarketplaceReducer = cartMarketplaceSlice.reducer
export default cartMarketplaceReducer
