import { View, Text, TextInput, Button, TouchableOpacity, Image, ImageBackground, StyleSheet } from 'react-native'
import React from 'react'
import ButtonPrimary from '../../../components/ButtonPrimary'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'

const ResetPassword2Screen = (props) => {
  const navigation = useNavigation()
  const { route } = props
  const emailReset = route?.params?.email
  return (
    <View className="flex-1 bg-secondary">
      <ImageBackground resizeMode="cover" style={styles.background}
        source={require('../../../../assets/backgroundLogin.png')}>
        <LinearGradient
          colors={['rgba(0.8,8,0,41)', 'rgba(0.8,8,0,41)', 'transparent']}
          locations={[0, 0.5, 1]}
          className="w-full h-full justify-end rounded-t-xl p-6"
          >
      <View className=" flex-1 justify-center items-center">
        <View className="items-center pt-10 pb-5">
            <Image
                style={styles.logo}
                source={require('../../../../assets/LogoEvently.png')}
            />
        </View>

              </View>
      <View className="flex-1 justify-start">
        <Text className="font-bold text-secondary text-lg pt-5 pb-2">Verificá tu correo electrónico</Text>
        <Text className="text-secondary text-base">Te hemos enviado las instrucciones a {emailReset}</Text>
      </View>

       {/* bottom */}
       <View className="flex-1 justify-end">
            <ButtonPrimary title='OK' onPress={() => { navigation.navigate('ResetPassword3Screen') }}/>

            <View className="flex-row justify-center m-6">
              <Text className="text-secondary text-sm pt-2">¿No recibiste el email?</Text>
              <TouchableOpacity className="pt-2" onPress={() => { navigation.navigate('SignUpScreen') }}><Text className="text-primary text-sm font-bold"> Reenviar email</Text></TouchableOpacity>
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
export default ResetPassword2Screen
