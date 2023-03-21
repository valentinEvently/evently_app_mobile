import { View, Text } from 'react-native'
import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext({})

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null)
  
  // useEffect(() => {
  //     if (user) {
  //       // Logged in...
  //       setUser(user);
  //     } else {
  //       // Not logged in...
  //       setUser(null);
  //     }
  // }, [])
  
  // const signIn = async () => {
  //   //Todo: harcodeado
  //   const login = 'success'
  //   const idToken = 12345
  //   if (login === 'success') {
  //    return  console.log('logeado correctamente')
  //   }
  //   return Promise.reject()
  // }
  
  return (
    <AuthContext.Provider value={{
        user: "Bryan",
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export default function useAuth() {
    return useContext(AuthContext)
}