import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: []
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // addToCart (state, { payload }) {
    //   //   console.log(payload);
    //   // uid is the unique id of the item
    //   return payload
    //   // const { id } = payload
    // },
    setInitialCart: (state, action) => {
      state.items = action.payload.map(item => ({
        area: item.area,
        numTickets: 0,
        maxPerOrder: item.max_per_order,
        sectionId: item.id,
        price: item.price
      }))
      state.priceTotal = 0
    },
    addToCart (state, { payload }) {
      //   console.log(payload);
      // uid is the unique id of the item
      const { id, quantity } = payload

      const find = state.find((item) => item.id === id)
      if (find) {
        return state.map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity + quantity
              }
            : item
        )
      } else {
        state.push(payload)
      }
    },
    addTicket: (state, action) => {
      const { sectionId } = action.payload
      console.log('id en el reducer', sectionId)
      const itemIndex = state.items.findIndex(item => item.sectionId === sectionId)
      if (itemIndex === -1) {
        return
      }

      const item = state.items[itemIndex]
      if (item.numTickets < item.maxPerOrder) {
        const updatedItem = {
          ...item,
          numTickets: item.numTickets + 1
        }
        state.items = [
          ...state.items.slice(0, itemIndex),
          updatedItem,
          ...state.items.slice(itemIndex + 1)
        ]
        state.priceTotal += item.price
      }
    },
    decrementTicket: (state, action) => {
      const { sectionId } = action.payload
      console.log('id en el reducer', sectionId)
      const itemIndex = state.items.findIndex(item => item.sectionId === sectionId)
      if (itemIndex === -1) {
        return
      }

      const item = state.items[itemIndex]
      if (item.numTickets > 0) {
        const updatedItem = {
          ...item,
          numTickets: item.numTickets - 1
        }
        state.items = [
          ...state.items.slice(0, itemIndex),
          updatedItem,
          ...state.items.slice(itemIndex + 1)
        ]
        state.priceTotal -= item.price
      }
    },
    // increment (state, { payload }) {
    //   return state.map((item) =>
    //     item.id === payload
    //       ? {
    //           ...item,
    //           quantity: item.quantity + 1
    //         }
    //       : item
    //   )
    // },
    // decrement (state, { payload }) {
    //   return state.map((item) =>
    //     item.id === payload
    //       ? {
    //           ...item,
    //           quantity: item.quantity - 1
    //         }
    //       : item
    //   )
    // },
    // removeItem: (state, action) => {
    //   //   console.log(state);
    //   //   console.log(state);
    //   //   console.log(action);
    //   const itemId = action.payload
    //   return state.filter((item) => item.id !== itemId)
    // },
    clear (state) {
      return []
    }
  }
})

export const { addToCart, increment, decrement, removeItem, clear, setInitialCart, addTicket, decrementTicket } =
  cartSlice.actions
const cartReducer = cartSlice.reducer

export default cartReducer
