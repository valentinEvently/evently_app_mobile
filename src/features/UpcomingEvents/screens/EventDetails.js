/* eslint-disable react/prop-types */
import { View, Text, ImageBackground } from 'react-native'
import EventList from '../components/EventList.js'
import { ScrollView } from 'react-native-gesture-handler'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { URL } from '../../../constants/constants.js'
import NavbarPrimary from '../../../components/NavbarPrimary'

const EventDetails = ({ route }) => {
  const eventId = route.params?.eventId
  const imageUrl = '' + URL + '/api/v1/events/' + eventId
  const [event, setEvent] = useState(null)

  async function loadData () {
    try {
      // setLoading(true);
      const { data } = await axios.get(
        imageUrl
      )
      setEvent(data.event)
    } catch (error) {
      console.error(error)
    } finally {
      // setLoading(false);
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
   <>
   {
     event !== null && eventId
       ? <View className="flex-1 bg-secondary">
        <NavbarPrimary title='Detalles del evento' />

            <ScrollView className="pl-4 pr-4">
              <ImageBackground
                  className="rounded-b-lg h-80"
                  source={{ uri: event.cover_image }}
                  resizeMode="cover"
                  imageStyle={{ borderBottomLeftRadius: 4, borderBottomRightRadius: 4, borderTopLeftRadius: 4, borderTopRightRadius: 4 }}
              >
              </ImageBackground>
              <Text className="font-semibold text-white text-2xl pt-4">{event.name}</Text>
              <View>
                <EventList event={event}/>
              </View>
            </ScrollView>
          </View>

       : ''

   }
   </>

  )
}

export default EventDetails
