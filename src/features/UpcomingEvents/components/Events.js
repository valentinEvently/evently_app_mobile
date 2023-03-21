/* eslint-disable no-undef */
import { View, Text, ScrollView } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import EventCard from './EventCard'
import { getRandomEvents } from '../services/api'

const EventsLarge = ({ title, tickets }) => {
  // console.log('_________???????_________?_?_?_?_?_ tickets', tickets)
  const [loading, setLoading] = useState(true)

  const [events, setEvents] = useState(null)
  async function loadData () {
    try {
      // setLoading(true);
      const randomEvents = await getRandomEvents()
      // console.log('esta es la data', randomEvents)
      setEvents(randomEvents)
    } catch (error) {
      console.error(error)
    } finally {
      // setLoading(false);
      // console.log('estos son LOS EVENTOS', randomEvents)
    }
  }
  useEffect(() => {
    loadData()
  }, [])

  return (
    <View className="h-auto pt-4 pb-4">
      <Text className="pl-4 bg-transparent text-xl font-bold text-secondary">{title}</Text>
        <ScrollView
              contentContainerStyle={{
                paddingHorizontal: 15,
                paddingTop: 10
              }}
            horizontal
            showsHorizontalScrollIndicator={false}
        >
          {
            tickets &&
              tickets.map((e,index) => <EventCard key={index} id={e?.event_id} event={e}/>)
          }
        </ScrollView>
      </View>
  )
}

export default EventsLarge
