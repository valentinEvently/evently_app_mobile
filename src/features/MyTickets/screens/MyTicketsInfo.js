import { View, Text, ScrollView } from 'react-native'
import MyEventCardDetails from '../components/MyEventCardDetails'
import React, { useState, useEffect, useContext, useLayoutEffect } from 'react'
import { getEventsByUserIdAndEventId } from '../services/api'
import { UserContext } from '../../../contexts/UserContext/UserContext.js'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import NavbarPrimary from '../../../components/NavbarPrimary'

const MyTicketsInfo = ({ route }) => {
  const navigation = useNavigation()
  const { eventId, ticketId } = route.params
  // console.log('este es myEvent', eventId)
  const [events, setEvents] = useState(null)
  const { user, setUser } = useContext(UserContext)
  async function loadData () {
    try {
      const token = await AsyncStorage.getItem('@storage_Key')
      if (token !== null) {
        // value previously stored
        console.log('valor del token', token)

        const eventsById = await getEventsByUserIdAndEventId(user, ticketId, token)
        // console.log('esta es la data', eventsById)
        setEvents(eventsById)
      }
    } catch (e) {
      // error reading value
      console.log(e)
    } finally {
      // setLoading(false);
      // console.log('estos son LOS EVENTOS', events)
    }
  }
  useLayoutEffect(() => {
    navigation.addListener('focus', async () => {
      loadData()
    })
  }, [])

  return (
    <View className=" h-full pt-4 pb-4 bg-secondary">
      {/* <Text className="pl-4 bg-transparent text-xl font-bold text-secondary">Mis eventos</Text> */}
      <NavbarPrimary title='Mis tickets'/>
        <ScrollView
              contentContainerStyle={{
                paddingHorizontal: 15,
                paddingTop: 10,
                paddingBottom: 20
                // backgroundColor: 'yellow'
              }}
            horizontal
            showsHorizontalScrollIndicator={false}
        >
          { events !== null
            ? events.map((e,index) => <MyEventCardDetails key={index} myEvent={e} myEvents={events}/>)
            : ''
          }

        </ScrollView>
        <View className="flex-row pl-6 pr-6 justify-between">
          <Text className="text-darkGray text-md">Número de compra:</Text>
          {/* Todo: numero de compra hardcodeado */}
          {/* <Text className="font-bold text-gray text-md">{myEvent[0].id}</Text> */}
          <Text className="font-bold text-darkGray text-md">123sd4wewe45</Text>
        </View>
      </View>
  )
}

export default MyTicketsInfo
