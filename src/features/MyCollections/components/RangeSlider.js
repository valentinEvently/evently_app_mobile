import { View, Text, useLayoutEffect } from 'react-native'
import React, { useState, useEffect } from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import Slider from '@react-native-community/slider'

const RangeSlider = ({ price }) => {
  const [value, setValue] = useState(null)
  useEffect(() => {
    setValue(price)
  }, [])
  return (
    <View className="pl-6 pr-6 pt-2">
          <View className="bg-white rounded-md p-4 mb-4">
            <View>
              <Text className="font-bold text-secondary text-md p-2">Seleccionar precio de venta</Text>

            </View>
            <View className="flex-row pt-4">
            <Text className=" text-tertiary text-md pl-2 flex-2">0 ARS</Text>
            { value !== null
              ? <Slider

              value={price}
              onValueChange={(e) => setValue(e)}
              step={1}
              trackStyle={{ height: 80 }}
                style={{ flex: 1, height: 'auto' }}
                minimumValue={0}
                maximumValue={price * 5}
                minimumTrackTintColor="#F207A0"
                maximumTrackTintColor="#000"
                thumbTintColor="#F207A0"

              />
              : ''
              }
              <Text className=" text-tertiary text-md pl-1 flex-2">{price * 5} ARS</Text>

            </View>

              <Text className=" font-bold text-tertiary text-lg pt-4 text-center">{value} ARS</Text>
              {/* <View className="flex-row justify-between pl-2 pr-2">
                <Text className="font-bold text-tertiary text-md">0 ARS</Text>
                <Text className="font-bold text-tertiary text-md">100 ARS</Text>

              </View> */}

          </View>

    </View>
  )
}

export default RangeSlider
