import { View, Text, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useContext } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import { UserContext } from '../../contexts/UserContext/UserContext.js'

const SettingsScreen = () => {
  const navigation = useNavigation()
  const { setUser } = useContext(UserContext)

  return (
    <View className="bg-gray-100 pt-8">
      <View className="p-4 flex-row items-center">

          <Ionicons name="ios-arrow-back" size={22} color='#F207A0' onPress={() => navigation.goBack()}/>
          <Text className="pl-4 text-secondary font-bold text-lg">Configuración</Text>

      </View>

      <TouchableOpacity className="p-4 m-4 bg-white rounded-md" onPress={() => navigation.navigate('Profile')}>
        <View className="flex-row justify-between">
            <View className="flex-row justify-center items-center">
              <Ionicons name="person-circle" size={22} color='#F207A0'/>
              <Text className="pl-2 text-secondary">Mi Perfil</Text>
            </View>
            <View className="flex-2 ml-3 justify-center" >
                  <Ionicons name="md-chevron-forward-sharp" size={22} color='#F207A0'/>
            </View>
        </View>
      </TouchableOpacity>

      <View className=" m-4 bg-white rounded-md">
        <TouchableOpacity className="p-4 flex-row justify-between">
            <View className="flex-row justify-center items-center">
            <MaterialIcons name="payment" size={22} color='#F207A0'/>
              <Text className="pl-2 text-secondary">Métodos de pago</Text>
            </View>
            <View className="flex-2 ml-3 justify-center" >
                  <Ionicons name="md-chevron-forward-sharp" size={22} color='#F207A0'/>
            </View>
        </TouchableOpacity>
        <TouchableOpacity className="pl-4 pr-4 pb-4 flex-row justify-between">
            <View className="flex-row justify-center items-center">
            <Ionicons name="ios-notifications" size={22} color='#F207A0'/>
              <Text className="pl-2 text-secondary">Notificaciones</Text>
            </View>
            <View className="flex-2 ml-3 justify-center" >
                  <Ionicons name="md-chevron-forward-sharp" size={22} color='#F207A0'/>
            </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity className="p-4 m-4 bg-white rounded-md" onPress={() => setUser(null)}>
        <View className="flex-row justify-between">
            <View className="flex-row justify-center items-center">
            <MaterialCommunityIcons name="logout" size={22} color='#F207A0'/>
              <Text className="pl-2 text-secondary">Salir</Text>
            </View>
            <View className="flex-2 ml-3 justify-center" >
            <Ionicons name="md-chevron-forward-sharp" size={22} color='#F207A0'/>
            </View>
        </View>
      </TouchableOpacity>

    </View>
  )
}

export default SettingsScreen
