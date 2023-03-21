import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { UserContext } from '../../../contexts/UserContext/UserContext.js'
import { useNavigation } from '@react-navigation/native'

const Header = ({ title }) => {
  const navigation = useNavigation()
  const { user, setUser } = useContext(UserContext)
  return (
    <View className="bg-secondary ">
      <View className="flex-row pb-3 items-center mx-4 space-x-2 justify-between">
        <View className="flex-2 flex-row items-center">
            <Image
                style={styles.logo}
                source={require('../../../../assets/LogoSmall.png')}
            />

        </View>
        <View className="flex-1 items-end">
        <View className=" flex-row">
            <TouchableOpacity className="p-1" onPress={() => navigation.navigate('SettingsUpcomingEvents')}>
            {/* <TouchableOpacity className="flex-1" onPress={() => setUser(null)}> */}
              <Ionicons name="ios-settings-outline" size={22} color='#FFFFFF'/>
            </TouchableOpacity>
            {/* <TouchableOpacity className="p-1 pl-3"
            // onPress={() => navigation.navigate('NotificationsUpcomingEvents')}
            >
              <Ionicons name="md-chatbox-outline" size={22} color='#FFFFFF'/>
            </TouchableOpacity> */}
            <TouchableOpacity className="p-1 pl-3" onPress={() => navigation.navigate('NotificationsUpcomingEvents')}>
              <Ionicons name="ios-notifications-outline" size={22} color='#FFFFFF'/>
            </TouchableOpacity>
        </View>

        </View>

      </View>
      <View>
        <View className="pb-4 pt-1 mx-4 space-x-2 flex-row items-center">
        <Image
                style={styles.avatar}
                source={require('../../../../assets/Profile.png')}
            />
          <Text className="pl-3 text-white text-base font-semibold">!Hola, {user?.name}!</Text>
        </View>
      </View>

    </View>
  )
}
const styles = StyleSheet.create({

  logo: {
    height: 24,
    width: 61

  },
  avatar: {
    height: 32,
    width: 32
  }

})

export default Header
