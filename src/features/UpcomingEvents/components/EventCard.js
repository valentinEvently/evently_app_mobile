/* eslint-disable react/prop-types */
import { Text, TouchableOpacity, ImageBackground, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { getDayNumber, getMonthAbbr, getYear } from '../services/api'

const EventCard = ({ item, id }) => {
  const navigation = useNavigation()
  return (
    <TouchableOpacity
    className="pl-4 pr-4 pb-2 h-36"
      underlayColor="none"
      onPress={() => {
        navigation.navigate('EventDetails', {
          eventId: item?.event_id
        })
      }}
    >

            <View className="flex-1 flex-row bg-inputPrimary h-36 p-2 rounded-md">
              <View className="flex-1 flex-row">
                <ImageBackground
                    className="flex-1 mr-1 h-auto w-auto max-w-24"
                    source={{ uri: item.event?.cover_image }}
                    resizeMode="cover"
                    imageStyle={{ borderRadius: 12 }}
                    >
                </ImageBackground>
                <View className="flex-2 bg-black rounded-md p-2 justify-between ml-1">
                  <View>
                    <Text className="text-lightGray text-sm">{getYear(item?.date)}</Text>
                  </View>
                  <View>
                    <Text className="text-white text-sm">{getMonthAbbr(item?.date)}</Text>
                    <Text className="text-white font-bold text-2xl">{getDayNumber(item?.date)}</Text>
                  </View>
                </View>
              </View>
              <View className="flex-1 p-2 items-between justify-between">
              <View className="flex-1">
                  <Text className="font-semibold text-white text-base">{item?.name && item?.name}</Text>
                  <Text className="text-lightGray text-md">{item?.address && item?.address}</Text>
                </View>
                <View className="flex-1 justify-end">
                  <View className="flex-row">
                    {item?.event?.tags && item?.event?.tags?.map((e,index) =>
                    <View style={{
                      backgroundColor: 'rgba(242, 75, 209, 0.3)',
                      filter: 'blur(12px)'
                    }} className=" pt-0.5 pb-0.5 pl-2 pr-2 m-1 rounded" key={index} ><Text className="text-white">{e?.toUpperCase()}</Text></View>)}
                    </View>
                </View>

              </View>
            </View>

                          </TouchableOpacity>
  )
}

export default EventCard
