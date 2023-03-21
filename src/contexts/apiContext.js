import React, { useContext, useState, useEffect, createContext } from 'react'
import axios from 'axios'
import { URL } from '../constants/constants'

const APIContext = createContext()

export function APIContextProvider ({ children }) {
  const [events, setEvents] = useState([])
  /* Request api real */
  async function fetchData () {
    const { data } = await axios.get(
      /* Query api */
      `${URL}/api/v1/events`
    )
    /* Seteo data api */
    // console.log(data.events)
    setEvents(data.events)

    /* data json server */
    // console.log(data)
    // setEvents(data)
  }
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <APIContext.Provider
      value={{
        events
      }}
    >
      {children}
    </APIContext.Provider>
  )
}

export function useAPI () {
  const context = useContext(APIContext)
  if (context === undefined) {
    throw new Error('Context must be used within a Provider')
  }
  return context
}
