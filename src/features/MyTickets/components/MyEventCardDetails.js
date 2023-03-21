/* eslint-disable no-unused-expressions */
import { Text, TextInput, Image, View, ImageBackground, Linking, Button, TouchableOpacity, Modal, Alert, Pressable, StyleSheet } from 'react-native'
import React, { useState, useRef } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import RBSheet from 'react-native-raw-bottom-sheet'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import { getDayNumber, getMonthAbbr } from '../services/api'
import ButtonPrimary from '../../../components/ButtonPrimary'

const WEB_PAGE_URL = 'https://etherscan.io/'
const formatTime = (string) => {
  return string.slice(0, 5)
}

const MyEventCardDetails = ({ myEvent, myEvents }) => {
  console.log('____???___???_____MYeVENTTTTTTT', myEvent)
  const navigation = useNavigation()
  const refRBSheet = useRef()
  const [sheetIsOpen, setSheetIsOpen] = useState(true)
  // console.log('myEventttttttttttttttttttttttttt', myEvent)
  const openLinkInBrowserHandler = () => {
    Linking.canOpenURL(WEB_PAGE_URL).then((supported) => {
      supported && Linking.openURL(WEB_PAGE_URL)
    })
  }
  // const [visible, setVisible] = useState(second)
  const [modalVisible, setModalVisible] = useState(false)

  return (
      <View className="h-full w-80 m-2 ">
        {/* Start ImageBackground */}
        <ImageBackground
        className="h-80"
         source={{ uri: myEvent.image }}
        // source={require('../../../../assets/chronos.png')}
        resizeMode="cover"
        imageStyle={{ borderTopRightRadius: 12, borderTopLeftRadius: 12, borderBottomLeftRadius: 12, borderBottomRightRadius: 12 }}
        >

        </ImageBackground>
        <View className=" m-2 rounded-xl  p-4 -mt-28" style={{
          backgroundColor: 'rgba(33, 25, 62, 0.9)',
          filter: 'blur(6px)'
        }}>
            <Text className="font-semibold text-white text-xl pb-2">{myEvent.name}</Text>
            <Text className=" text-lightGray text-xs pb-2">{getDayNumber(myEvent.date)} <Text>{getMonthAbbr(myEvent.date)}</Text> a las {myEvent.time && formatTime(myEvent.time)} hs</Text>
            <Text className=" text-lightGray text-xs">{myEvent.place}</Text>
            <Text className=" text-lightGray text-xs pb-2">{myEvent.address}, {myEvent.city}</Text>
            <Text className=" text-white text-lg pb-2">Ticket {myEvent.area}</Text>
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

            <TouchableOpacity className="" onPress={() => refRBSheet.current.open()}>
                <Ionicons name={'ellipsis-vertical'} size={20} color='#FFF'/>
            </TouchableOpacity>
            </View>

          </View>

        {/* Close ImageBackground */}

        {/* Start BodyCard */}

        {/* Close BodyCard */}

        {/* Start RBSheet */}
        <RBSheet
           ref={refRBSheet}
           closeOnDragDown={true}
           closeOnPressMask={false}
           customStyles={{
             wrapper: {
               backgroundColor: 'rgba(0, 0, 0, 0.6)'
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
           {/* <BuyPopOver eventId={eventId}/> */}
           {/* Aca comienza */}
           {sheetIsOpen === true
             ? <View className="p-6 bg-inputPrimary">
              {/* <TouchableOpacity className="p-2">
                  <Text className="text-lightGray text-lg">Añadir a mi colección</Text>
              </TouchableOpacity> */}
              <TouchableOpacity className="p-2" onPress={() => {
                setModalVisible(false),
                navigation.navigate('Agregar ticket al market', {
                  item: myEvent

                })
              }}>
                  <Text className="text-lightGray text-lg">Publicar en Marketplace</Text>
              </TouchableOpacity>

              <TouchableOpacity className="p-2" onPress={() => {
                setModalVisible(false),
                navigation.navigate('Devolver tickets', {
                  event: myEvent,
                  events: myEvents
                })
              }}
              >
              <Text className="text-lightGray text-lg">Devolver</Text>
              </TouchableOpacity>

              <TouchableOpacity className="p-2" onPress={() => setSheetIsOpen(false)}>
                  <Text className="text-lightGray text-lg">Enviar como regalo</Text>
              </TouchableOpacity>
               </View>
             : <View className="p-6">
                <View className="flex-row">
                  <View className="flex-1">
                      <Text className="font-semibold text-white text-lg p-2">Enviar ticket de regalo a:</Text>

                  </View>
                  <TouchableOpacity className="items-center justify-center" onPress={() => {
                    refRBSheet.current.close()
                    setSheetIsOpen(true)
                  }}>
                      <Ionicons name="close-circle-sharp" size={26} color='#98ABC0'/>
                  </TouchableOpacity>
                </View>
                {/* Start Inputs */}
                <View className="pt-2 pb-3">
                  <View className="flex-row items-center space-x-2 pb-2" >
                    <TextInput
                    placeholder='Email'
                    keyboardType='default'
                    placeholderTextColor='#6D7D8D'
                    className="flex-row flex-1 space-x-2 p-3 rounded-md bg-secondary"
                    />
                  </View>
                  <View className="flex-row items-center space-x-2 pb-2" >
                    <TextInput
                    placeholder='Teléfono'
                    keyboardType='default'
                    placeholderTextColor='#6D7D8D'
                    className="flex-row flex-1 space-x-2 p-3 rounded-md bg-secondary"
                    />
                  </View>
                </View>
                {/* Close Inputs */}
                <ButtonPrimary title="Enviar" onPress={ () => {
                  setModalVisible(false),
                  navigation.navigate('Enviar tickets aceptado')
                }}/>
              </View>}

           {/* Aca termina */}
       </RBSheet>
        {/* Close RBSheet */}

    </View>
  )
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)'
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  buttonView: {
    marginRight: 20,
    marginLeft: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 18,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: '#F194FF'
  },
  buttonClose: {
    backgroundColor: '#2196F3'
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center'
  }
})

export default MyEventCardDetails
