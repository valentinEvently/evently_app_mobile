import { View, Text, TextInput, Alert, Button, Image, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import ButtonPrimary from '../../../components/ButtonPrimary'
import { LinearGradient } from 'expo-linear-gradient'
import { EMAIL_REGEX } from '../../../constants/constants'

const ResetPassword1Screen = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [errorEmail, setErrorEmail] = useState('')

  const createTwoButtonAlert = () =>
    Alert.alert(
      'Los datos que ingresaste tienen algún error',
      'Por favor, revísalos antes de volver a intentarlo.',
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
    return isError
  }

  async function handleSubmit (e) {
    e.preventDefault()
    const error = validateForm()
    if (!error) {
      navigation.navigate('ResetPassword2Screen', { email })
      // TODO: Aquí iría el código para enviar los datos del formulario al servidor
      // const data = await login(email, password)
      // TODO: Aca se verifica la respuesta
      // if (data.token === undefined) {
      //   navigation.navigate('ResetPassword2Screen')
      // } else {
      //   createTwoButtonAlert()
      // }
    }
    // console.log('esta es la password :)', email)
  }

  return (
    <View className="flex-1 bg-secondary">
      <ImageBackground resizeMode="cover" style={styles.background}
        source={require('../../../../assets/backgroundLogin.png')}>
        <LinearGradient
          colors={['rgba(0.8,8,0,41)', 'rgba(0.8,8,0,41)', 'transparent']}
          locations={[0, 0.5, 1]}
          className="w-full h-full justify-end rounded-t-xl p-6"
          >
            <View className=" flex-2 justify-center items-center">
        <View className="items-center pt-10 pb-5">
            <Image
                style={styles.logo}
                source={require('../../../../assets/LogoEvently.png')}
            />
        </View>

              </View>
      {/* Top */}
      <View className="flex-1 ">
        <Text className=" font-bold text-secondary text-lg pt-5 pb-2">Reestablecer contraseña</Text>
        <Text className=" text-secondary">Ingresá a continuación a tu correo electrónico y recibí las instrucciones para restablecer tu contraseña.</Text>
        <View className="flex-row items-center space-x-2 pb-2" >
                <TextInput
                placeholder='Email'
                placeholderTextColor='#6D7D8D'
                keyboardType='default'
                value={email}
                name={email}
                onChangeText={(text) => setEmail(text) }
                className="flex-row flex-1 space-x-2 bg-inputPrimary text-white p-2 rounded mt-4"
                />
                </View>
      {errorEmail && <Text className="text-tertiary">{errorEmail}</Text>}
      </View>

       {/* bottom */}
       <View className="flex-2 justify-end">
            <ButtonPrimary title='ENVIAR' onPress={e => handleSubmit(e)}/>
            <View className="flex-row justify-center m-6">
              <Text className="text-secondary text-sm pt-2">O volver a  </Text>
              <TouchableOpacity className="pt-2" onPress={() => { navigation.navigate('LoginScreen') }}><Text className="text-primary text-sm font-bold">Inicio de sesión</Text></TouchableOpacity>
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

export default ResetPassword1Screen
