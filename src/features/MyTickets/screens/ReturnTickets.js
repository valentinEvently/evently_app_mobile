import { View, Text, TextInput, Button, ScrollView } from 'react-native'
import React from 'react'
import MyEvents from '../components/MyEvents'
import NavbarPrimary from '../../../components/NavbarPrimary'
import ButtonPrimary from '../../../components/ButtonPrimary'

const ReturnTickets = ({ route, navigation }) => {
  const { events, event } = route.params
  // console.log('*****MY EVENT', events)
  return (
    <View className="bg-secondary flex-1">
      <NavbarPrimary title='Devolver tickets' />
      <View className=" p-0 flex-1">
          <ScrollView>
            <MyEvents events={events}/>
          </ScrollView>
        </View>
      <View className="p-4 justify-end flex-2">
      {/* <Button color="#F207A0" title="Devolver tickets" onPress={ () => {
        navigation.navigate('Devolver tickets aceptado')
      }} /> */}
      <ButtonPrimary title='Devolver tickets' onPress={ () => {
        navigation.navigate('Devolver tickets aceptado')
      }}/>
      </View>
    </View>
  )
}

export default ReturnTickets
