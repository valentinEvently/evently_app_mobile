// async function login (email, password) {
//   return fetch('/api/v1/users', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ email, password })
//   })
//     .then(async response => {
//       if (response.status === 200) {
//         return response.json()
//       }
//       throw new Error('Error de autenticación')
//     })
// }
import { useDispatch } from 'react-redux'
import { selectUser } from '../redux/features/userSlice.js'
async function login (id) {
  const dispatch = useDispatch()
  return fetch('https://nftminter-production-4518.up.railway.app/api/v1/users/0d0fed98-6555-4d1e-ace0-af45c703c921', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(async response => {
      if (response.status === 200) {
        // Setear redux con informacion
        dispatch(selectUser(response.json()))
        return response.json()
      }
      throw new Error('Error de autenticación')
    })
}

async function signUp (email, password, name) {
  return fetch('/api/v1/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ full_name: name, email, password })
  })
    .then(async response => {
      if (response.status === 200) {
        return response.json()
      }
      throw new Error('Error de autenticación')
    })
}

export {
  login,
  signUp
}
