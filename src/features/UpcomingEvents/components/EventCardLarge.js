import { Text, TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'

const EventCardLarge = ({ event, id }) => {
  const navigation = useNavigation()
  // console.log('este es el id del evento', id)
  // console.log('**********evento', event)
  return (
    <TouchableOpacity className={'h-64 w-44 m-2 '} onPress={() => {
      navigation.navigate('EventDetails', {
        eventId: event?.id

      })
    }}>

      <ImageBackground
        className="flex-1"
        source={{ uri: event?.cover_image }}
        resizeMode="cover"
        imageStyle={{ borderRadius: 12 }}
        >
          <LinearGradient
          colors={['transparent', 'rgba(0.5,0,0,1)']}
          className="p-4 h-full justify-end rounded-xl"
          >
            <Text className=" text-white text-xs">{event?.tickets_types[0]?.date}</Text>
            <Text className="font-bold text-white text-md">{event?.name}</Text>
          </LinearGradient>
        </ImageBackground>
    </TouchableOpacity>
  )
}

export default EventCardLarge
