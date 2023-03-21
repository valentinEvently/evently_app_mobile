/* eslint-disable react/prop-types */
import { View, Text, StyleSheet, StatusBar, TextInput, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useLayoutEffect, useState, useContext, useRef } from 'react'
import { useNavigation } from '@react-navigation/native'
import Toggle from 'react-native-toggle-element'
import Header from './components/Header.js'
import { getEventsByUserId, getEventsOnMarketplace } from '../MyTickets/services/api'
import { RecipeCard } from '../../AppStyles'
import CollectableTickets from './components/CollectableTickets'
import MarketPlace from './components/MarketPlace'
import { UserContext } from '../../contexts/UserContext/UserContext.js'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Spinner from '../../components/Spinner'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg'
import SmallModal from '../../components/SmallModal.js'
import RBSheet from 'react-native-raw-bottom-sheet'
import ButtonPrimary from '../../components/ButtonPrimary.js'
import { useSelector, useDispatch } from 'react-redux'
import { addMonth, clear, addYear, addMinPrice, addMaxPrice } from '../../redux/features/filterMarketplaceSlice'
import { LinearGradient } from 'expo-linear-gradient'
import { arrayYears, arrayMonths } from '../../constants/constants'
import { filterTicketsByMonths, sortByUpcomingDateFilter } from '../UpcomingEvents/services/api.js'

