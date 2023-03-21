import { View, Text } from 'react-native'
import React from 'react'
import Lottie from 'lottie-react-native'

const Spinner = () => {
  return (
    <View className="flex-1 items-center p-6">
                      <Lottie
                      style={{ width: 30, height: 30 }}
                      source={require('../../assets/spinner.json')}
                      autoPlay
                      loop
                      />

            </View>
  )
}

export default Spinner
