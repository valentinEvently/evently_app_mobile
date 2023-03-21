import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import NavbarPrimary from '../../../components/NavbarPrimary'

const NotificationsMyCollections = () => {
  const navigation = useNavigation()
  return (
    <View className="flex-1 justify-center bg-secondary">
      <NavbarPrimary title='Notificaciones'/>
      <View className="flex-1 items-center p-6 justify-center">
      <View className="justify-center align-center">
                           <Image
                               style={styles.logo}
                               source={require('../../../../assets/notifications.png')}
                           />
                       </View>
        <Text className="text-white text-2xl text-center">Sin notificaciones por el momento</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  logo: {
    width: 134,
    height: 130
  }

})

export default NotificationsMyCollections
