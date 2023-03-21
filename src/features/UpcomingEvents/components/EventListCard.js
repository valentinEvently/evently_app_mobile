/* eslint-disable react/prop-types */
import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { setInitialCart } from '../../../redux/features/cartSlice.js'
import { selectTicket } from '../../../redux/features/ticketSlice.js'
import { selectEvent } from '../../../redux/features/eventSlice.js'
import { useDispatch } from 'react-redux'
import { URL } from '../../../constants/constants.js'
import axios from 'axios'
import { getDayNumber, getMonthAbbr, getYear, formatTime } from '../services/api.js'

const EventListCard = ({ ticket, eventId, event }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  // const events = useSelector((state) => state.cart.cart)
  const [ticketData, setTicketData] = useState(null)

  async function fetchData () {
    const { data } = await axios.get(
      `${URL}/api/v1/tickets/${ticket?.id}`
    )
    setTicketData(data?.ticket)
    console.log('ticket data', ticketData)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <TouchableOpacity className="bg-inputPrimary flex-row rounded-md p-2 mb-4 h-28" onPress={async () => {
      if (ticketData) {
        try {
          await Promise.all([
            dispatch(selectEvent(event)),
            dispatch(selectTicket(ticketData)),
            dispatch(setInitialCart(ticketData?.sections))
          ])
          navigation.navigate('SeatPick', { eventId })
        } catch (error) {
          console.error(error)
        }
      }
    }}>

            <View className="flex-2 bg-black rounded-md p-3 justify-between">
                  <View>
                    <Text className="text-lightGray text-sm">{getYear(ticket?.date)}</Text>
                  </View>
                  <View>
                    <Text className="text-white text-sm">{getMonthAbbr(ticket?.date)}</Text>
                    <Text className="text-white font-bold text-2xl">{getDayNumber(ticket?.date)}</Text>
                  </View>
                </View>
            <View className="flex-1 p-3">
              <View className="flex-1">
                <Text className="text-orange font-semibold">{ticket?.city}</Text>
              </View>
              <View className="flex-1">
                  <Text className="font-semibold text-lightGray text-base" numberOfLines = {1}>{ticket?.place}</Text>
                  <Text className="text-lightGray text-sm" numberOfLines = {1}>{ticket?.address}</Text>
              </View>
            </View>
    </TouchableOpacity>
  )
}

export default EventListCard
