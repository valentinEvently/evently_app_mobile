import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import ButtonPrimary from '../../../components/ButtonPrimary'
import Lottie from 'lottie-react-native'

const PaymentCheck = () => {
  const navigation = useNavigation()
  const [animationFinished, setAnimationFinished] = useState(false)
  const onAnimationFinish = () => {
    setAnimationFinished(true)
  }
  return (
    <View className="p-6 flex-1 pt-20 bg-secondary">
        <View className="flex-1 items-center justify-end">
          <Image
            style={styles.check}
            source={require('../../../../assets/check.png')}
          />
          <Text className="text-center font-bold text-white text-2xl pt-5 pb-2">¡Ya tenés tu ticket!</Text>
          <Text className="text-center text-secondary text-base pb-2">El pago fue procesado exitosamente</Text>
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
            <ButtonPrimary title="Volver a la home" onPress={() => { navigation.navigate('UpcomingEvents') }} />
       </View>
    </View>

  )
}

const styles = StyleSheet.create({
  check: {
    width: 58,
    height: 43
  }

})
export default PaymentCheck
