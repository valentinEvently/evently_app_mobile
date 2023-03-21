import { View, Text, ImageBackground, TouchableOpacity, TextInput, Input, Button, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import RangeSlider from '../components/RangeSlider'
import ButtonPrimary from '../../../components/ButtonPrimary'
import ButtonSecondary from '../../../components/ButtonSecondary'
import { AddingTicketToMarketPlace, getDayNumber, getMonthAbbr } from '../services/api'
import { ScrollView } from 'react-native-gesture-handler'
import NavbarPrimary from '../../../components/NavbarPrimary'
import axios from 'axios'
import { URL } from '../../../constants/constants'
import SmallModal from '../../../components/SmallModal'

const UpdateTicketToMarketPlace = (props) => {
  const [numTickets, setNumTickets] = useState(1)
  const [ticketsAvailableToSell, setTicketsAvailableToSell] = useState(null)
  const navigation = useNavigation()
  const { route } = props
  const ticket = route?.params?.item
  console.log('____ticket', ticket)
  const events = route?.params?.events
  const [amount, setAmount] = useState(0)
  const [errorAmount, setErrorAmount] = useState('')
  const [resell, setResell] = useState(null)

  useEffect(() => {
    if (ticket.resale === true) {
      setResell(true)
    } else {
      setResell(false)
    }
  }, [])

  const formatTime = (string) => {
    return string.slice(0, 5)
  }

  // const validateForm = () => {
  //   let isError = false

  //   if (amount > ticket.price * 5 || amount < 1) {
  //     isError = true
  //     setErrorAmount('El monto no está entre los rangos')
  //   } else {
  //     setErrorAmount('')
  //   }
  //   return isError
  // }

  async function handleSubmit (e) {
    // e.preventDefault()
    // console.log('amount', amount)
    // const error = validateForm()
    // if (!error) {
    //   const _id = ticket.id
    //   const _datos = {
    //     resale_price: amount
    //   }
    //   // console.log('esto es lo que esta en el front', _datos)
    //   try {
    //     const data = await AddingTicketToMarketPlace(_datos, _id)
    //     navigation.navigate('Agregar ticket a marketplace ok')
    //   } catch (error) {
    //     console.log(error)
    //   }
    // // const data = await signUp(_datos)
    // // setUser(data.user)
    // }
  }
  async function handleSubmitCancel (e) {
    e.preventDefault()
    console.log(`${URL}/api/v1/bookings/${ticket.id}?resale=${resell}`)

    // const url = `${URL}/api/v1/bookings/${ticket.id}?resale=${resell}`
    const url = `${URL}/api/v1/bookings/${ticket.id}?resale=false`
    const _datos = {
      resale_price: 60000
    }
    try {
      const { data } = await axios.put(url, _datos)
      // const midata = response.status
      navigation.navigate('Ticket collections', { renderModalRoute: true })
      console.log('MIDATA', data)
      // Aca debo logear
      return data
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View className="bg-secondary flex-1">
        <NavbarPrimary title='Mis coleccionables'/>
        <ScrollView className="p-6 flex-1">
        {/* open price resell */}
          <View className="flex-1 w-full">
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

            <View>

            </View>

            </View>
          </View>
        {/* close price resell */}
        {/* open Input */}

        {/* close Input */}
        <View className="flex-2 pb-10 pt-2">

<ButtonPrimary title="Modificar" onPress={() => navigation.navigate('ModifyTicketPriceToMarketPlace', { ticket })}/>
<ButtonSecondary title="CANCELAR REVENTA" onPress={e => handleSubmitCancel(e)}/>
</View>
        </ScrollView>

    </View>
  )
}

export default UpdateTicketToMarketPlace
