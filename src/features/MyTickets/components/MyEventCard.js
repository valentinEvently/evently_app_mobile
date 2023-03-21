/* eslint-disable react/prop-types */
import { Text, TouchableOpacity, ImageBackground, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import { getDayNumber, getMonthAbbr, getYear } from '../services/api'

const MyEventCard = ({ event, events, isCardSmall }) => {
  // console.log('Eventos', events)
  console.log('Evento', event)
  const navigation = useNavigation()
  return (

    <TouchableOpacity className={isCardSmall ? 'h-40 w-30 m-2' : 'h-100 w-64 m-2'} onPress={() => {
      navigation.navigate('Mis Eventos', {
        eventId: event.event_id,
        ticketId: event.ticket_id

      })
    }}>
      <View className="flex-1 p-2 bg-inputPrimary rounded-md">
        <ImageBackground
          className="flex- h-64"
          source={{ uri: event.image }}
          resizeMode="cover"
          imageStyle={{ borderRadius: 12 }}
          >

          </ImageBackground>
          <View className="flex-2 justify-around p-2">
              <Text className="font-semibold text-white text-lg" numberOfLines={2}>{event.name}</Text>
              <Text className=" text-lightGray text-sm"><Text>{getDayNumber(event.date)}</Text><Text> {getMonthAbbr(event.date)}</Text> <Text> {getYear(event.date)}</Text></Text>
              <Text className=" text-lightGray text-sm">{event.address}</Text>
          </View>
      </View>
    </TouchableOpacity>
  )
}

export default MyEventCard
