import { View, Text, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { RecipeCard } from '../../../AppStyles'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import Entypo from 'react-native-vector-icons/Entypo'
import { selectCartItem, addTicket } from '../../../redux/features/cartSlice'

const RenderTickets = (item) => {
  console.log('item en render ticket', item)
  const cart = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  const event = useSelector((state) => state.event)
  const navigation = useNavigation()
  const onPressTicket = (item) => {
    navigation.navigate('SelectQuantity', {
      section: item
    })
    // navigation.navigate('Agregar ticket a marketplace', { item })
  }
  console.log('item render tickets', item.id)
  const section = useSelector(state => selectCartItem(state, item.id))
  return (

    <View
      underlayColor="none"
      onPress={() => onPressTicket(item)}

    >
            <TouchableOpacity
             style={styles.container}
             onPress={() => onPressTicket(item)}
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
                          {/* <TouchableOpacity onPress={() => { if (numTickets > 1) { setNumTickets(numTickets - 1) } }}> */}
                          <TouchableOpacity>
                              <Entypo name="squared-minus" size={26} color='#F207A0' />
                          </TouchableOpacity>
                              <Text className="p-2 text-white text-lg font-semibold">0</Text>
                          <TouchableOpacity
                        //   onPress={() => { dispatch(addTicket(item)); console.log(cart) }}
                          >
                          {/* <TouchableOpacity onPress={() => { if (numTickets < (typeSection ? typeSection.max_per_order : 6)) { setNumTickets(numTickets + 1) } }}> */}
                              <Entypo name="squared-plus" size={26} color='#F207A0'/>
                          </TouchableOpacity>
                        </View>
                      </View>

                </ImageBackground>

            </TouchableOpacity>

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
  }
})

export default RenderTickets
