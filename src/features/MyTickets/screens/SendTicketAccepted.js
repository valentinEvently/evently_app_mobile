import { View, Text, TextInput, Button, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import ButtonPrimary from '../../../components/ButtonPrimary'
import Lottie from 'lottie-react-native'

const SendTicketAccepted = ({ navigation }) => {
  const [animationFinished, setAnimationFinished] = useState(false)
  const [flag, setFlag] = useState(true)

  const onAnimationFinish = () => {
    setAnimationFinished(true)
    setFlag(false)
  }
  return (
    <View className="p-6 flex-1 pt-20 bg-secondary">
      {flag
        ? <Lottie source={require('../../../../assets/mail2.json')}
        autoPlay
        speed={1}
        loop={false}
        onAnimationFinish={onAnimationFinish}
        style={{ flex: 1 }}/>
        : <View className="flex-1">
          <View className="flex-1 items-center justify-end">

<Image
  style={styles.check}
  source={require('../../../../assets/check.png')}
  />

<Text className="text-center font-bold text-white text-2xl pt-5 pb-2">¡Ya enviamos tu ticket!</Text>
<Text className="text-center text-lightGray text-md">Enviamos tu ticket a johndoe@gmail.com</Text>

<View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 999 }}>

<Lottie source={require('../../../../assets/confetti.json')}
autoPlay
speed={1}
loop={false}
onAnimationFinish={onAnimationFinish}
style={{ flex: 1 }}/>
</View>

</View>
<View className="flex-1 justify-center">
{/* <ButtonPrimary title="Volver a mis tickets" onPress={() => { navigation.navigate('Mis Tickets') }}/> */}
</View>
          </View>}

    </View>
  )
}
const styles = StyleSheet.create({
  check: {
    width: 58,
    height: 43
  }

})

export default SendTicketAccepted
