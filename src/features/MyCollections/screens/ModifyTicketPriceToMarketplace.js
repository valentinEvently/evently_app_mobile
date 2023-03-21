import { View, Text, ImageBackground, TouchableOpacity, TextInput, Input, Button, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import RangeSlider from '../components/RangeSlider'
import ButtonPrimary from '../../../components/ButtonPrimary'
import { AddingTicketToMarketPlace, getDayNumber, getMonthAbbr } from '../services/api'
import { ScrollView } from 'react-native-gesture-handler'
import NavbarPrimary from '../../../components/NavbarPrimary'

const AddTicketToMarketPlace = (props) => {
  const [numTickets, setNumTickets] = useState(1)
  const [ticketsAvailableToSell, setTicketsAvailableToSell] = useState(null)
  const navigation = useNavigation()
  const { route } = props
  const ticket = route?.params?.ticket
  console.log('____ticket', ticket)
  const [amount, setAmount] = useState(0)
  const [errorAmount, setErrorAmount] = useState('')
  const formatTime = (string) => {
    return string.slice(0, 5)
  }

  const validateForm = () => {
    let isError = false

    if (isNaN(amount) === true || amount > ticket.price * 5 || amount < 1) {
      isError = true
      setErrorAmount('El monto no está entre los rangos o no es un número')
    } else {
      setErrorAmount('')
    }

    return isError
  }

  async function handleSubmit (e) {
    e.preventDefault()
    console.log('amount', amount)
    const error = validateForm()
    if (!error) {
      const _id = ticket.id
      const _datos = {
        resale_price: amount
      }
      // console.log('esto es lo que esta en el front', _datos)
      try {
        const data = await AddingTicketToMarketPlace(_datos, _id)
        navigation.navigate('Agregar ticket a marketplace ok')
      } catch (error) {
        console.log(error)
      }
    // const data = await signUp(_datos)
    // setUser(data.user)
    }
  }

  return (
    <View className="bg-secondary flex-1">
        <NavbarPrimary title='Modificar ticket en marketplace'/>
        <ScrollView className="p-6 flex-1">
        {/* open price resell */}
          <View className="h-80 w-full">
            <ImageBackground
            className="h-80"
             source={{ uri: ticket.image }}
            resizeMode="cover"
            imageStyle={{ borderTopRightRadius: 12, borderTopLeftRadius: 12, borderBottomLeftRadius: 12, borderBottomRightRadius: 12 }}
            >

            </ImageBackground>
            <View className=" m-2 rounded-xl  p-4 -mt-28" style={{
              backgroundColor: 'rgba(33, 25, 62, 0.9)',
              filter: 'blur(6px)'
            }}>
            <Text className="font-semibold text-white text-xl pb-2">{ticket.name}</Text>
            <Text className=" text-lightGray text-xs pb-2">{getDayNumber(ticket.date)} <Text>{getMonthAbbr(ticket.date)}</Text> a las {ticket.time && formatTime(ticket.time)} hs</Text>
            <Text className=" text-lightGray text-xs">{ticket.place}</Text>
            <Text className=" text-lightGray text-xs pb-2">{ticket.address}, {ticket.city}</Text>
            <Text className=" text-white text-lg pb-2">Ticket {ticket.area}</Text>
            <View className="flex-row">
            <View className="flex-1 pr-2">
                    <Text className="text-white text-sm pb-2">Tu ticket se activará en el momento del evento.</Text>
            </View>
            <View className=" flex-1 justify-center items-end rounded-md">
                <Image source={require('../../../../assets/qr.png')}
                    className="h-20 w-20 rounded-md"
                />
            </View>
            </View>
            <View>

            </View>

            </View>
          </View>
        {/* close price resell */}
        {/* open Input */}

        {/* close Input */}

        <View className="pt-6 mt-28 pb-10">
          <View className="pb-4 pt-4" >
                <Text className="font-semibold text-lightGray pb-2">Precio de publicación en Marketplace</Text>
                <TextInput
                placeholder={`Min $1  - Max $${ticket.price * 5}`}
                placeholderTextColor='#6D7D8D'
                keyboardType='default'
                value={amount}
                name={amount}
                onChangeText={(text) => setAmount(text) }
                className="w-full flex-1 space-x-2 bg-inputPrimary text-white p-2 rounded"
                />
                {errorAmount && <Text className="text-tertiary">{errorAmount}</Text>}
          </View>
          <ButtonPrimary title="ACTUALIZAR" onPress={e => handleSubmit(e)}/>
        </View>
        </ScrollView>
    </View>
  )
}

export default AddTicketToMarketPlace
