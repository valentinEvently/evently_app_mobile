import { View, Text, TouchableOpacity, ImageBackground, TextInput } from 'react-native'
import React, { useContext, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import { UserContext } from '../../../contexts/UserContext/UserContext.js'

const ChangeEmailMyCollections = () => {
  const navigation = useNavigation()
  const { user, setUser } = useContext(UserContext)
  const [newEmail, setNewEmail] = useState(user.email)
  // console.log('CONTEXXXXXXXXXXXXXXXXXXXXXXTTTTTTTT', user)

  return (
    <View className="bg-secondary flex-1 pt-4 pl-4 pr-4 pb-4">
      <View className=" flex-row justify-between">

          <Ionicons name="ios-arrow-back" size={26} color='#FFFFFF' onPress={() => navigation.goBack()}/>
          <TouchableOpacity>
              <Text className=" text-white text-lg">Cambiar</Text>
          </TouchableOpacity>

      </View>

      <Text className=" mt-4 mb-4 text-secondary">Email </Text>
      <View className="flex-row items-center space-x-2 pb-4 " >
                <TextInput
                placeholderTextColor='#6D7D8D'
                placeholder='Email'
                keyboardType='default'
                value={newEmail}
                name={newEmail}
                onChange={(text) => setNewEmail(text) }
                className="flex-row flex-1 space-x-2 bg-inputPrimary text-white p-2 rounded"
                />
          </View>
    </View>
  )
}

export default ChangeEmailMyCollections
