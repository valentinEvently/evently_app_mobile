import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet, Button } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import ButtonPrimary from '../../../components/ButtonPrimary'
import { ScrollView } from 'react-native-gesture-handler'
import NavbarPrimary from '../../../components/NavbarPrimary'

const PaymentMyCollections = (props) => {
  const { route } = props
  const ticket = route?.params?.ticket
  const navigation = useNavigation()
  const [currentButton, setCurrentButton] = useState('')
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
      <View className="bg-secondary flex-1">
          <NavbarPrimary title ='Pago' />
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
           <ButtonPrimary title='Comprar' onPress={() => navigation.navigate('DoneDealOk')}/>

          </View>
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

export default PaymentMyCollections
