/* eslint-disable react/prop-types */
import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import MyEventCard from './MyEventCard'
import MyEventCardSendGift from './MyEventCardSendGift'
const MyEvents = ({ title, events, isCardSmall }) => {
  return (
    <View className=" pb-4 bg-secondary">
        <ScrollView
              contentContainerStyle={{
                paddingHorizontal: 15,
                paddingTop: 10
              }}
            horizontal
            showsHorizontalScrollIndicator={false}
        >
          { isCardSmall
            ? events && (events?.map((e,index) => <MyEventCardSendGift key={index} event={e} events={events} isCardSmall={isCardSmall}/>))
            : events && (events?.map((e,index) => <MyEventCard key={index} event={e} events={events} isCardSmall={isCardSmall}/>))
          }

        </ScrollView>
      </View>
  )
}

export default MyEvents
