import { View, Text, TouchableOpacity, ImageBackground, Image, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import { UserContext } from '../../../contexts/UserContext/UserContext'

const ProfileMyCollections = () => {
  const navigation = useNavigation()
  const { user, setUser } = useContext(UserContext)

  return (
    <View className="bg-secondary flex-1">
      <View className="p-4 flex-row items-center">

          <Ionicons name="ios-arrow-back" size={26} color='#FFFFFF' onPress={() => navigation.goBack()}/>
          <Text className="pl-4 text-secondary font-bold text-lg">Mi Perfil</Text>

      </View>

      <TouchableOpacity className="p-4 m-4 bg-inputPrimary rounded-md" onPress={() => navigation.navigate('ChangeNameMyCollections')}>
        <View className="flex-row justify-between">
            <View className=" justify-center items-center">
              <Text className="pl-2 text-secondary">Nombre y Apellido</Text>
            </View>
            <View className="flex-2 ml-3 justify-center flex-row" >
                  <Text className="pl-2 text-tertiary">{user.name}</Text>
                  <Image
                                style={styles.icon}
                                source={require('../../../../assets/edit2.png')}
                              />
            </View>
        </View>
      </TouchableOpacity>

      <View className=" m-4 bg-inputPrimary rounded-md">
        <TouchableOpacity className="p-4 flex-row justify-between" onPress={() => navigation.navigate('ChangeEmailMyCollections')}>
        <View className="flex-row justify-between">
            <View className=" justify-center items-center">
              <Text className="pl-2 text-secondary">Email</Text>
            </View>
            <View className="flex-2 ml-3 justify-center flex-row" >
                  <Text className="pl-2 text-tertiary">{user.email}</Text>
                  <Image
                                style={styles.icon}
                                source={require('../../../../assets/edit2.png')}
                              />
            </View>
        </View>

        </TouchableOpacity>

        <TouchableOpacity className="pl-4 pr-4 pb-4 flex-row justify-between" onPress={() => navigation.navigate('ChangePasswordMyCollections')}>
            <View className=" justify-center items-center">
              <Text className="pl-2 text-secondary">Contraseña</Text>
            </View>
            <View className="flex-2 ml-3 justify-center flex-row" >
                  <Text className="pl-2 text-tertiary">********</Text>
                  <Ionicons name="md-chevron-forward-sharp" size={22} color='#FFFFFF'/>
            </View>
        </TouchableOpacity>
      </View>

    </View>
  )
}
const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24
  }
})

export default ProfileMyCollections
