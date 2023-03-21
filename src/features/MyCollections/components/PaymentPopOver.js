import { View, Text, TouchableOpacity, Button, ScrollView, Modal, StyleSheet, Image, TextInput } from 'react-native'
import React, { useState, useRef, useContext, useEffect } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native'
import { UserContext } from '../../../contexts/UserContext/UserContext'
// import { TokenContext } from '../../../contexts/TokenContext/TokenContext'
import ButtonPrimary from '../../../components/ButtonPrimary'

const PaymentPopOver = ({ onPress }) => {
  const [currentButton, setCurrentButton] = useState('Crypto')

  const handleSubmit = () => {
    refRBSheet.current.close()
  }

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
                   <TouchableOpacity className="ml-1 bg-inputGray rounded h-20 w-40 mt-5 items-center justify-center">
                       <View className="justify-center align-center">
                           <Image
                               style={styles.logo}
                               source={require('../../../../assets/polygonpay.png')}
                           />
                       </View>
                   </TouchableOpacity>

               </View>
               </View>
               {/* <View className="flex-row bg-white rounded w-full">
                       <TextInput
                       placeholderTextColor='#6D7D8D'
                       placeholder='Ingresar número de billetera'
                       keyboardType='default'
                       className="rounded bg-inputPrimary w-full p-2"
                       />
               </View> */}
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
    <>
    <View className="bg-inputPrimary">
          <View className="p-6 ">
           <View className="flex-row">
               <View>
                   <Text className=" text-white text-base">Elegí el método de pago</Text>
               </View>

           </View>

           <View className="mb-4 flex-row justify-around">

               {/* Tarjeta de credito */}
               <TouchableOpacity className={`h-24 flex-1 mt-5 mr-2 p-2 rounded items-center justify-center text-white ${currentButton === 'CreditCard' ? 'border-borderBottom border-solid border-2 bg-secondary' : 'bg-secondary'}`} onPress={() => setCurrentButton('CreditCard')}>
                   <View className="flex-1 justify-center align-center">
                       <MaterialCommunityIcons name="credit-card" size={22} color='#FFFFFF'/>
                   </View>
                   <Text className="flex-1 text-center text-white">Tarjeta de débito/crédito</Text>
               </TouchableOpacity>

               {/* Crypto */}
               <TouchableOpacity className={`h-24 flex-1 mt-5 p-2 ml-2 rounded items-center justify-center text-white ${currentButton === 'Crypto' ? 'border-borderBottom border-solid border-2 bg-secondary' : 'bg-secondary'}`} onPress={() => setCurrentButton('Crypto')}>
                   <View className="flex-1 justify-center align-center">
                       <FontAwesome name="dollar" size={22} color='#FFFFFF'/>
                   </View>
                   <Text className="flex-1 text-center text-white">Crypto</Text>
               </TouchableOpacity>

           </View>
           <ScrollView >

              {/* {currentButton === 'Crypto' && <Crypto />} */}
           </ScrollView>
           <ButtonPrimary title='Comprar'
            onPress={onPress}
           />
          </View>

    </View>

    </>
  )
}
const styles = StyleSheet.create({
  logo: {
    width: 156,
    height: 50
  }

})

export default PaymentPopOver
