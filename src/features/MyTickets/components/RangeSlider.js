import { View, Text, useLayoutEffect, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import Slider from '@react-native-community/slider'

const RangeSlider = ({ price }) => {
  const [value, setValue] = useState(null)
  const [inputValue, setInputValue] = useState('')

  const handleInputChange = (text) => {
    setInputValue(text)
    setValue(text)
  }
  useEffect(() => {
    setValue(price)
  }, [])
  return (
    <View className="pl-6 pr-6 pt-2">
          <View className="bg-white rounded-md p-4 mb-4">
            <View>
              <Text className="font-bold text-secondary text-md p-2">Seleccionar precio de venta en Marketplace</Text>

            </View>
            <Text className=" font-bold text-tertiary text-lg pt-4 text-center">{value} ARS</Text>
            <View className="flex-row items-center space-x-2 pb-2" >
                <TextInput
                placeholder='Email'
                placeholderTextColor='#6D7D8D'
                keyboardType='default'
                value={inputValue}
                onChangeText={handleInputChange}
                name={value}
                className="flex-row flex-1 space-x-2 bg-inputPrimary text-white p-2 rounded"
                />
            </View>
          </View>

    </View>
  )
}

export default RangeSlider
