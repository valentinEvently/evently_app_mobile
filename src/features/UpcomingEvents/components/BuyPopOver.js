import { View, Text, TouchableOpacity, Button } from 'react-native'
import React, { useState, useEffect } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import { useNavigation } from '@react-navigation/native'
import { selectEvent } from '../../../redux/features/ticketSlice.js'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../../redux/features/cartSlice'

const BuyPopOver = ({ eventId }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [section, setSection] = useState(true)
  const dataSections = useSelector((state) => state.ticket.sections)
  // console.log('dataSections', dataSections)
  const [typeSection, setTypeSection] = useState('')
  return (
    <>
    {section && dataSections
      ? <View className="p-6 ">
    <View className="flex-row">
        <View className="flex-1">
            <Text className="font-bold">Filtrar por: <Text className="text-primary">Precio<Ionicons name="ios-chevron-down-sharp" size={18} color='#F207A0'/></Text></Text>
        </View>
        <View className="flex-1 items-end">
            <Ionicons name="md-options" size={22} color='#6D7D8D'/>
        </View>
    </View>

    {/* Tipos de tickets */}
     {
              dataSections.map((e) => <View key={e?.id} className="flex-row grid border-slate-100 border-solid border-b-2">

              <View className="flex-2  p-2"><View className="pt-2 pb-2 pl-3 pr-3 rounded-md border-slate-200 border-solid border-2">{e.name}<Text className="text-primary font-bold
                  ">{e.price}</Text></View></View>
                  <View className="flex-1 text-md justify-center"><Text className="font-bold">{e?.description}</Text></View>
                  <TouchableOpacity className="flex-2 ml-3 justify-center" onPress={() => {
                    setSection(false)
                    setTypeSection(e)
                  }}>
                        <Ionicons name="md-chevron-forward-sharp" size={22} color='#F207A0'/>
                  </TouchableOpacity>
              </View>)
    }

</View>
      : <View className="p-6">
          <View className="flex-row">
            <View className="flex-1">
                <Text className="font-bold text-secondary text-lg p-2">{typeSection?.description}</Text>
            </View>
            <TouchableOpacity className="items-center justify-center" onPress={() => {
              setSection(true)
            }}>
                <Ionicons name="close-circle-sharp" size={26} color='#98ABC0'/>
            </TouchableOpacity>
          </View>
          <View className="flex-row">
            <View className="flex-1">
                <Text className="font-bold text-secondary text-md p-2">Número de tickets</Text>
            </View>
            <View className="items-center justify-center flex-row">
                <TouchableOpacity>
                    <Entypo name="squared-minus" size={26} color='#F207A0' />
                </TouchableOpacity>
                    <Text className="p-2">1</Text>
                <TouchableOpacity>
                    <Entypo name="squared-plus" size={26} color='#F207A0'/>
                </TouchableOpacity>
            </View>
          </View>
          <View className="mt-4">
            <Button color="#F207A0" title="Agregar al carrito" onPress={() => {
              dispatch(addToCart(typeSection))
              setSection(true)
              navigation.navigate('Finalizar compra', {
                /* Todo:
                 --Agregar al carrito el ticket con los datos del evento y la cantidad
                 typeSection

                 */
                eventId,
                ticketId: typeSection?.id
              })
            }}/>
          </View>
        </View>
    }

    </>
  )
}

export default BuyPopOver
