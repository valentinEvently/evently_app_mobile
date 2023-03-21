/* eslint-disable react/prop-types */
import React, { useLayoutEffect, useState } from 'react'
import { FlatList, Text, View, Alert, TouchableOpacity, Image, StatusBar, StyleSheet, ImageBackground, Button, Modal } from 'react-native'
import { RecipeCard } from '../../../AppStyles'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import { getDayNumber, getMonthAbbr, getYear } from '../../MyTickets/services/api'

const CollectableTickets = (props) => {
  const { events } = props
  const navigation = useNavigation()
  const [modalVisible, setModalVisible] = useState(false)
  const [event, setEvent] = useState(null)
  

  const onPressTicket = (item) => {
    // console.log('///////////////////// el item', item)
    setModalVisible(false)
    item.resale
      ? navigation.navigate('Modificar ticket a marketplace', { item })
      : navigation.navigate('Agregar ticket a marketplace', { item })
  }

  const renderTickets = ({ item }) => (

    <View
      underlayColor="none"
      onPress={() => onPressTicket(item)}
      className="flex-1"
    >
            <TouchableOpacity
             style={styles.container}
             onPress={() => onPressTicket(item)}
            // className="flex-1"
            >

              <View className="flex-1 bg-inputPrimary p-2 rounded-md w-full">
                <ImageBackground
                    className="h-36 w-auto p-2 flex-row flex-ends justify-end"
                    source={{ uri: item.image }}
                    resizeMode="cover"
                    imageStyle={{ borderRadius: 6 }}
                    >
                      {item?.resale
                        ? <Image
                      style={styles.logo}
                      source={require('../../../../assets/saleIcon.png')}
                    />
                        : ''}

                </ImageBackground>

                <View className="p-2">

                      <Text className="text-white text-md" numberOfLines={1}>{item?.name && item?.name}</Text>
                      <Text className=" text-lightGray text-sm"><Text>{getDayNumber(item?.date)}</Text><Text> {getMonthAbbr(item?.date)}</Text> <Text> {getYear(item?.date)}</Text></Text>
                      <Text className="text-lightGray text-sm">{item?.address && item?.address}</Text>

              </View>
            </View>

            </TouchableOpacity>

    </View>

  )

  return (
    <View className='mb-2 mt-2 pr-4'>
      <FlatList
        vertical
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={events}
        renderItem={renderTickets}
        keyExtractor={(item) => `${item?.pk}`}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: RecipeCard.container,
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
export default CollectableTickets
