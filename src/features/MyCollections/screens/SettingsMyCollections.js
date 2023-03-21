import { View, Text, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useContext } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'
import { UserContext } from '../../../contexts/UserContext/UserContext.js'
import NavbarPrimary from '../../../components/NavbarPrimary'

const SettingsMyCollections = () => {
  const navigation = useNavigation()
  const { setUser } = useContext(UserContext)

  return (
    <View className="bg-secondary flex-1">

      <NavbarPrimary title='Configuración'/>

      <TouchableOpacity className="p-4 m-4 bg-inputPrimary rounded-md" onPress={() => navigation.navigate('ProfileMyCollections')}>
        <View className="flex-row justify-between">
            <View className="flex-row justify-center items-center">
              <Ionicons name="person-outline" size={22} color='#CDCDCD'/>
              <Text className="pl-2 text-white">Mi Perfil</Text>
            </View>
            <View className="flex-2 ml-3 justify-center" >
                  <Ionicons name="md-chevron-forward-sharp" size={22} color='#CDCDCD'/>
            </View>
        </View>
      </TouchableOpacity>

      <View className=" m-4 bg-inputPrimary rounded-md">
        <TouchableOpacity className="p-4 flex-row justify-between">
            <View className="flex-row justify-center items-center">
            <Ionicons name="card-outline" size={22} color='#CDCDCD'/>
              <Text className="pl-2 text-white">Métodos de pago</Text>
            </View>
            <View className="flex-2 ml-3 justify-center" >
                  <Ionicons name="md-chevron-forward-sharp" size={22} color='#CDCDCD'/>
            </View>
        </TouchableOpacity>
        <TouchableOpacity className="pl-4 pr-4 pb-4 flex-row justify-between">
            <View className="flex-row justify-center items-center">
            <Ionicons name="ios-notifications-outline" size={22} color='#CDCDCD'/>
              <Text className="pl-2 text-white">Notificaciones</Text>
            </View>
            <View className="flex-2 ml-3 justify-center" >
                  <Ionicons name="md-chevron-forward-sharp" size={22} color='#CDCDCD'/>
            </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity className="p-4 m-4 bg-inputPrimary rounded-md" onPress={() => setUser(null)}>
        <View className="flex-row justify-between">
            <View className="flex-row justify-center items-center">
            <MaterialCommunityIcons name="logout" size={22} color='#CDCDCD'/>
              <Text className="pl-2 text-white">Salir</Text>
            </View>
            <View className="flex-2 ml-3 justify-center" >
            <Ionicons name="md-chevron-forward-sharp" size={22} color='#CDCDCD'/>
            </View>
        </View>
      </TouchableOpacity>

    </View>
  )
}

export default SettingsMyCollections
