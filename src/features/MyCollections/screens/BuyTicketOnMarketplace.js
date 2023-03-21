/* eslint-disable react/prop-types */
import React, { useEffect, useState, useRef } from 'react'
import { View, Text, Modal, ImageBackground, ScrollView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { URL } from '../../../constants/constants.js'
import RBSheet from 'react-native-raw-bottom-sheet'
import ButtonPrimary from '../../../components/ButtonPrimary'
import NavbarPrimary from '../../../components/NavbarPrimary.js'
import PaymentPopOver from '../components/PaymentPopOver'
import WebView from 'react-native-webview'
import Lottie from 'lottie-react-native'
import { formatTime, getDayNumber, getMonthAbbr, getYear } from '../services/api.js'
import { storeData, clearKeyAsyncStorage } from '../../../services/utils.js'

const BuyTicketOnMarketplace = (props) => {
  const refRBSheet = useRef()
  const navigation = useNavigation()
  const { route } = props
  const ticket = route?.params?.item
  const eventId = route?.params?.item.event_id
  const imageUrl = '' + URL + '/api/v1/events/' + eventId
  const [event, setEvent] = useState(null)
  const [open, setOpen] = useState(false)
  const [visible, setVisible] = useState(false)
  const [webUrl, setWebUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [tokenValue, setTokenValue] = useState('')

  async function loadData () {
    // console.log('inresa load data', imageUrl)

    try {
      // setLoading(true);
      // console.log('acaaa', imageUrl)
      const { data } = await axios.get(
        imageUrl

      )
      setEvent(data?.event)
    } catch (error) {
      console.error(error)
    } finally {
      // setLoading(false);
      // console.log('este', event)
    }
  }
  const onPress = () => {
    if (!open) {
      refRBSheet.current.open()
    } else {
      refRBSheet.current.close()
      handleSubmit()
    }
  }
  async function handleSubmit () {
    try {
      setLoading(true)
      const token = await AsyncStorage.getItem('@storage_Key')
      console.log('token', token)
      const { url, reference } = await redirectToChronosPay(token)
      storeData('@storage_reference_resell', reference)
      openLinkInWebView(url)
    } catch (error) {
      console.error(error)
    }
    // finally {
    //   setLoading(false)
    // }
  }

  const redirectToChronosPay = async (token) => {
    const url = `${URL}/api/v1/bookings/transfer`
    console.log('token id', ticket.token_id)
    const _datos = {
      token_id: ticket.token_id,
      isWeb: false,
      isCrypto: false
      // isCrypto: true
    }

    const { data } = await axios.post(url, _datos, { headers: { 'x-token': token } })
    console.log('lo que me devuelve', data)
    return data
  }
  const openLinkInWebView = (url) => {
    console.log('url:', url)
    setWebUrl(url)
    setLoading(false)
    setVisible(true)
  }
  // const generateTicket = async () => {
  //   try {
  //     const _datos = {
  //       token_id: 16
  //     }
  //     const url = `${URL}/api/v1/bookings/transfer`
  //     const response = await axios.post(url, _datos, { headers: { 'x-token': tokenValue } })
  //     console.log(response)
  //   } catch (error) {
  //     setLoading(false)
  //     console.error(error)
  //     throw error
  //   } finally {
  //     navigation.navigate('Agregar ticket a marketplace ok')
  //     setLoading(false)
  //   }
  // }
  async function checkPaymentStatus () {
    const referenceId = await AsyncStorage.getItem('@storage_reference_resell')

    try {
      const _datos = {
        reference: referenceId
      }
      const url = `${URL}/api/v1/bookings/check_payment`
      const response = await axios.post(url, _datos, { headers: { 'x-token': tokenValue } })
      console.log(response)
    } catch (error) {
      // setLoading(false)
      // clearKeyAsyncStorage('@storage_reference_resell')
      console.error(error)
      throw error
    } finally {
      // si responde que el pago fue correcto generar ticket
      // clearKeyAsyncStorage('@storage_reference_resell')
      navigation.navigate('PaymentCheck')
      // generateTicket()
      // setLoading(false)
    }
  }
  const handleMessage = async (event) => {
    if (event.nativeEvent.data === 'back') {
      await checkPaymentStatus()
      // generateTicket()
    }
  }
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

  useEffect(() => {
    if (eventId !== null) {
      loadData()
      getData()
    }
  }, [])
  return (
    <>
    { loading
      ? <View className="flex-1 bg-secondary ">
        <View className="flex-1 justify-end items-center pb-7">

            <Lottie source={require('../../../../assets/loading2.json')} autoPlay loop/>
        </View>
        <View className="flex-1 items-center">
          <Text className="text-white font-lg font-semibold">Redireccionando a Chronos Pay...</Text>

        </View>

        </View>
      : event !== null && eventId
        ? <View className="bg-secondary flex-1">
               <NavbarPrimary title='Comprar ticket' />
               <ScrollView className="h-full p-6">
               <ImageBackground
                   className="flex-1 w-full h-96 justify-end"
                   source={{ uri: ticket.image }}
                   resizeMode="cover"
                   imageStyle={{ borderRadius: 12 }}
                   >
                     <LinearGradient
                       colors={['rgba(0.2,0,0,1)', 'rgba(0.2,0,0,1)']}
                       className="p-4 m-2 justify-end rounded-xl"
                     >
                       <Text className="font-semibold text-white text-lg pb-2">{ticket?.name}</Text>
                       <View className="flex-row justify-between">
                          <Text className=" text-lightGray text-md"><Text>{getDayNumber(ticket?.date)} </Text><Text>{getMonthAbbr(ticket?.date)}</Text><Text> {getYear(ticket?.date)},</Text> {formatTime(ticket?.time)} hs</Text>
                          <Text className=" font-bold text-lightGray text-xl">$ {ticket?.price}</Text>
                       </View>
                       <View className="flex-row justify-between items-center">
                        <View className="flex-1">
                         <Text className=" text-lightGray text-md">{ticket?.address}, {ticket?.city}</Text>
                        </View>
                        <View className="flex-1 items-end">
                         <Text className=" font-bold text-lightGray text-xl">{ticket?.area}</Text>
                        </View>
                       </View>

                     </LinearGradient>
                   </ImageBackground>
                   <View>
                    <Text className="text-lg pt-4 text-lightGray">Descripción</Text>
                    <Text className="text-white pt-2 pb-4">{event?.description}</Text>
                    {/* <ButtonPrimary title="COMPRAR" onPress={() => navigation.navigate('PaymentMyCollections', { ticket })}/> */}
                    <ButtonPrimary title="COMPRAR" onPress={() => refRBSheet.current.open()}/>
                   </View>

               </ScrollView>

              {/* aca va rbsheet */}
              <RBSheet
                  ref={refRBSheet}
                  onOpen={() => setOpen(true)}
                  onClose={() => setOpen(false)}
                  closeOnDragDown={true}
                  closeOnPressMask={false}
                  customStyles={{
                    wrapper: {
                      backgroundColor: 'transparent'
                    },
                    draggableIcon: {
                      backgroundColor: '#98ABC0'
                    },
                    container: {
                      borderTopEndRadius: 22,
                      borderTopStartRadius: 22,
                      height: 'auto',
                      backgroundColor: '#2D2649'
                    }
                  }}
                >
                  <PaymentPopOver onPress={onPress}/>

                  {/* Aca termina */}
              </RBSheet>
              <Modal
            visible={visible}
            transparent={true}
            animationType={'slide'}
            onRequestClose={() => setVisible(false)}
          >

              <WebView
              source={{ uri: webUrl }}
              onMessage={handleMessage}
            />
      </Modal>
                 </View>
        : ''
    }
    </>

  )
}

export default BuyTicketOnMarketplace
