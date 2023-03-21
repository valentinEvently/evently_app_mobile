import { View, Text, Button, StatusBar, TextInput, Alert, StyleSheet, Image, ImageBackground } from 'react-native'
import React, { useState, useContext } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { UserContext } from '../../contexts/UserContext/UserContext.js'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { EMAIL_REGEX, PASSWORD_REGEX } from '../../constants/constants.js'

import { login } from '../../services/login'
import ButtonPrimary from '../../components/ButtonPrimary.js'
import { LinearGradient } from 'expo-linear-gradient'
// import * as authService from '../services/auth.service'
// import useAuth from '../../../hooks/useAuth';

const LoginScreen = ({ navigation }) => {
  // const [name, setName] = useState('')
  const { user, setUser } = useContext(UserContext)

  const [email, setEmail] = useState('')
  const [errorEmail, setErrorEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorPassword, setErrorPassword] = useState('')
  const [hidePassword, setHidePassword] = useState(true)

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@storage_Key', value)
    } catch (e) {
      // saving error
    }
  }

  const createTwoButtonAlert = () =>
    Alert.alert(
      'Los datos que ingresaste tienen algún error',
      'Por favor, revísalos antes de volver a intentarlo, ya que tu usuario y clave pueden bloquearse.',
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') }
      ]
    )

  const validateForm = () => {
    let isError = false

    if (!EMAIL_REGEX.test(email.trim())) {
      isError = true
      setErrorEmail('El email es inválido')
    } else {
      setErrorEmail('')
    }
    if (!PASSWORD_REGEX.test(password.trim())) {
      isError = true
      setErrorPassword('La contraseña debe tener 6 o más carácteres')
    } else {
      setErrorPassword('')
    }

    return isError
  }

  async function handleSubmit (e) {
    e.preventDefault()
    const error = validateForm()
    if (!error) {
      // Aquí iría el código para enviar los datos del formulario al servidor
      const data = await login(email, password)
      // console.log(' QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ____________________________esta es la daata', data)
      if (data.token !== undefined) {
        setUser(data.user)
        storeData(data.token)
        console.log('USERRRR', data.user)
      } else {
        // console.log('error Tus credenciales tienen algun error')
        createTwoButtonAlert()
      }
    }
    // console.log('esta es la password :)', email)
  }

  return (
    <View className="flex-1 bg-secondary" >
            <StatusBar barStyle="default" />

      <ImageBackground resizeMode="cover" style={styles.background}
        source={require('../../../assets/backgroundLogin.png')}>
        <LinearGradient
          colors={['rgba(0.8,8,0,41)', 'rgba(0.8,8,0,41)', 'transparent']}
          locations={[0, 0.5, 1]}
          className="w-full h-full justify-end rounded-t-xl p-6"
          >

      <View className=" h-1/3 justify-center items-center">
        <View className="items-center pt-10 pb-5">
            <Image
                style={styles.logo}
                source={require('../../../assets/LogoEvently.png')}
            />
        </View>
      </View>

       {/* bottom */}
       <View className=" h-2/3 justify-between">
        <View className="flex-1">
        <View className="flex-1">
          <ScrollView className="flex-1">

          <View className="pb-6">
          <View className="flex-row items-center space-x-2 pb-2" >
                <TextInput
                placeholder='Email'
                placeholderTextColor='#6D7D8D'
                keyboardType='default'
                value={email}
                name={email}
                onChangeText={(text) => setEmail(text) }
                className="flex-row flex-1 space-x-2 bg-inputPrimary text-white p-2 rounded"
                />
          </View>
          {errorEmail && <Text className="text-tertiary">{errorEmail}</Text>}
          </View>
          <View>
          <View className="flex-row items-center space-x-2  bg-inputPrimary rounded justify-center" >
                <TextInput
                secureTextEntry={hidePassword}
                placeholderTextColor='#6D7D8D'
                placeholder='Contraseña'
                keyboardType='default'
                value={password}
                name={password}
                onChangeText={(text) => setPassword(text) }
                className="rounded flex-row flex-1 space-x-2 bg-inputPrimary p-2 text-white"
                />
                {password.length > 0
                  ? <TouchableOpacity onPress={() => setHidePassword(!hidePassword)} className="p-2 justify-center items-center">
                    <Ionicons name={hidePassword ? 'eye-outline' : 'eye-off-outline'} size={16} color='#FFF'/>
                </TouchableOpacity>
                  : ''}

          </View>
          {errorPassword && <Text className="text-tertiary  ">{errorPassword}</Text>}
          </View>

          <TouchableOpacity className="mb-4" onPress={() => { navigation.navigate('ResetPassword1Screen') }}>
              <Text className="font-bold text-secondary text-md pt-2 pb-2 pr-2">¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
          </ScrollView>
          <View className="flex-2">

          <ButtonPrimary title='INGRESAR' onPress={e => handleSubmit(e)}/>
          </View>
        </View>

          <View className="items-center mt-2 flex-2 pt-4 pr-4 pl-4">
            <View className="flex-row">
              <Text className="text-secondary text-md pt-2">¿No tenés cuenta? </Text>
              <TouchableOpacity className="pt-2" onPress={() => { navigation.navigate('SignUpScreen') }}><Text className="text-primary font-bold">Registrate</Text></TouchableOpacity>
            </View>
          </View>

       </View>
       </View>

       </LinearGradient>
      </ImageBackground>
    </View>
  )
}
const styles = StyleSheet.create({
  logo: {
    width: 127,
    height: 50
  },
  background: {
    flex: 1,
    justifyContent: 'center'

  }

})

export default LoginScreen
