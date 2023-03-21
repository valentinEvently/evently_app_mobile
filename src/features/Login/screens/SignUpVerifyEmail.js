import { View, Text, ImageBackground, TextInput, StyleSheet, Image, Alert } from 'react-native'
import React, { useState, useContext } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { signUp } from '../../../services/signUp'
import { login } from '../../../services/login'
import { UserContext } from '../../../contexts/UserContext/UserContext.js'
import ButtonPrimary from '../../../components/ButtonPrimary'
import { LinearGradient } from 'expo-linear-gradient'
import axios from 'axios'
import { URL } from '../../../constants/constants'
import ButtonSecondary from '../../../components/ButtonSecondary'
import { useNavigation } from '@react-navigation/native'

// import * as authService from '../../services/auth.service'

const SignUpVerifyEmail = (props) => {
  const navigation = useNavigation()
  const { route } = props
  const emailReset = route?.params?.email
  const password = route?.params?.password
  const [verificationCode, setVerificationCode] = useState('')
  const createTwoButtonAlert = () =>
    Alert.alert(
      'El código que ingresaste tienen algún error',
      'Por favor, revísalos antes de volver a intentarlo, ya que tu usuario y clave pueden bloquearse.',
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') }
      ]
    )

  async function handleSubmit (e) {
    e.preventDefault()
    const url = `${URL}/api/v1/users/verify_email`
    const _datos = {
      code: verificationCode.toUpperCase()
    }
    try {
      const response = await axios.post(url, _datos)
      const midata = response.status
      navigation.navigate('SignUpVerifyEmailOk')
      console.log('MIDATA', midata)
      // Aca debo logear
      return midata
    } catch (error) {
      console.log(error)
      createTwoButtonAlert()
    }
    // console.log('esto es lo que esta en el front', _datos)
  }

  return (
    <View className="flex-1 bg-secondary">
      <ImageBackground resizeMode="cover" style={styles.background}
        source={require('../../../../assets/backgroundLogin.png')}>
        <LinearGradient
          colors={['rgba(0.8,8,0,41)', 'rgba(0.8,8,0,41)', 'transparent']}
          locations={[0, 0.5, 1]}
          className="w-full h-full justify-top rounded-t-xl p-6"
          >
              <View className="flex-2 justify-center items-center">
                <View className="items-center pt-4 pb-5">
                 <Image
                    style={styles.logo}
                    source={require('../../../../assets/LogoEvently.png')}
                  />
              </View>

              </View>

               {/* bottom */}
               <View className="flex-1">
                    <Text className="text-lightGray text-lg mb-2">Verificá tu dirección de correo electrónico</Text>
                    <Text className="text-lightGray text-base">Te enviamos un código de verificación a {emailReset}</Text>
                    <View className="flex-row items-center space-x-2 pb-2 mt-8" >
                        <TextInput
                        maxLength={6}
                        placeholder='Codigo'
                        placeholderTextColor='#6D7D8D'
                keyboardType='default'
                value={verificationCode}
                name={verificationCode}
                onChangeText={(text) => setVerificationCode(text) }
                className="flex-row flex-1 space-x-2 bg-inputPrimary text-white p-2 rounded"
                        />
                    </View>

              </View>
              <View className="flex-2">
                    {/* <ButtonPrimary title='CONTINUAR' onPress={e => handleSubmit(e)}/> */}
                    <ButtonPrimary title='CONTINUAR.' onPress={() => navigation.navigate('SelectFavorites')}/>
                    <ButtonSecondary title='CANCELAR' onPress={() => navigation.goBack()}/>
                    <View className="flex-row justify-center ml-6 mr-6 mt-3">
                      <Text className="text-secondary text-sm pt-2">¿No recibiste el codigo?</Text>
                      <TouchableOpacity className="pt-2" ><Text className="text-primary text-sm font-bold"> Reenviar</Text></TouchableOpacity>
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

export default SignUpVerifyEmail
