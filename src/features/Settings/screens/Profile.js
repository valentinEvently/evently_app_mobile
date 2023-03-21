import { View, Text, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useContext } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'

const Profile = () => {
  const navigation = useNavigation()

  return (
    <View className="bg-gray-100 pt-8">
      <View className="p-4 flex-row items-center">

          <Ionicons name="ios-arrow-back" size={22} color='#F207A0' onPress={() => navigation.goBack()}/>
          <Text className="pl-4 text-secondary font-bold text-lg">Mi Perfil</Text>

      </View>

      <TouchableOpacity className="p-4 m-4 bg-white rounded-md" onPress={() => navigation.navigate('Profile')}>
        <View className="flex-row justify-between">
            <View className=" justify-center items-center">

              <Text className="pl-2 text-secondary">Nombre</Text>
            </View>
            <View className="flex-2 ml-3 justify-center flex-row" >
                  <Text className="pl-2 text-tertiary">Bryan Scalzo</Text>
                  <Ionicons name="md-chevron-forward-sharp" size={22} color='#F207A0'/>
            </View>
        </View>
      </TouchableOpacity>

      <View className=" m-4 bg-white rounded-md">
        <TouchableOpacity className="p-4 flex-row justify-between">
            <View className=" justify-center items-center">
              <Text className="pl-2 text-secondary">Email</Text>
            </View>
            <View className="flex-2 ml-3 justify-center flex-row" >
                  <Text className="pl-2 text-tertiary">bryan@evently.com</Text>
                  <Ionicons name="md-chevron-forward-sharp" size={22} color='#F207A0'/>
            </View>
        </TouchableOpacity>
        <TouchableOpacity className="pl-4 pr-4 pb-4 flex-row justify-between">
            <View className=" justify-center items-center">
              <Text className="pl-2 text-secondary">Contraseña</Text>
            </View>
            <View className="flex-2 ml-3 justify-center flex-row" >
                  <Text className="pl-2 text-tertiary">********</Text>
                  <Ionicons name="md-chevron-forward-sharp" size={22} color='#F207A0'/>
            </View>
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default Profile
