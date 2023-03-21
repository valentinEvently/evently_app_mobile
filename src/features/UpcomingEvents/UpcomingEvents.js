/* eslint-disable react/prop-types */
import { View, TextInput, ScrollView, Text, RefreshControl, FlatList, Button, TouchableOpacity, ImageBackground, StyleSheet, SafeAreaView } from 'react-native'
import React, { useLayoutEffect, useState, useRef, useEffect } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Header from './components/Header.js'
import { iterateArray, getEventsByMonth, getEvents, filterTicketsByMonths, getEventsFilterByMonth, getTickets, getMonthAbbr, getDayNumber, getYear, sortByUpcomingDate, sortByUpcomingDateFilter } from './services/api.js'
import RBSheet from 'react-native-raw-bottom-sheet'
import { useSelector, useDispatch } from 'react-redux'
import { addMonth, clear, addYear, addMinPrice, addMaxPrice } from '../../redux/features/filterEventsSlice'
import { arrayYears, arrayMonths } from '../../constants/constants'
import EventCard from './components/EventCard'
import Spinner from '../../components/Spinner.js'
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg'
import ButtonPrimary from '../../components/ButtonPrimary.js'
import { RecipeCard } from '../../AppStyles'
import { LinearGradient } from 'expo-linear-gradient'

