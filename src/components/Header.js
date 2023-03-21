import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { UserContext } from '../contexts/UserContext/UserContext.js'
import { useNavigation } from '@react-navigation/native'

const Header = ({ title }) => {
  const navigation = useNavigation()
  const { setUser } = useContext(UserContext)
  return (
    <View className=" flex-row pb-3 pt-3 items-center mx-4 space-x-2">
        <TouchableOpacity className="flex-1" onPress={() => navigation.navigate('Settings')}>
        {/* <TouchableOpacity className="flex-1" onPress={() => setUser(null)}> */}
          <Ionicons name="ios-settings-sharp" size={22} color='#6D7D8D'/>
        </TouchableOpacity>
        <View className="flex-2 items-center">
            <Text className="font-bold text-secondary text-sm">{title}</Text>
        </View>
        <View className="flex-1 items-end">
          <Ionicons name="ios-notifications" size={22} color='#6D7D8D'/>
        </View>
    </View>
  )
}

export default Header
