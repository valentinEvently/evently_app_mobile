import { View, Text, TextInput, Button, TouchableOpacity, Image, ImageBackground, StyleSheet } from 'react-native'
import React from 'react'
import ButtonPrimary from '../../../components/ButtonPrimary'
import { LinearGradient } from 'expo-linear-gradient'

const ResetPassword4Screen = ({ navigation }) => {
  return (
    <View className="flex-1 bg-secondary">
      <ImageBackground resizeMode="cover" style={styles.background}
        source={require('../../../../assets/backgroundLogin.png')}>
        <LinearGradient
          colors={['rgba(0.8,8,0,41)', 'rgba(0.8,8,0,41)', 'transparent']}
          locations={[0, 0.5, 1]}
          className="w-full h-full justify-end rounded-t-xl p-6"
          >
      <View className="flex-1 justify-center">

      <View className=" h-1/3 justify-center items-center ">

<Image
    style={styles.logo}
    source={require('../../../../assets/LogoEvently.png')}
/>

      </View>
        <View className=" h-2/3 items-center">
                <Image
                style={styles.check}
                source={require('../../../../assets/check.png')}
                />
        <Text className="font-bold text-secondary text-lg pt-5 pb-2">Contraseña reestablecida correctamente</Text>
        <Text className="text-secondary text-base">Ahora puedes utilizar tu nueva contraseña para acceder a tu cuenta.</Text>
        </View>
      </View>

       {/* bottom */}
       <View className="flex-3 justify-end">
            <ButtonPrimary title='INICIAR SESIÓN' onPress={() => { navigation.navigate('LoginScreen') }}/>
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
  check: {
    width: 58,
    height: 43
  },
  background: {
    flex: 1,
    justifyContent: 'center'

  }

})
export default ResetPassword4Screen
