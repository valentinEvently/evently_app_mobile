import { URL } from '../constants/constants.js'
import axios from 'axios'

// export const login = async (email, password) => {
//   const url = `${URL}/api/v1/auth/login`
//   fetch((url), {
//     method: 'POST',
//     body: JSON.stringify({ email, password }),

// }
export const login = async (email, password) => {
  const url = `${URL}/api/v1/auth/login`
  try {
    const response = await axios.post(url, { email, password })
    console.log('login', response.data)
    const midata = response.data
    return midata
  } catch (error) {
    console.log('error login', error)
    return error
  }
}
