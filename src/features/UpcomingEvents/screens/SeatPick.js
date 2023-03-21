/* eslint-disable no-sequences */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { View, Button, Image, StyleSheet, Text, FlatList, TouchableOpacity, ImageBackground } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { addToCart, addTicket, selectCartItem, decrementTicket } from '../../../redux/features/cartSlice'
import { RecipeCard } from '../../../AppStyles'
import { formatTime, getDayNumber, getMonthAbbr, getYear } from '../services/api'
import Entypo from 'react-native-vector-icons/Entypo'
import ButtonPrimary from '../../../components/ButtonPrimary'
import ButtonTertiary from '../../../components/ButtonTertiary'
import NavbarPrimary from '../../../components/NavbarPrimary'

const SeatPick = ({ navigation, route }) => {
  const dispatch = useDispatch()
  const dataSections = [useSelector((state) => state.ticket)]
  const [canBuy, setCanBuy] = useState(false)
  const ticket = useSelector((state) => state.ticket)
  const cart = useSelector((state) => state.cart)
  console.log('el ticket', ticket)
  const event = useSelector((state) => state.event)
  useEffect(() => {
    // console.log('secciones', dataSections[0].sections)
    allAmountsZero(cart)
    console.log('cart', cart)
  }, [cart])
  function allAmountsZero (cart) {
    for (const item of cart.items) {
      if (item.numTickets > 0) {
        setCanBuy(true)
        return false
      }
    }
    setCanBuy(false)
    return true
  }
  const handleIncrement = async (item) => {
    await dispatch(addTicket(item))
    allAmountsZero(cart)
  }

  const onPressTicket = (item) => {
    navigation.navigate('SelectQuantity', {
      section: item
    })
    // navigation.navigate('Agregar ticket a marketplace', { item })
  }

  const renderTickets = ({ item }) =>
    <View
      underlayColor="none"

    >
            <View
             style={styles.container}
            //  onPress={() => onPressTicket(item)}
            // className="flex-1"
            >

                <ImageBackground
                    className="flex-1 rounded-md w-full flex-ends justify-end"
                    source={{ uri: event.cover_image }}
                    resizeMode="cover"
                    imageStyle={{ borderRadius: 6 }}
                    >
                      <View className="p-2 bg-degrade">
                        <Text className="text-white text-md" numberOfLines={1}>{item.area}</Text>
                        <Text className="text-white text-md" numberOfLines={1}>{item.price}</Text>
                        <Text className="text-white text-md" numberOfLines={1}>Cantidad</Text>
                        <View className="items-center flex-row">
                          <TouchableOpacity onPress={() => { dispatch(decrementTicket(item)) }}>
                              <Image
                                style={styles.icon}
                                source={require('../../../../assets/-icon.png')}
                              />
                          </TouchableOpacity>
                              <Text className="p-2 text-white text-lg font-semibold">{item.numTickets}</Text>
                          <TouchableOpacity onPress={() => { dispatch(addTicket(item)) }}>
                              <Image
                                style={styles.iconPlus}
                                source={require('../../../../assets/add.png')}
                              />
                          </TouchableOpacity>
                        </View>
                      </View>

                </ImageBackground>

            </View>

    </View>

  return (
     <View className="flex-1 bg-secondary">
       <NavbarPrimary title='Detalles' />

       {dataSections &&

              <View className="flex-1">
                <View className="flex-2 flex-row p-2 rounded-md pl-6 pr-6 pt-4 h-36">
              <View className="flex-1 flex-row">
                <ImageBackground
                    className="flex-2 flex-end"
                    source={{ uri: event.cover_image }}
                    resizeMode="cover"
                    imageStyle={{ borderRadius: 12, width: 100, height: 117 }}
                    >
                </ImageBackground>
                </View>
              <View className="flex-1 items-between">
                <Text className="text-white text-xl">{event.name}</Text>
                <Text className="text-secondary text-sm pt-1"><Text>{getDayNumber(ticket.date)}</Text> <Text>{getMonthAbbr(ticket.date)}</Text> <Text>{getYear(ticket.date)}</Text>, {formatTime(ticket.time)} hs</Text>
                <Text className="text-secondary text-sm pt-1">{ticket.place}, {ticket.address}</Text>
              </View>
                </View>
                <View className="flex-1">
                  <Text className="pl-6 text-lightGray font-semibold text-base">Tickets disponibles: </Text>
                  <FlatList
                    vertical
                showsVerticalScrollIndicator={false}
                numColumns={2}
                data={cart.items}
                renderItem={renderTickets}
                    keyExtractor={(item) => `${item.id}`}
                  />
                </View>
              <View className="p-6 flex-2">
                <View className="flex-row justify-between pt-2 pb-4">
                  <Text className="font-semibold text-white text-2xl">Total</Text>
                  <Text className="font-semibold text-white text-2xl">$ {cart.priceTotal}</Text>
                </View>
                {canBuy ? <ButtonPrimary title="Comprar" onPress={() => navigation.navigate('Finalizar compra')}/> : <ButtonTertiary title="COMPRAR"/>}
              </View>
              </View>

              }
      {/* <Button title="hola"onPress={navigation.navigate('SelectQuantity')} /> */}

     </View>
  )
}

const styles = StyleSheet.create({
  container: RecipeCard.container2,
  photo: RecipeCard.photo,
  title: RecipeCard.title,
  category: RecipeCard.category,
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingBottom: 25
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
  },
  logo: {
    width: 20,
    height: 20
  },
  icon: {
    width: 24,
    height: 24
  },
  iconPlus: {
    width: 24,
    height: 24
  }
})
export default SeatPick
