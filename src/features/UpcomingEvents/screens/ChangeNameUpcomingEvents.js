import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React, { useContext, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import { UserContext } from '../../../contexts/UserContext/UserContext.js'
import NavbarPrimary from '../../../components/NavbarPrimary.js'
import ButtonPrimary from '../../../components/ButtonPrimary'

const ChangeNameUpcomingEvents = () => {
  const navigation = useNavigation()
  const { user, setUser } = useContext(UserContext)
  const [newUsername, setNewUsername] = useState(user.name)
  console.log('CONTEXXXXXXXXXXXXXXXXXXXXXXTTTTTTTT', user)

  return (
    <View className="bg-secondary flex-1">
      <NavbarPrimary title='Cambiar nombre' />
      <View className="flex-1 pl-4 pr-4 pb-4">
        <View className="flex-1">
        <Text className=" mt-4 mb-4 text-secondary">Nombre y Apellido </Text>
        <View className="flex-row items-center space-x-2 pb-4 " >
                <TextInput
                placeholder='Nombre y Apellido'
                placeholderTextColor='#6D7D8D'
                keyboardType='default'
                value={newUsername}
                name={newUsername}
                onChange={(text) => setNewUsername(text) }
                className="flex-row flex-1 space-x-2 bg-inputPrimary p-2 rounded text-white"
                />
        </View>

        </View>
        <View className="flex-2">
          <ButtonPrimary title='Guardar'/>

        </View>

      </View>
    </View>
  )
}

export default ChangeNameUpcomingEvents
