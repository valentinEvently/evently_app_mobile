import { URL } from '../constants/constants.js'
import { login } from './login.js'
import axios from 'axios'

export const signUp = async (_datos) => {
  console.log('datos en signUp', _datos)
  const url = `${URL}/api/v1/users`
  try {
    const response = await axios.post(url, _datos)
    console.log('holi')
    // console.log(response)
    const midata = response.data
    console.log('miData', midata)
    return midata
  } catch (error) {
    // console.log(error)
  }
}