const MyCollectionsScreen = ({ route }) => {
  const dispatch = useDispatch()
  const rangePrice = useSelector((state) => state.filterMarketplace.rangePrice)
  const months = useSelector((state) => state.filterMarketplace.months)
  const years = useSelector((state) => state.filterMarketplace.years)
  const dataFilter = useSelector((state) => state.filterMarketplace)
  const refRBSheet = useRef()
  const navigation = useNavigation()
  const [toggleValue, setToggleValue] = useState(false)
  const [events, setEvents] = useState(null)
  const [eventsFilter, setEventsFilter] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [eventsMarketplace, setEventsMarketplace] = useState(null)
  const [eventsMarketplaceFilter, setEventsMarketplaceFilter] = useState(null)
  const [renderModal, setRenderModal] = useState(false)
  const { user, setUser } = useContext(UserContext)
  const renderModalRoute = route?.params?.renderModalRoute
  const [convertedData, setConvertedData] = useState([])

  useEffect(() => {
    console.log('range price', rangePrice?.minPrice)
  }, [])
  useEffect(() => {
    const convertData = async (data) => {
      const convertedData = []

      if (data?.months && data?.months?.length > 0) {
        for (const month of data?.months) {
          const monthName = await getMonthName(month)
          convertedData?.push({ value: monthName, type: 'month', numberMonth: month })
        }
      }

      if (data?.years && data?.years?.length > 0) {
        for (const year of data?.years) {
          convertedData?.push({ value: year, type: 'year' })
        }
      }

      if (data?.rangePrice > 0) {
        if (data.rangePrice.minPrice !== undefined) {
          convertedData?.push({ value: data?.rangePrice?.minPrice, type: 'minPrice' })
        }
        if (data.rangePrice.maxPrice !== undefined) {
          convertedData?.push({ value: data?.rangePrice?.maxPrice, type: 'maxPrice' })
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

  const handleChange = async (text) => {
    setSearchTerm(text)
    const filteredEvents = await events?.filter((ticket) =>
      ticket?.name?.toLowerCase().includes(text?.toLowerCase())
    )
    const filteredMarketplace = await eventsMarketplace?.filter((event) =>
      event?.name?.toLowerCase().includes(text?.toLowerCase())
    )
    setEventsFilter(filteredEvents)
    setEventsMarketplaceFilter(filteredMarketplace)
  }
  const handleFilterSubmit = () => {
    refRBSheet.current.close()
    console.log(months)
    if (months?.length > 0 || years?.length > 0) { loadFilterData(months) } else { loadData() }
  }

  const Item = ({ title }) => (
    <View style={styles?.contenedor}>
      <Text style={styles?.title}>{title}</Text>
    </View>
  )
  const renderItem = ({ item }) => (
    <Item title={item?.title} />
  )
  function filterByNotNull (array, property) {
    return array.filter(function (obj) {
      return obj[property] !== null
    })
  }

  async function loadData () {
    dispatch(clear())
    try {
      const token = await AsyncStorage.getItem('@storage_Key')
      if (token !== null) {
        // setLoading(true);
        const eventsById = await getEventsByUserId(user, token)
        // console.log('mis eventos prueba', eventsById[0])
        const eventsFilter = await filterByNotNull(eventsById, 'event_id')
        setEvents(eventsFilter)
        const eventsOnMarketplace = await getEventsOnMarketplace()
        // console.log('*******events', eventsOnMarketplace)
        setEventsMarketplace(eventsOnMarketplace)
        // console.log('xxxxxxxevents', eventsFilter)

        // console.log('estos son LOS EVENTOS', events)
      }
    } catch (e) {
      // error reading token
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  async function loadFilterData () {
    try {
      const token = await AsyncStorage.getItem('@storage_Key')
      if (token !== null) {
        const eventsById = await getEventsByUserId(user, token)
        const eventsFilter = await filterByNotNull(eventsById, 'event_id')
        const dataFilter = await filterTicketsByMonths(months, eventsFilter, years)
        const TicketsAsc = await sortByUpcomingDateFilter(dataFilter)
        setEvents(TicketsAsc)
        const eventsOnMarketplace = await getEventsOnMarketplace()
        const marketFilter = await filterTicketsByMonths(months, eventsOnMarketplace, years)
        const eventsMarket = await sortByUpcomingDateFilter(marketFilter)
        setEventsMarketplace(eventsMarket)
      }
    } catch (e) {
      // error reading token
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  function MonthButton ({ month }) {
    const isMonthIncluded = months?.includes(month?.number)

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

              onPress={() => dispatch(addMonth(month?.number))}
              className=" flex-1 rounded-md items-center w-full h-full -m-2 justify-center"
            >

              <Text className="text-white">{month?.short}</Text>

            </TouchableOpacity>
            </LinearGradient>
            )
          : (
          <TouchableOpacity
            style={[styles.container, { backgroundColor: '#EBEBED' }]}
            onPress={() => dispatch(addMonth(month?.number))}
            className="bg-gray-100 flex-1 m-1 rounded-md p-2 items-center"
          >
            <Text className="text-black">{month?.short}</Text>
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
    if (convertedData?.length > 0) {
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
      await dispatch(addYear(item?.value))
      await loadFilterData(months)
    } else if (item.type === 'month') {
      await dispatch(addMonth(item?.numberMonth))
      await loadFilterData(months)
    }
  }
  const renderFilter = ({ item }) => {
    return (
      <View className="bg-inputMorado w-16 pt-2 pb-2 pl-2 pr-2 mr-2 mb-1 rounded-lg flex-row ">
      <View className="flex-1 justify-center items-center">

        <Text className="text-white">{item?.value}</Text>
      </View>

    </View>
    )
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
    navigation.addListener('focus', async () => {
      setToggleValue(false)
      loadData()
      if (renderModalRoute === true) {
        setRenderModal(true)
        setTimeout(() => {
          // Aquí puedes ejecutar cualquier función después de 5 segundos.
          setRenderModal(false)
        }, 5000)
      } else { setRenderModal(false) }
    })
  }, [])
  return (
    <View className="bg-secondary pt-4 flex-1">

      {/* Header */}
      <Header title='Coleccionables' />

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
         todo
         onPress={() => refRBSheet?.current.open()}
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
        renderItem={renderFilter}
        extraData={{ convertedData, handleItemPress }}
        ListFooterComponent={renderFooter}
        />
      </View>

      {/* Toggle button */}
      <View className="items-center pt-4">
        <Toggle
        value={toggleValue}
        onPress={(val) => setToggleValue(val)}
        leftComponent={
          <Text className={toggleValue ? 'text-white' : 'text-white font-bold'}>Mi Colección</Text>
        }
        rightComponent={
          <Text className={toggleValue ? 'text-white font-bold' : 'text-white'}>MarketPlace</Text>
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
        // 1. Marketplace
        ? (loading === false)

            ? <View className="bg-secondary">
                {
                  (eventsMarketplace?.length !== 0)
                    ? (
                        searchTerm?.length > 0
                          ? <MarketPlace events={eventsMarketplaceFilter}/>
                          : <MarketPlace events={eventsMarketplace}/>

                      )
                    : (
                          <View className=" h-full items-center pt-20">
                            <Text className="pl-10 pr-10 text-secondary font-bold text-xl text-center">No hay tickets disponibles en el marketplace</Text>
                          </View>
                      )
                }
              </View>
            : <Spinner />
        // 2. Coleccionables
        : (loading === false)
            ? <View className="flex-1">
                {
                  (events?.length !== 0 && events !== null)
                    ? (
                        searchTerm.length > 0 && eventsFilter !== null && events?.length !== 0
                          ? <CollectableTickets events={eventsFilter}/>
                          : <CollectableTickets events={events}/>

                      )
                    : (
                        <View className=" flex-1 pt-10">
                          <Text className="pl-10 pr-10 text-secondary font-bold text-xl text-center">No tenés tickets</Text>
                        </View>
                      )
                }
            </View>
            : <Spinner />
        // <View>
        //     <ScrollView>
        //       <MyEvents title={'Próximos eventos'} height={80} width={60}/>
        //   </ScrollView>
        // </View>

      }
      {/* {renderModalRoute !== true
        ? <SmallModal title='Tu reventa fue cancelada'/>
        : ''
    } */}
    <RBSheet
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
                  <View className="flex-row">
                    <View className="flex-2 justify-center"><Ionicons name="ios-chevron-back" size={22} color='#FFFFFF'/></View>
                    <FlatList
                    className="flex-1"
                    data={arrayMonths}
                    horizontal={true}
                    renderItem={({ item }) => <MonthButton month={item} />}
                    keyExtractor={item => item?.name}
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
                    keyExtractor={item => item?.length}
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
                value={rangePrice?.minPrice}
                 name={rangePrice?.minPrice}
                 onChangeText={(text) => dispatch(addMinPrice(text))}
                className="rounded flex-row flex-1 bg-secondary p-2 m-1 justify-center items-center text-lightGray"
                />
                <TextInput
                placeholder='Hasta'
                placeholderTextColor='#999999'
                keyboardType='default'
                value={rangePrice?.maxPrice}
                name={rangePrice?.maxPrice}
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

    </View>
  )
}

const styles = StyleSheet.create({
  container: RecipeCard.container3,
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16
  },
  title: {
    fontSize: 32
  },
  row: {
    flex: 1,
    justifyContent: 'space-around'
  },
  contenedor: RecipeCard.container
})

export default MyCollectionsScreen
