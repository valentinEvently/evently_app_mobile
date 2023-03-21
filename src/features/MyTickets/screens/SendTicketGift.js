import { View, Text, TextInput, Button, ScrollView } from 'react-native'
import React from 'react'
import MyEvents from '../components/MyEvents'

const SendTicketGift = ({ route, navigation }) => {
  const { events, event } = route.params
  // console.log('*****MY EVENT', events)
  return (
    <View className="flex-colunm flex-1">
      <View className=" p-0 flex-1">
          <ScrollView>
            <MyEvents isCardSmall={true} events={events}/>
          </ScrollView>
        </View>

      <View className="pl-4 pr-4 pb-4 flex-1">
        <Text className="font-bold text-secondary text-lg">¿A quién le querés enviar los tickets?</Text>

                    <TextInput
                    placeholder='Email'
                    keyboardType='default'
                    className=" space-x-2 bg-slate-100 p-3 rounded-md mt-4"
                    />

                    <TextInput
                    placeholder='Confirmar email'
                    keyboardType='default'
                    className="space-x-2 bg-slate-100 p-3 rounded-md mt-4"
                    />

      </View>

      <View className="p-4 justify-end flex-2">
      <Button color="#F207A0" title="Enviar ticket" onPress={ () => { navigation.navigate('Enviar tickets aceptado') }} />
      </View>
    </View>
  )
}

export default SendTicketGift
