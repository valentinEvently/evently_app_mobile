import React, { useContext, useState, useEffect, createContext } from 'react'
import axios from 'axios'

const EventContext = createContext()

export function EventsContext ({ children }) {
  const [events, setEvents] = useState([])
  useEffect(() => {
    async function fetchData () {
      const { data } = await axios.get(
        'https://nftminter-production.up.railway.app/api/v1/events'
      )
      // console.log(data.events)
      setEvents(data.events)
    }
    fetchData()
  }, [])
  return (
    <EventContext.Provider
      value={{
        events
      }}
    >
      {children}
    </EventContext.Provider>
  )
}

export function useEvents () {
  const context = useContext(EventContext)
  if (context === undefined) {
    throw new Error('Context must be used within a Provider')
  }
  return context
}
