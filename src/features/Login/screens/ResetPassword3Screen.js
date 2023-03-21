import { View, Text, TextInput, Button, TouchableOpacity, Image, ImageBackground, StyleSheet, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import ButtonPrimary from '../../../components/ButtonPrimary'
import { LinearGradient } from 'expo-linear-gradient'
import { PASSWORD_REGEX } from '../../../constants/constants'
import Ionicons from 'react-native-vector-icons/Ionicons'

const ResetPassword3Screen = ({ navigation }) => {
  const [password, setPassword] = useState('')
  const [errorPassword, setErrorPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorConfirmPassword, setErrorConfirmPassword] = useState('')
  const [hidePassword, setHidePassword] = useState(true)
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true)

  const validateForm = () => {
    let isError = true
    if (!PASSWORD_REGEX.test(password.trim())) {
      setErrorPassword('La contraseña debe tener 6 o más carácteres')
      if (!PASSWORD_REGEX.test(confirmPassword.trim())) {
        setErrorConfirmPassword('La contraseña debe tener 6 o más carácteres')
      } else {
        setErrorConfirmPassword('')
      }
      isError = true
    }
    if (!PASSWORD_REGEX.test(confirmPassword.trim())) {
      setErrorConfirmPassword('La contraseña debe tener 6 o más carácteres')
      if (!PASSWORD_REGEX.test(password.trim())) {
        setErrorPassword('La contraseña debe tener 6 o más carácteres')
      } else {
        setErrorPassword('')
      }
      isError = true
    }
    if (PASSWORD_REGEX.test(password.trim()) && PASSWORD_REGEX.test(confirmPassword.trim())) {
      if (password !== confirmPassword) {
        isError = true
        setErrorPassword('')
        setErrorConfirmPassword('las passwords deben ser iguales')
      } else {
        isError = false
      }
    }

    return isError
  }

  async function handleSubmit (e) {
    e.preventDefault()
    const error = await validateForm()
    console.log('error', error)
    if (error === false) {
      navigation.navigate('ResetPassword4Screen')
      // Aquí iría el código para enviar los datos del formulario al servidor
    //   const data = await login(email, password)
    //   // console.log(' QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ____________________________esta es la daata', data)
    //   if (data.token !== undefined) {
    //     setUser(data.user)
    //     storeData(data.token)
    //     console.log('USERRRR', data.user)
    //   } else {
    //     // console.log('error Tus credenciales tienen algun error')
    //     createTwoButtonAlert()
    //   }
    // }
    // console.log('esta es la password :)', email)
    }
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

      <View className="flex-1">
      <View className=" h-1/4 justify-center items-center ">

          <Image
              style={styles.logo}
              source={require('../../../../assets/LogoEvently.png')}
          />

      </View>
      <View className="h-3/4">
        <Text className="font-bold text-secondary text-lg pt-5 pb-2">Ingresar nueva contraseña</Text>
        <Text className="text-secondary">Utiliza al menos seis caracteres, combinación de letras y números.</Text>
        <View className="pb-3 pt-3">
          <View className="flex-row items-center space-x-2 rounded bg-inputPrimary" >
                <TextInput
                secureTextEntry={hidePassword}
                placeholderTextColor='#6D7D8D'
                placeholder='Nueva Contraseña'
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
          <View className="pb-3">
          <View className="flex-row items-center space-x-2 rounded bg-inputPrimary" >
                <TextInput
                secureTextEntry={hideConfirmPassword}
                placeholderTextColor='#6D7D8D'
                placeholder='Repetir Contraseña'
                keyboardType='default'
                value={confirmPassword}
                name={confirmPassword}
                onChangeText={(text) => setConfirmPassword(text) }
                className="rounded flex-row flex-1 space-x-2 bg-inputPrimary p-2 text-white"
                />
                {confirmPassword.length > 0
                  ? <TouchableOpacity onPress={() => setHideConfirmPassword(!hideConfirmPassword)} className="p-2 justify-center items-center">
                    <Ionicons name={hideConfirmPassword ? 'eye-outline' : 'eye-off-outline'} size={16} color='#FFF'/>
                </TouchableOpacity>
                  : ''}
          </View>
          {errorConfirmPassword && <Text className="text-tertiary  ">{errorConfirmPassword}</Text>}
          </View>
          </View>
      </View>

       {/* bottom */}
       <View className="flex-3 justify-end">
            <ButtonPrimary title='REESTABLECER' onPress={e => handleSubmit(e)}/>
            <View className="flex-row justify-center ml-6 mt-3 mr-6">
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
export default ResetPassword3Screen
