import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  { nombre: 'Reggaeton', visible: false },
  { nombre: 'Bachata', visible: true },
  { nombre: 'Salsa', visible: false },
  { nombre: 'Merengue', visible: false },
  { nombre: 'Cumbia', visible: false },
  { nombre: 'Rock en español', visible: false },
  { nombre: 'Pop en español', visible: false },
  { nombre: 'Hip Hop en español', visible: false },
  { nombre: 'Música clásica en español', visible: false },
  { nombre: 'Rap en español', visible: false }
]

const musicFavoriteSlice = createSlice({
  name: 'musicFavorite',
  initialState,
  reducers: {
    toggleVisible: (state, action) => {
      const { nombre } = action.payload
      console.log('redux', nombre)
      const genero = state.find(g => g.nombre === nombre)
      if (genero) {
        genero.visible = !genero.visible
      }
    },

    clear (state) {
      return initialState
    }
  }
})

export const { toggleVisible } = musicFavoriteSlice.actions
const musicReducer = musicFavoriteSlice.reducer
export default musicReducer
