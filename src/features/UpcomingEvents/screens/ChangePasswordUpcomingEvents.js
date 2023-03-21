import { View, Text, TextInput } from 'react-native'
import React, { useContext, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { UserContext } from '../../../contexts/UserContext/UserContext.js'
import NavbarPrimary from '../../../components/NavbarPrimary.js'
import ButtonPrimary from '../../../components/ButtonPrimary'

const ChangePasswordUpcomingEvents = () => {
  const navigation = useNavigation()
  const { user, setUser } = useContext(UserContext)
  const [newPassword, setNewPassword] = useState('')
  // console.log('CONTEXXXXXXXXXXXXXXXXXXXXXXTTTTTTTT', user)

  return (
    <View className="bg-secondary flex-1">
      <NavbarPrimary title='Cambiar contraseña' />

      <View className="flex-1 pl-4 pr-4 pb-4">
        <View className="flex-1">
        <Text className=" mt-4 mb-4 text-secondary">Nueva contraseña </Text>
          <View className="flex-row items-center space-x-2 pb-4 " >
                <TextInput
                secureTextEntry
                placeholder='Nueva contraseña'
                placeholderTextColor='#6D7D8D'
                keyboardType='default'
                // value={newUsername}
                name={newPassword}
                onChange={(text) => setNewPassword(text) }
                className="flex-row flex-1 space-x-2 bg-inputPrimary p-2 rounded"
                />
          </View>
          <Text className=" mt-4 mb-4 text-secondary">Confirmar nueva contraseña </Text>
          <View className="flex-row items-center space-x-2 pb-4 " >
                <TextInput
                secureTextEntry
                placeholderTextColor='#6D7D8D'
                placeholder='Confirmar nueva contraseña'
                keyboardType='default'
                // value={newUsername}
                name={newPassword}
                onChange={(text) => setNewPassword(text) }
                className="flex-row flex-1 space-x-2 bg-inputPrimary p-2 rounded"
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

export default ChangePasswordUpcomingEvents
