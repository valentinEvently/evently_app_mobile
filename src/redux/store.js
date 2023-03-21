import { configureStore } from '@reduxjs/toolkit'
// import eventSlice from './eventSlice'
import cartReducer from './features/cartSlice'
import ticketReducer from './features/ticketSlice'
import filterEventsReducer from './features/filterEventsSlice'
import filterMarketplaceReducer from './features/filterMarketplaceSlice'
import eventReducer from './features/eventSlice'
import userReducer from './features/userSlice'
import musicReducer from './features/musicFavoriteSlice'
import cartMarketplaceReducer from './features/cartMarketplaceSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    ticket: ticketReducer,
    filterEvents: filterEventsReducer,
    filterMarketplace: filterMarketplaceReducer,
    event: eventReducer,
    user: userReducer,
    music: musicReducer,
    cartMarketplace: cartMarketplaceReducer

  }
})
