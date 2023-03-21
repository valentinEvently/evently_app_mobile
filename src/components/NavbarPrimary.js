/* eslint-disable react/prop-types */
import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons'

const NavbarPrimary = ({ title }) => {
  const navigation = useNavigation()
  return (
    <View className="flex pl-4 pt-4 mb-4">
        <View className=" items-center h-8   justify-center">
          <Text className="font-bold text-white text-">{title}</Text>
        </View>
        <View className="h-8 justify-center -mt-8">
          <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="ios-chevron-back" size={26} color='#FFFFFF'/>
          </TouchableOpacity>
        </View>
      </View>
  )
}

export default NavbarPrimary
