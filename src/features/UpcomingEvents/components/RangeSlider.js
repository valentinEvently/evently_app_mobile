import { View, Text, useLayoutEffect, TextInput } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import Slider from '@react-native-community/slider'

const RangeSlider = () => {
  return (
    <View className="mr-6 pt-4">
      <Text className="pl-2">Rango de Precio</Text>
                <View className="mr-7 mt-6 flex-row pr-2 pl-2 pb-1">
                  <View className="rounded flex-row flex-2 space-x-2 bg-white p-2 border-solid border gray-500 m-1 justify-center items-center">
                    <Text>ARS</Text>
                  </View>
                <TextInput
                placeholder='Desde'
                keyboardType='default'
                // value={password}
                // name={password}
                // onChangeText={(text) => setPassword(text) }
                className="rounded flex-row flex-1 space-x-2 bg-white p-2 border gray-500 m-1 justify-center items-center"
                />
                <TextInput
                placeholder='Hasta'
                keyboardType='default'
                // value={password}
                // name={password}
                // onChangeText={(text) => setPassword(text) }
                className="rounded flex-row flex-1 space-x-2 bg-white p-2 border gray-500 m-1 justify-center items-center"
                />

      </View>

    </View>
  )
}

export default RangeSlider
