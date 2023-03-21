/* eslint-disable react/prop-types */
import { Text, TouchableOpacity, ImageBackground, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'
const formatTime = (string) => {
  return string.slice(0, 5)
}

const MyEventCardSendGift = ({ event, events }) => {
  // console.log('Eventos', events)
  // console.log('Evento', event)
  const navigation = useNavigation()
  return (

    <TouchableOpacity className='h-52 w-80 m-2' onPress={() => {
      navigation.navigate('Mis Eventos', {
        eventId: event.event_id

      })
    }}>

      <ImageBackground
        className="flex-1"
        source={{ uri: event.image }}
        resizeMode="cover"
        imageStyle={{ borderRadius: 12 }}
        >
          <LinearGradient
          colors={['transparent', 'rgba(1,0,0,1)']}
          className="p-4 h-full justify-end rounded-xl"
          >
            <Text className="font-bold text-white text-2xl pb-2">{event.name}</Text>
            <Text className=" text-white text- pb-2">{event.date} a las {event.time && formatTime(event.time)}</Text>
            <Text className=" text-white text-xs pb-2">{event.place}, {event.address}, {event.city}</Text>
            <View className="flex-row pb-2 justify-start">
              <View className="pr-3">
                {/* <Text className=" text-white text-lg text-center">{myEvent.area}</Text> */}
                <Text className=" font-bold text-white text-xl">{event.area}</Text>
                <Text className=" text-white text-xs">Sección</Text>

              </View>
              <View>
                {/* <Text className=" text-white text-lg">{event.price} ARS</Text> */}
                <Text className=" font-bold text-white text-xl">{event.price} ARS</Text>
                <Text className=" text-white text-xs">Precio</Text>

              </View>

            </View>
          </LinearGradient>
        </ImageBackground>
    </TouchableOpacity>
  )
}

export default MyEventCardSendGift
