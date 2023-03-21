import { View, Text, ImageBackground, TextInput, StyleSheet, Image } from 'react-native'
import React, { useState, useContext } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { signUp } from '../../../services/signUp'
import { login } from '../../../services/login'
import { UserContext } from '../../../contexts/UserContext/UserContext.js'
import ButtonPrimary from '../../../components/ButtonPrimary'
import { LinearGradient } from 'expo-linear-gradient'
import Checkbox from 'expo-checkbox'

// import * as authService from '../../services/auth.service'

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorEmail, setErrorEmail] = useState('')
  const [errorName, setErrorName] = useState('')
  const [errorPassword, setErrorPassword] = useState('')
  const [errorCheck, setErrorCheck] = useState('')
  const [hidePassword, setHidePassword] = useState(true)
  const [isChecked, setIsChecked] = useState(false)

  const { user, setUser } = useContext(UserContext)

  // const nameRegex = /^[a-zA-Z]+$/
  // const nameRegex = /^.{2,4}$/
  // function handleName (text) {
  //   setName(text)
  // }
  const validateForm = () => {
    let isError = false

    if (name.trim() === '') {
      isError = true
      setErrorName('El nombre es obligatorio')
    } else {
      setErrorName('')
    }

    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!emailRegex.test(email.trim())) {
      isError = true
      setErrorEmail('El correo electrónico es inválido')
    } else {
      setErrorEmail('')
    }
    const passwordRegex = /^.{6,}$/
    if (!passwordRegex.test(password.trim())) {
      isError = true
      setErrorPassword('La contraseña debe tener 6 o más carácteres')
    } else {
      setErrorPassword('')
    }
    if (isChecked === false) {
      isError = true
      setErrorCheck('Debes aceptar los términos y condiciones')
    }

    return isError
  }

  async function handleSubmit (e) {
    e.preventDefault()
    const error = validateForm()
    if (!error) {
      const _datos = {
        full_name: name,
        email,
        password,
        role: 'costumer'
      }
      // console.log('esto es lo que esta en el front', _datos)
      try {
        const data = await signUp(_datos)
        navigation.navigate('SignUpVerifyEmail', { email, password })
      } catch (error) {
        console.log(error)
      }
      // const data = await signUp(_datos)
      // setUser(data.user)
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
              <View className=" flex-2 justify-center items-center">
                <View className="items-center pt-10 pb-10">
                 <Image
                    style={styles.logo}
                    source={require('../../../../assets/LogoEvently.png')}
                  />
              </View>

              </View>

               {/* bottom */}
               <View className="flex-1 justify-between">
        <ScrollView className="flex-1">
        <View className="pb-6">
          <View className="flex-row items-center space-x-2 pb-2" >
                <TextInput
                placeholder='Nombre'
                placeholderTextColor='#6D7D8D'
                keyboardType='default'
                value={name}
                name={name}
                onChangeText={(text) => setName(text) }
                className="flex-row flex-1 space-x-2 bg-inputPrimary text-white p-2 rounded"
                />
          </View>
          {errorName && <Text className="text-tertiary">{errorName}</Text>}

          </View>
        <View className="pb-6">
          <View className="flex-row items-center space-x-2 pb-2" >
                <TextInput
                placeholder='Email'
                placeholderTextColor='#6D7D8D'
                keyboardType='default'
                value={email}
                name={email}
                onChangeText={(text) => setEmail(text) }
                className="flex-row flex-1 space-x-2 bg-inputPrimary text-white p-2 rounded "
                />
          </View>
          {errorEmail && <Text className="text-tertiary">{errorEmail}</Text>}

          </View>
          <View className="pb-6 mb-3">
          <View className="flex-row items-center space-x-2 bg-inputPrimary rounded justify-center" >
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
          <View>
          <View className="flex-row pb-1">
          <Checkbox color='#FF69E1' value={isChecked} onValueChange={setIsChecked} />
          <View className="flex-row">
          <Text className="text-lightGray ml-2">He leído y acepto los </Text>
            <TouchableOpacity onPress={() => { navigation.navigate('TermScreen') }}>
            <Text className="text-primary font-semibold">términos y condiciones</Text></TouchableOpacity>

          </View>
          </View>
          {errorCheck && <Text className="text-tertiary">{errorCheck}</Text>}
          </View>

        </ScrollView>

          <ButtonPrimary title='COMENZAR' onPress={e => handleSubmit(e)}/>
          <View className="items-center mt-2 flex-2 p-4">

          <View className="flex-row">
            <Text className="text-secondary text-md pt-2">¿Ya tenés cuenta? </Text>
            <TouchableOpacity className="pt-2" onPress={() => { navigation.navigate('LoginScreen') }}><Text className="text-primary font-bold">Ingresá acá</Text></TouchableOpacity>
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

export default SignUpScreen
