import { Text, TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'

const MyEventCard = ({ height, width }) => {
  // const imageUrl = '../../../assets/metallica.jpg'

  return (
    <TouchableOpacity className="h-80 w-60 m-2"
    // onPress={() => {
    //   navigation.navigate("Mis Eventos");
    // }}
    >

      <ImageBackground
        className="flex-1"
        source={require('../../../../assets/coldplay.jpg')}
        resizeMode="cover"
        imageStyle={{ borderRadius: 12 }}
        >
          <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          className="p-4 h-full justify-end rounded-xl"
          >
            <Text className=" text-white text-xs">21 Oct 2022</Text>
            <Text className="font-bold text-white text-md">Cold Play Argentina Concert</Text>
          </LinearGradient>
        </ImageBackground>
    </TouchableOpacity>
  )
}

export default MyEventCard
