/* eslint-disable react/prop-types */
import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import Toggle from 'react-native-toggle-element'
import EventListCard from './EventListCard'

const EventList = ({ event }) => {
  const [toggleValue, setToggleValue] = useState(false)
  const [tickets, setTickets] = useState(null)
  useEffect(() => {
    setTickets(event.tickets_types)
  }, [])

  return (
    <View className="">
      {/* Toggle button */}
      <View className="items-center p-2">
        <Toggle
        value={toggleValue}
        onPress={(val) => setToggleValue(val)}
        leftComponent={
          <Text className={toggleValue ? 'text-white' : 'text-white font-bold'}>Eventos</Text>
        }
        rightComponent={
          <Text className={toggleValue ? 'text-white font-bold' : 'text-white'}>Detalles</Text>
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
            <Text className="text-lightGray text-base pt-2">Acerca del evento</Text>
            <Text className="text-2xl font-bold text-secondary pt-1 pb-3">{event?.name}</Text>
            <Text className="text-quaternary text-md">{event?.description}</Text>
          </View>
        : <View>
            <Text className="text-lightGray font-semibold text-base pb-2 pt-2">Eventos disponibles</Text>
                {
                  tickets !== null
                    ? tickets?.map((e,index) => <EventListCard key={index} eventId={event?.id} ticket={e} event={event}/>)
                    : ''
                }
          </View>

      }

    </View>
  )
}

export default EventList
