/* eslint-disable no-undef */
import { View, Text, ScrollView } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import EventCardLarge from './EventCardLarge'
import { EventsContext, useEvents } from '../../../contexts/EventsContext/EventsContext'
import axios from 'axios'
import { useAPI } from '../../../contexts/apiContext.js'

const EventsLarge = ({ title }) => {
  const [loading, setLoading] = useState(true)
  // const { events, setEvents } = useContext(EventsContext)

  // useEffect(() => {
  //   fetch('https://nftminter-production.up.railway.app/api/v1/events', {
  //     // headers: {
  //     //   'auth-token': localStorage.getItem('token')
  //     // }
  //   })
  //     .then(res => res.json())
  //     .then((data) => setEvents(data.events))
  //     // .then((data) => setEvents(data.events))
  //     // .then((data) => (data.events))
  // }, [])

  // async function loadData () {
  //   try {
  //     const response = await axios.get(
  //       'https://nftminter-production.up.railway.app/api/v1/events'
  //     )
  //     console.log(response.data.events)
  //     setEvents(response.data.events)
  //   } catch (error) {
  //     console.error(error)
  //   } finally {
  //     setLoading(false)
  //     // console.log(response.events)
  //   }
  // }

  // useEffect(() => {
  // }, [])
  const { events } = useAPI()
  // const event = events.filter((e) => e.id === '9eb51dd8-1865-45e2-9ec0-8b6fbb3cd30c')
  // console.log('esto son los eventos', events)
  // console.log('el evento', event)

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

              events?.map((e) => <EventCardLarge key={e?.id} id={e?.id} event={e}/>)
          }
        </ScrollView>
      </View>
  )
}

export default EventsLarge
