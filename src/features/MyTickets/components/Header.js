import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { UserContext } from '../../../contexts/UserContext/UserContext.js'
import { useNavigation } from '@react-navigation/native'

const Header = ({ title }) => {
  const navigation = useNavigation()
  const { setUser } = useContext(UserContext)
  return (
    <View className="bg-secondary flex-row pb-3 items-center mx-4 space-x-2 justify-between">
        <View className="flex-1 items-center">
          <Text className="text-white text-xl font-semibold">{title}</Text>

        </View>

    </View>
  )
}

export default Header
