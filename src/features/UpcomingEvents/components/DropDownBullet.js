import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'

const DropDownBullet = ({ title, text }) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }
  return (
    <View className="bg-inputPrimary ml-4 mr-4 mb-4 rounded ">
        <View className="flex-row items-center p-4">
                    <View className="flex-1">

                    <Text className="text-white text-base font-semibold">{title}</Text>
                    </View>
                    <TouchableOpacity className="flex-2 pl-2" onPress={toggleOpen}>
                    <AntDesign name={isOpen ? 'up' : 'down'} size={22} color='#FFFFFF'/>
                    </TouchableOpacity>

        </View>
        {
            isOpen
              ? <View className="h-18 pl-4 pr-4 pb-4 rounded">
                <Text className="text-lightGray">{text}</Text>

                </View>
              : ''
        }

    </View>
  )
}

export default DropDownBullet
