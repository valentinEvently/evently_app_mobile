/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { View, Button, Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { addToCart } from '../../../redux/features/cartSlice'
import Entypo from 'react-native-vector-icons/Entypo'
import { useNavigation } from '@react-navigation/native'
import ButtonPrimary from '../../../components/ButtonPrimary'

const SelectQuantity = (props) => {
  const navigation = useNavigation()
  const { route } = props
  const typeSection = route?.params?.section
  console.log('tipo de seccion', typeSection)
  const [numTickets, setNumTickets] = useState(1)
  const dispatch = useDispatch()
  const event = useSelector((state) => state.event)
  const cart = useSelector((state) => state.cart)
  useEffect(() => {
    // console.log('secciones', dataSections[0].sections)
    console.log('cart', cart)
  }, [])

  return (
    <View className="bg-secondary flex-1">
      <View className="flex-1">
      <View className="flex-2 pt-4 pl-4">
         <View className="items-center h-8   justify-center">
           <Text className="font-bold text-white text-sm">Seleccionar tickets</Text>
         </View>
         <View className="h-8 justify-center -mt-8">
           <TouchableOpacity onPress={() => navigation.goBack()}>
             <Text className="text-white">Cancelar</Text>
           </TouchableOpacity>
         </View>
       </View>
        <View className="flex-row p-6">
             <View className="flex-1">
                 <Text className="font-bold text-secondary text-md p-2">Número de tickets</Text>
             </View>
             <View className="items-center justify-center flex-row">
                <TouchableOpacity onPress={() => { if (numTickets > 1) { setNumTickets(numTickets - 1) } }}>
                    <Entypo name="squared-minus" size={26} color='#F207A0' />
                </TouchableOpacity>
                    <Text className="p-2 text-white">{numTickets}</Text>
                <TouchableOpacity onPress={() => { if (numTickets < (typeSection ? typeSection.max_per_order : 6)) { setNumTickets(numTickets + 1) } }}>
                    <Entypo name="squared-plus" size={26} color='#F207A0'/>
                </TouchableOpacity>
            </View>

        </View>
      </View>
      <View className="flex-2 m-6">
            <ButtonPrimary color="#F207A0" title="AGREGAR AL CARRITO" onPress={() => {
              dispatch(addToCart(typeSection))
              navigation.navigate('Finalizar compra', {
                numTickets,
                eventId: event.id,
                section: typeSection,
                event
              })
            }}/>
      </View>
    </View>
  )
}

export default SelectQuantity