const UpcomingEvents = ({ navigation }) => {
  const months = useSelector((state) => state.filterEvents.months)
  const years = useSelector((state) => state.filterEvents.years)
  const rangePrice = useSelector((state) => state.filterEvents.rangePrice)
  const dataFilter = useSelector((state) => state.filterEvents)
  const dispatch = useDispatch()
  const refRBSheet = useRef()
  const [searchTerm, setSearchTerm] = useState('')
  const [eventsFilter, setEventsFilter] = useState(null)
  const [ticketsData, setTicketsData] = useState(null)
  const [eventsByUser, setEventsByUser] = useState(null)
  const [ticketsByUser, setTicketsByUser] = useState(null)
  const [refreshing, setRefreshing] = useState(false)
  const [events, setEvents] = useState(null)
  const [selectedYears, setSelectedYears] = useState([])
  const [dataFilterArray, setDataFilterArray] = useState([])
  const [convertedData, setConvertedData] = useState([])
  const [selectedDate, setSelectedDate] = useState(new Date())

  const handleChange = async (text) => {
    setSearchTerm(text)
    const filteredEvents = await eventsByUser.filter((ticket) =>
      ticket.name.toLowerCase().includes(text.toLowerCase())
    )
    const filteredTickets = await ticketsByUser.filter((event) =>
      event.name.toLowerCase().includes(text.toLowerCase())
    )
    setEventsFilter(filteredEvents)
    setTicketsData(filteredTickets)
  }

  const handleFilterSubmit = () => {
    refRBSheet.current.close()
    console.log(months)
    if (months.length > 0 || years.length > 0) { loadFilterData(months) } else { loadData() }
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    loadData().then(() => setRefreshing(false))
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
    loadData()
  }, [])
  useEffect(() => {
    const convertData = async (data) => {
      const convertedData = []

      if (data.months && data.months.length > 0) {
        for (const month of data.months) {
          const monthName = await getMonthName(month)
          convertedData.push({ value: monthName, type: 'month', numberMonth: month })
        }
      }

      if (data.years && data.years.length > 0) {
        for (const year of data.years) {
          convertedData.push({ value: year, type: 'year' })
        }
      }

      if (data.rangePrice > 0) {
        if (data.rangePrice.minPrice !== undefined) {
          convertedData.push({ value: data.rangePrice.minPrice, type: 'minPrice' })
        }
        if (data.rangePrice.maxPrice !== undefined) {
          convertedData.push({ value: data.rangePrice.maxPrice, type: 'maxPrice' })
        }
      }

      return convertedData
    }

    const fetchData = async () => {
      const newConvertedData = await convertData(dataFilter)
      setConvertedData(newConvertedData)
      console.log('data convertida', newConvertedData)
    }

    fetchData()
  }, [dataFilter])

  const getMonthName = month => {
    const monthNames = [
      'Ene', 'Feb', 'Mar', 'Abr',
      'May', 'Junio', 'Jul', 'Ago',
      'Sep', 'Oct', 'Nov', 'Dic'
    ]
    return monthNames[month]
  }

  async function loadFilterData (months) {
    try {
      const TicketsByUserData = await getTickets()
      // Funcion filtrar por mes y año
      const dataFilter = await filterTicketsByMonths(months, TicketsByUserData, years)
      const TicketsAsc = await sortByUpcomingDateFilter(dataFilter)
      // console.log('asc__', TicketsAsc)
      // const EventsByUserData = await getEvents(months)

      // console.log('_____events', eventsByUser)
      setTicketsByUser(TicketsAsc)
    } catch (error) {
      console.error(error)
    } finally {
      // setLoading(false);
    }
  }
  async function loadData () {
    dispatch(clear())
    try {
      // setLoading(true);
      const EventsByMonth = await getEventsByMonth()
      // console.log('loadData()', EventsByMonth)
      const EventsByUserData = await getTickets()
      const TicketsByUserData = await getTickets()
      const TicketsAsc = await sortByUpcomingDate(TicketsByUserData)
      setEvents(EventsByMonth)
      setEventsByUser(EventsByUserData)
      setTicketsByUser(TicketsAsc)
      iterateArray(EventsByMonth)
    } catch (error) {
      console.error(error)
    } finally {
      // setLoading(false);
    }
  }

  const renderTicketsRecommended = ({ item }) => (
    <TouchableOpacity
    className="pl-4 pr-4 pb-2 w-52 mr-2 h-72"
      underlayColor="none"
      onPress={() => {
        navigation.navigate('EventDetails', {
          eventId: item.event_id,
          event: item
        })
      }}
    >

            <View className="flex-1 bg-inputPrimary p-2 rounded-md w-52 mr-2 h-64">
                <ImageBackground
                    className="h-40 w-auto"
                    source={{ uri: item.event.cover_image }}
                    resizeMode="cover"
                    imageStyle={{ borderRadius: 6 }}
                    >
                </ImageBackground>

                <View className="p-2">

                      <Text className="text-white font-semibold text-base pt-1 pb-2" numberOfLines={1}>{item.name && item.name}</Text>
                      <Text className=" text-lightGray text-sm pb-2"><Text>{getDayNumber(item.date)}</Text><Text> {getMonthAbbr(item.date)}</Text> <Text> {getYear(item.date)}</Text></Text>
                      <Text className="text-lightGray text-sm pb-2">{item.address && item.address}</Text>

              </View>
            </View>

    </TouchableOpacity>

  )

  function MonthButton ({ month }) {
    const isMonthIncluded = months.includes(month.number)

    return (
      <>
        {isMonthIncluded
          ? (

          <LinearGradient
          colors={['#FB6728', '#E84776', '#BF159E']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.container}
          className="m-1 p-2"
          >
            <TouchableOpacity

              onPress={() => dispatch(addMonth(month.number))}
              className=" flex-1 rounded-md items-center w-full h-full -m-2 justify-center"
            >

              <Text className="text-white">{month.short}</Text>

            </TouchableOpacity>
            </LinearGradient>
            )
          : (
          <TouchableOpacity
            style={[styles.container, { backgroundColor: '#EBEBED' }]}
            onPress={() => dispatch(addMonth(month.number))}
            className="bg-gray-100 flex-1 m-1 rounded-md p-2 items-center"
          >
            <Text className="text-black">{month.short}</Text>
          </TouchableOpacity>
            )}
      </>
    )
  }
  function YearButton ({ year }) {
    const isYearIncluded = years.includes(year)
    console.log('year', year)

    return (
      <>
        {isYearIncluded
          ? (

          <LinearGradient
          colors={['#FB6728', '#E84776', '#BF159E']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.container}
          className="m-1 p-2"
          >
            <TouchableOpacity
              onPress={() => dispatch(addYear(year))}
              className="flex-1 rounded-md items-center w-full h-full -m-2 justify-center"
            >

              <Text className="text-white">{year}</Text>

            </TouchableOpacity>
            </LinearGradient>
            )
          : (
          <TouchableOpacity
            style={[styles.container, { backgroundColor: '#EBEBED' }]}
            onPress={() => dispatch(addYear(year))}
            className="bg-gray-100 flex-1 m-1 rounded-md p-2 items-center"
          >
            <Text>{year}</Text>
          </TouchableOpacity>
            )}
      </>
    )
  }
  const renderFooter = ({ item }) => {
    if (convertedData.length > 0) {
      return (
      <TouchableOpacity onPress={loadData} className="bg-inputMorado w-32 pt-2 pb-2 pl-1 pr-1 mr-2 rounded-lg flex-row ">
      <View className="flex-2 justify-center items-center">
        <Ionicons name="close-outline" size={16} color='#FFF'/>
      </View>
      <View className="flex-1 justify-center items-center w-28">

        <Text className="text-white">Eliminar Filtros</Text>
      </View>

    </TouchableOpacity>
      )
    }
    return null
  }
  const handleItemPress = async (item) => {
    if (item.type === 'year') {
      console.log('quiero quitar este año')
      await dispatch(addYear(item.value))
      await loadFilterData(months)
    } else if (item.type === 'month') {
      await dispatch(addMonth(item.numberMonth))
      await loadFilterData(months)
    }
  }

  const renderItem = ({ item }) => {
    return (
      <View className="bg-inputMorado w-16 pt-2 pb-2 pl-2 pr-2 mr-2 mb-1 rounded-lg flex-row ">
      <View className="flex-1 justify-center items-center">

        <Text className="text-white">{item?.value}</Text>
      </View>

    </View>
    )
  }

  return (

    <SafeAreaView className="bg-secondary pt-4 flex-1">

      {/* Header */}
      <Header title='Próximos Eventos' />

       {/* Search */}
       <View className="flex-row items-center space-x-2 pb-2 mx-4" >
        <View className="flex-row flex-1 space-x-2 bg-inputPrimary p-3 rounded-md">
            <Ionicons name="search" size={22} color='#999999'/>
            <TextInput
            placeholder='Buscar'
            placeholderTextColor='#999999'
            keyboardType='default'
            className="rounded text-white"
            value={searchTerm}
            onChangeText={handleChange}
            />
        </View>
        <TouchableOpacity
        // todo
         onPress={() => refRBSheet.current.open()}
        >
          <Svg
            width={24}
            height={24}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...SvgProps}
          >
            <G clipPath="url(#a)" fill="#999">
              <Path d="M8 8.246a2.667 2.667 0 0 0-2-2.593v-2.32a.667.667 0 0 0-1.333 0v2.32a2.667 2.667 0 0 0 0 5.187v9.826a.667.667 0 1 0 1.333 0V10.84a2.666 2.666 0 0 0 2-2.594ZM5.333 9.58a1.333 1.333 0 1 1 1.334-1.334A1.333 1.333 0 0 1 5.333 9.6v-.02ZM21.333 10.553a2.667 2.667 0 0 0-2-2.593V3.333a.666.666 0 1 0-1.333 0V7.96a2.667 2.667 0 0 0 0 5.186v7.52a.667.667 0 1 0 1.333 0v-7.52a2.667 2.667 0 0 0 2-2.593Zm-2.666 1.333A1.333 1.333 0 1 1 20 10.553a1.334 1.334 0 0 1-1.333 1.36v-.027ZM14.667 16.333a2.666 2.666 0 0 0-2-2.593V3.333a.667.667 0 1 0-1.334 0V13.74a2.667 2.667 0 0 0 0 5.187v1.74a.666.666 0 1 0 1.334 0v-1.74a2.667 2.667 0 0 0 2-2.594ZM12 17.667a1.334 1.334 0 1 1 1.333-1.334A1.333 1.333 0 0 1 12 17.687v-.02Z" />
            </G>
            <Defs>
              <ClipPath id="a">
                <Path fill="#fff" d="M0 0h24v24H0z" />
              </ClipPath>
            </Defs>
          </Svg>
        </TouchableOpacity>
      </View>
      <View className="pl-4 pr-4 pt-2 flex-row">

      <FlatList
      className="flex-1"
      horizontal={true}
      data={convertedData}
      // keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
      extraData={{ convertedData, handleItemPress }}
      ListFooterComponent={renderFooter}
    />

      </View>

      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>

      {
        events !== null
          ? searchTerm.length > 0
            ? (
              <View className="pt-2">

                {
                ticketsData && ticketsData?.map((item) => <EventCard key={item?.id} item={item} />)
                }
              </View>

              )

            : (
                    <View
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    className=" flex-1 pb-4"
                    >
                      {convertedData.length > 0
                        ? ''
                        : <View>
                      <View className="p-4">
                        <Text className="text-white text-xl font-semibold">Recomendados</Text>
                      </View>

                      <FlatList
                      horizontal={true}
                      nestedScrollEnabled={true}
                      vertical
                      showsVerticalScrollIndicator={false}
                      numColumns={1}
                      data={ticketsByUser}
                      renderItem={renderTicketsRecommended}
                      keyExtractor={(item) => `${item.id}`}
                      />
                  </View>}

                      <View className="flex-row justify-between p-4 items-center ">
                          <View>
                            <Text className="text-white text-xl font-semibold">Próximos eventos</Text>
                          </View>

                      </View>
                      {

                        ticketsByUser && ticketsByUser.map((item,index) => (
                          <EventCard key={index} item={item} />
                        ))
                      }
                    </View>
              )

          : <Spinner />

      }

      <RBSheet
          //  slideDirection="right"
           ref={refRBSheet}
           closeOnPressMask={true}
           closeOnDragDown={true}
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
           {/* Aca comienza */}
           <View className="h-auto m-6">
              {/* <View className="flex-row justify-between pb-4">
                <TouchableOpacity className="flex-1" onPress={() => dispatch(clear())}><Text className="text-lg text-white">Resetear</Text></TouchableOpacity>
              </View> */}

              {/* Start Filter by Month */}

              <View className="justify-between">
                <Text className="pl-2 pt-2 pb-2 text-lightGray font-semibold">Mes</Text>
                {/* <FlatList
                  data={arrayMonths}
                  numColumns={4}
                  renderItem={({ item }) => <MonthButton month={item} />}
                  keyExtractor={item => item.name}
                /> */}
                  <View className="flex-row">
                    <View className="flex-2 justify-center"><Ionicons name="ios-chevron-back" size={22} color='#FFFFFF'/></View>
                    <FlatList
                    className="flex-1"
                    data={arrayMonths}
                    horizontal={true}
                    renderItem={({ item }) => <MonthButton month={item} />}
                    keyExtractor={item => item.name}
                    />
                    <View className="flex-2 justify-center"><Ionicons name="ios-chevron-forward" size={22} color='#FFFFFF'/></View>
                  </View>

              </View>

              {/* Close Filter by Month */}

              <View className="pt-4">

                <Text className="pl-2 pt-2 pb-2 text-lightGray font-semibold">Año</Text>
                <View className="flex-row">
                  <View className="flex-2 justify-center"><Ionicons name="ios-chevron-back" size={22} color='#FFFFFF'/></View>
                  <View className="flex-1 flex-row">
                    <FlatList
                    className="flex-1"
                    data={arrayYears}
                    horizontal={true}
                    renderItem={({ item }) => <YearButton year={item} />}
                    keyExtractor={item => item.length}
                    />
                  </View>
                  <View className="flex-2 justify-center"><Ionicons name="ios-chevron-forward" size={22} color='#FFFFFF'/></View>

                </View>
              </View>
              <View className="pb-12 pt-4">
                <Text className="pl-2 pt-2 pb-2 text-lightGray font-semibold">Rango de Precio</Text>
                <View className="flex-row pb-1">
                <TextInput
                placeholder='Desde'
                placeholderTextColor='#999999'
                keyboardType='default'
                value={rangePrice.minPrice}
                 name={rangePrice.minPrice}
                 onChangeText={(text) => dispatch(addMinPrice(text))}
                className="rounded flex-row flex-1 bg-secondary p-2 m-1 justify-center items-center text-lightGray"
                />
                <TextInput
                placeholder='Hasta'
                placeholderTextColor='#999999'
                keyboardType='default'
                value={rangePrice.maxPrice}
                name={rangePrice.maxPrice}
                onChangeText={(text) => dispatch(addMaxPrice(text))}
                className="rounded flex-row flex-1 bg-secondary p-2 border gray-500 m-1 justify-center items-center text-lightGray"
                />

                </View>
                {/* <Text className="text-white">Meses{months}</Text>
                <Text className="text-white">Años{years}</Text>
                <Text className="text-white">minPrice: {rangePrice.minPrice}</Text>
                <Text className="text-white">maxPrice: {rangePrice.maxPrice}</Text> */}
              </View>
              <ButtonPrimary title='Aplicar' onPress={handleFilterSubmit}/>
           </View>
           {/* Aca termina */}
       </RBSheet>
      </ScrollView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: RecipeCard.container3,

  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingBottom: 25
  },
  buttonContainer: {
    backgroundColor: '#3366CC',

    borderRadius: 10,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
    width: '100%'

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
    textAlign: 'center'
  }
})

export default UpcomingEvents
