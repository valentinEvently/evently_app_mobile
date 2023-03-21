import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import MyEventCard from './MyEventCard'

const MyEvents = ({ title, height, width }) => {
  return (
    <View className="h-auto pt-4 pb-4">
      <Text className="pl-4 bg-transparent text-xl font-bold text-secondary">{title}</Text>
        <ScrollView
              contentContainerStyle={{
                paddingHorizontal: 15,
                paddingTop: 10
              }}
            horizontal
            showsHorizontalScrollIndicator={false}
        >
          <MyEventCard height={height} width={width}/>
          <MyEventCard height={height} width={width}/>
          <MyEventCard height={height} width={width}/>
        </ScrollView>
      </View>
  )
}

export default MyEvents
