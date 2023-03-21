import { View, Text, ScrollView } from 'react-native'
import React, { useLayoutEffect, useState, useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import Toggle from 'react-native-toggle-element'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MyEvents from './components/MyEvents.js'
import Header from './components/Header.js'
import { getEventsByUser } from './services/api.js'
import { UserContext } from '../../contexts/UserContext/UserContext.js'
import Spinner from '../../components/Spinner'

const MyTickets = () => {
  const navigation = useNavigation()
  const [toggleValue, setToggleValue] = useState(false)
  const [events, setEvents] = useState(null)
  const [upcomingEvents, setUpcomingEvents] = useState(null)
  const [pastEvents, setPastEvents] = useState(null)
  const { user, setUser } = useContext(UserContext)
  // const [tokenValue, setTokenValue] = useState('')
  const [loading, setloading] = useState(true)

  function dividirPorFecha (array) {
    // Obtener la fecha actual
    const hoy = new Date()
    // console.log('HOYYY', hoy)

    // Filtrar el array para obtener los elementos con fecha mayor a la actual
    const mayores = array.filter(function (elemento) {
      return Date.parse(elemento?.date) > Date?.parse(hoy)
    })

    // Filtrar el array para obtener los elementos con fecha menor a la actual
    const menores = array.filter(function (elemento) {
      return Date.parse(elemento?.date) < Date?.parse(hoy)
    })

    return {
      mayores,
      menores
    }
  }

  async function loadData () {
    try {
      const tokenValue = await AsyncStorage.getItem('@storage_Key')
      if (tokenValue !== null) {
        // value previously stored
        console.log('valor del token', tokenValue)
        // setTokenValue(value)
        // setLoading(true);
        const eventsById = await getEventsByUser(user, tokenValue)
        // console.log('____________________________________________________________000000000000000000000000000000000000000000000000000000000000000000000esta es la data', eventsById)
        // console.log('MAYORES-----------')
        const eventsByDate = await dividirPorFecha(eventsById)
        // console.log('MAYORESSSSSSSSSS-----------', eventsByDate.mayores)
        // console.log('MENORESSSSSSSSSS-----------', eventsByDate.menores)
        setUpcomingEvents(eventsByDate?.mayores)
        setPastEvents(eventsByDate?.menores)
        setEvents(eventsById)

        console.log('estos son LOS EVENTOS', events)
      }
    } catch (e) {
      // error reading value
      console.log(e)
    } finally {
      setloading(false)
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
    navigation.addListener('focus', async () => {
      loadData()
    })
  }, [])
  return (
    <View className="bg-secondary pt-4 flex-1">
      {/* Header */}
      <Header title='Mis tickets' />

      {/* Toggle button */}
      <View className="items-center p-2">
        <Toggle
        value={toggleValue}
        onPress={(val) => setToggleValue(val)}
        leftComponent={
          <Text className={toggleValue ? 'text-white' : 'text-white font-bold'}>Próximos</Text>
        }
        rightComponent={
          <Text className={toggleValue ? 'text-white font-bold' : 'text-white'}>Anteriores</Text>
        }
        trackBar={{
          width: 300,
          height: 50,
          radius: 25,
          activeBackgroundColor: '#2D2649',
          inActiveBackgroundColor: '#2D2649',
          borderActiveColor: '#2D2649',
          borderInActiveColor: '#2D2649',
          borderWidth: 6
        }}
        thumbButton={{
          width: 150,
          height: 50,
          radius: 30,
          margin: 20,
          padding: 20,
          activeBackgroundColor: '#080029',
          inActiveBackgroundColor: '#080029'

        }}
        />
      </View>

      {/* Component */}
      {
      toggleValue
        ? <View>
          {
          // (pastEvents !== null && pastEvents.length !== 0)
          //   ? (<ScrollView>
          //         <MyEvents title={'Eventos pasados'} height={80} width={60} events={pastEvents}/>
          //      </ScrollView>)
          //   : (
          //     <View className=" h-full items-center pt-20">
          //         <Text className="pl-10 pr-10 text-secondary font-bold text-xl text-center">No tenés eventos previos</Text>
          //     </View>
          //     )
          loading === true
            ? <Spinner />
            : (
                pastEvents?.length === 0
                  ? (
                     <View className=" h-full items-center pt-20">
                         <Text className="pl-10 pr-10 text-secondary font-bold text-xl text-center">No tenés eventos previos</Text>
                     </View>
                    )
                  : (<ScrollView>
                         <MyEvents title={'Eventos pasados'} height={80} width={60} events={pastEvents}/>
                      </ScrollView>)
              )
          }

        </View>
        : <View>
            {

          loading
            ? <Spinner />
            : (upcomingEvents !== null && upcomingEvents?.length !== 0)
                ? (
              <ScrollView>
                <MyEvents title={'Próximos eventos'} height={80} width={60} events={upcomingEvents}/>
              </ScrollView>
                  )
                : (
              <View className=" h-full items-center pt-20">
                <Text className="pl-10 pr-10 text-secondary font-bold text-xl text-center">No tenés eventos próximos</Text>
              </View>
                  )

          }
        </View>

      }

    </View>
  )
}

export default MyTickets
