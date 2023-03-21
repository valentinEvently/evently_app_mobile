import { View, Text, TouchableOpacity, Modal, Image, TextInput, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import ButtonPrimary from '../../../components/ButtonPrimary'
import { ScrollView } from 'react-native-gesture-handler'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import WebView from 'react-native-webview'
import { useSelector } from 'react-redux'
import NavbarPrimary from '../../../components/NavbarPrimary'
import Lottie from 'lottie-react-native'

const PaymentUpcomingEvents = ({ route }) => {
  const { sectionId, numTickets } = route.params
  // console.log('sectionId', sectionId)
  // const ticket = useSelector((state) => state.ticket)
  const event = useSelector((state) => state.event)
  const cart = useSelector((state) => state.cart)
  const navigation = useNavigation()
  const [currentButton, setCurrentButton] = useState('Crypto')
  const [tokenValue, setTokenValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [webUrl, setWebUrl] = useState('')

  // const _datos = {

  //   // quantity: numTickets,
  //   // section_id: sectionId
  // }
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key')
      if (value !== null) {
        // value previously stored
        console.log('valor del token', value)
        setTokenValue(value)
      }
    } catch (e) {
      // error reading value
      console.log(e)
    }
  }

  const loginChronos = async () => {
    console.log('Me debo logear en Chronos')
    try {
      const response = await axios.post('https://sandbox.chronospay.io/api-test/api-business/auth/login?username=bryan_evently_testing&password=evently_test1')
      return response.data
    } catch (error) {
      setLoading(false)
      console.error(error)
      throw error
    }
  }

  // function getRandomNumber (min, max) {
  //   return Math.floor(Math.random() * (max - min + 1) + min)
  // }
  // const redirectToChronosPay = async (token) => {
  //   const numberId = getRandomNumber(1, 1000)
  //   const data = new FormData()
  //   data.append('amount', '1')
  //   data.append('description', event.description)
  //   data.append('currency', 'ARS')
  //   data.append('redirect_url', 'https://main--rainbow-dodol-560ae9.netlify.app/')
  //   data.append('days_available', '0')
  //   data.append('customer_internal_id', numberId)
  //   data.append('expiration_date', '2027-09-01 00:00:00')
  //   try {
  //     const response = await fetch('https://sandbox.chronospay.io/api-test/api-business/services/payment-links', {
  //       method: 'POST',
  //       headers: { 'access-token': token, 'Content-Type': 'multipart/form-data' },
  //       body: data
  //     })
  //     const responseData = await response.json()
  //     console.log('respuesta de chronos', responseData)
  //     return responseData.result
  //   } catch (error) {
  //     console.error(error)
  //     throw error
  //   }
  // }
  const redirectToChronosPay = async (token) => {
    const url = `${URL}/api/v1/bookings`
    const _datos = {
      section_id: sectionId,
      quantity: 2,
      isWeb: false
      // isCrypto: true
    }

    const { data } = await axios.post(url, _datos, { headers: { 'x-token': token } })

    return data
  }

  const generateTicket = async () => {
    try {
      for (const item of cart.items) {
        const _datos = {
          quantity: item.numTickets,
          section_id: item.sectionId
        }
        const response = await axios.post('https://nftminter-production-4518.up.railway.app/api/v1/bookings', _datos, { headers: { 'x-token': tokenValue } })
        console.log(response)
      }
    } catch (error) {
      setLoading(false)
      console.error(error)
      throw error
    } finally {
      navigation.navigate('PaymentCheck')
      setLoading(false)
    }
  }
  const openLinkInWebView = (url) => {
    console.log('url:', url)
    setWebUrl(url)
    // setWebUrl('https://main--rainbow-dodol-560ae9.netlify.app/')
    setLoading(false)
    setVisible(true)
  }

  async function handleSubmit (e) {
    e.preventDefault()
    try {
      setLoading(true)
      const { token } = await loginChronos()
      const { url } = await redirectToChronosPay(token)
      console.log('url despues de redirect')
      openLinkInWebView(url)
    } catch (error) {
      console.error(error)
    }
    // finally {
    //   setLoading(false)
    // }
  }

  const handleMessage = async (event) => {
    if (event.nativeEvent.data === 'back') {
      generateTicket()
    }
  }

  useEffect(() => {
    getData()
  }, [])
  const Crypto = () => {
    return (
           <View className="pb-6">
               <View>
               <Text className="font-semibold text-white text-base">Elegí un método de pago crypto:</Text>
               <View className="mb-3 pb-3 flex-row justify-between">
                   {/* Chronos Pay */}
                   <TouchableOpacity className="mr-1 border-solid bg-inputGray rounded flex-1 h-20 w-40 mt-5 items-center justify-center">
                       <View className="justify-center align-center">
                           <Image
                               style={styles.logoChronos}
                               source={require('../../../../assets/chronospay.png')}
                           />
                       </View>
                   </TouchableOpacity>

                   {/* Flow */}
                   <TouchableOpacity className="ml-1 bg-inputGray rounded flex-1 h-20 w-40 mt-5 items-center justify-center">
                       <View className="justify-center align-center">
                           <Image
                               style={styles.logo}
                               source={require('../../../../assets/polygonpay.png')}
                           />
                       </View>
                   </TouchableOpacity>

               </View>
               </View>
               <View className="flex-row bg-white rounded w-full">
                       <TextInput
                       placeholderTextColor='#6D7D8D'
                       placeholder='Ingresar número de billetera'
                       keyboardType='default'
                       className="rounded bg-inputPrimary w-full p-2"
                       />
               </View>
           </View>
    )
  }
  const DebitCard = () => {
    return (

      <View>
        <View className="pt-2 pb-2">
            <Text className="text-lightGray pb-2">Número de tarjeta</Text>
            <TextInput
            placeholderTextColor='#6D7D8D'
            placeholder='XXXX-XXXX-XXXX-XXX-XXXX'
            keyboardType='default'
            className="rounded bg-inputPrimary w-full p-2"
            />
        </View>
        <View className="pt-2 pb-2 flex-row">
          <View className="flex-1 pr-2">
                <Text className="text-lightGray pb-2">Fecha de expiración</Text>
                <TextInput
                placeholderTextColor='#6D7D8D'
                placeholder='mm/aa'
                keyboardType='default'
                className="rounded bg-inputPrimary w-full p-2"
                />
          </View>
          <View className="flex-1 pl-2">
                <Text className="text-lightGray pb-2">cvc</Text>
                <TextInput
                placeholderTextColor='#6D7D8D'
                placeholder='***'
                keyboardType='default'
                className="rounded bg-inputPrimary w-full p-2"
                />
          </View>
        </View>
        <View className="pt-2 pb-2">
            <Text className="text-lightGray pb-2">Nombre del titular</Text>
            <TextInput
            placeholderTextColor='#6D7D8D'
            placeholder='Nombre del titular'
            keyboardType='default'
            className="rounded bg-inputPrimary w-full p-2"
            />
        </View>
      </View>
    )
  }
  const CreditCard = () => {
    return (
      <View>
        <View className="pt-2 pb-2">
            <Text className="text-lightGray pb-2">Número de tarjeta</Text>
            <TextInput
            placeholderTextColor='#6D7D8D'
            placeholder='XXXX-XXXX-XXXX-XXX-XXXX'
            keyboardType='default'
            className="rounded bg-inputPrimary w-full p-2"
            />
        </View>
        <View className="pt-2 pb-2 flex-row">
          <View className="flex-1 pr-2">
                <Text className="text-lightGray pb-2">Fecha de expiración</Text>
                <TextInput
                placeholderTextColor='#6D7D8D'
                placeholder='mm/aa'
                keyboardType='default'
                className="rounded bg-inputPrimary w-full p-2"
                />
          </View>
          <View className="flex-1 pl-2">
                <Text className="text-lightGray pb-2">cvc</Text>
                <TextInput
                placeholderTextColor='#6D7D8D'
                placeholder='***'
                keyboardType='default'
                className="rounded bg-inputPrimary w-full p-2"
                />
          </View>
        </View>
        <View className="pt-2 pb-2">
            <Text className="text-lightGray pb-2">Nombre del titular</Text>
            <TextInput
            placeholderTextColor='#6D7D8D'
            placeholder='Nombre del titular'
            keyboardType='default'
            className="rounded bg-inputPrimary w-full p-2"
            />
        </View>
      </View>
    )
  }
  return (
    loading
      ? <View className="flex-1 bg-secondary justify-center items-center">

          <Lottie source={require('../../../../assets/loading2.json')} autoPlay loop/>
          <Text className="text-white font-lg font-semibold">Redireccionando a Chronos Pay....</Text>

        </View>
      : <View className="bg-secondary flex-1">
          <NavbarPrimary title='Pago'/>
          <View className="p-6 flex-1">
           <View className="flex-row">
               <View className="flex-1">
                   <Text className=" text-white text-base">Elegí el método de pago</Text>
               </View>

           </View>

           <View className="mb-4 flex-row justify-between">

               {/* Tarjeta de credito */}
               <TouchableOpacity className={`h-20 w-20 mt-5 rounded items-center justify-center ${currentButton === 'CreditCard' ? 'bg-primary' : 'bg-inputGray'}`} onPress={() => setCurrentButton('CreditCard')}>
                   <View className="flex-1 justify-center align-center">
                       <MaterialCommunityIcons name="credit-card" size={22} color='#595656'/>
                   </View>
                   <Text className="flex-1 text-center text-darkGray400">Tarjeta de crédito</Text>
               </TouchableOpacity>

               {/* Tarjeta de debito */}
               <TouchableOpacity className={`h-20 w-20 mt-5 rounded items-center justify-center ${currentButton === 'DebitCard' ? 'bg-primary' : 'bg-inputGray'}`} onPress={() => setCurrentButton('DebitCard')}>
                   <View className="flex-1 justify-center align-center">
                       <MaterialCommunityIcons name="credit-card-outline" size={22} color='#595656'/>
                   </View>
                   <Text className="flex-1 text-center text-darkGray400">Tarjeta de débito</Text>
               </TouchableOpacity>

               {/* Crypto */}
               <TouchableOpacity className={`h-20 w-20 mt-5 rounded items-center justify-center ${currentButton === 'Crypto' ? 'bg-primary' : 'bg-inputGray'}`} onPress={() => setCurrentButton('Crypto')}>
                   <View className="flex-1 justify-center align-center">
                       <FontAwesome name="dollar" size={22} color='#595656'/>
                   </View>
                   <Text className="flex-1 text-center text-darkGray400">Crypto</Text>
               </TouchableOpacity>

           </View>
           <ScrollView >

              {currentButton === 'CreditCard' && <CreditCard />}
              {currentButton === 'DebitCard' && <DebitCard />}
              {currentButton === 'Crypto' && <Crypto />}
           </ScrollView>
           <ButtonPrimary title='Comprar' onPress={handleSubmit}/>
          </View>
          <Modal
            visible={visible}
            transparent={true}
            animationType={'slide'}
            onRequestClose={() => setVisible(false)}
          >
              {/* <WebView source={{ uri: webUrl }} /> */}
              <WebView
              source={{ uri: webUrl }}
              onMessage={handleMessage}
              mixedContentMode="always"

            />
          </Modal>
    </View>
  )
}
const styles = StyleSheet.create({
  logo: {
    width: 124,
    height: 44
  },
  logoChronos: {
    width: 124,
    height: 31
  }

})

export default PaymentUpcomingEvents
