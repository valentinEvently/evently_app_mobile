import { URL } from '../../../constants/constants'
import axios from 'axios'

function removeDuplicates (array, propertyName) {
  const tmp = {}
  array.forEach(function (v) {
    if (tmp[v[propertyName]] == null) {
      tmp[v[propertyName]] = v
    } else if (v.val < tmp[v[propertyName]].val) { tmp[v[propertyName]] = v }
  }
  )
  return Object.values(tmp)
}
// console.log(removeDuplicates(input, 'id'))
// function upccomingEvents (tickets) {
//   const newTickets = tickets.filter((item) => item.date == IdEvent)
//   console.log('ACAA', hola)
//   return newTickets
// }

export const AddingTicketToMarketPlace = async (_datos, _id) => {
  const url = `${URL}/api/v1/bookings/${_id}?resale=true`
  const { data } = await axios.put(url, _datos)
  console.log(data)
  // const date = new Date(data.date)
  // const month = MESES[date.getMonth()]
  return data
}

export const getEventsByUser = async (user, tokenValue) => {
  // const url = `${URL}/api/v1/users/0b864955-c0d3-40cc-818b-d398e2bb46bd`
  console.log('user id', user.id)
  const url = `${URL}/api/v1/users/${user.id}`
  const { data } = await axios.get(url, { headers: { 'x-token': tokenValue } })
  console.log('LA DATA TICKETSSS', data)
  const eventsById = await removeDuplicates(data.tickets, 'ticket_id')
  console.log('eventos NO REPETIDOS POR PRECIO', eventsById)

  return eventsById
}
export const getEventsByUserId = async (user, token) => {
  const url = `${URL}/api/v1/users/${user.id}`
  const { data } = await axios.get(url, { headers: { 'x-token': token } })
  const eventsById = data.tickets
  return eventsById
}
export const getEventsOnMarketplace = async () => {
  const url = `${URL}/api/v1/bookings/marketplace`
  const { data } = await axios.get(url)
  const eventsOnMarketplace = data.bookings
  console.log('____api events ', eventsOnMarketplace)
  return eventsOnMarketplace
}
export const getEventsByUserIdAndEventId = async (user, ticketId, token) => {
  const url = `${URL}/api/v1/users/${user.id}`
  const { data } = await axios.get(url, { headers: { 'x-token': token } })
  return data.tickets.filter(function (event) {
    return event.ticket_id === ticketId
  })
}

// export const getUpcomingEventsByUser = async () => {
//   const url = `${URL}/api/v1/users/0b864955-c0d3-40cc-818b-d398e2bb46bd`
//   const { data } = await axios.get(url)
//   console.log('LA DATA TICKETSSS', data.tickets)
//   const upcomingEvents = await upcomingEvents(data.tickets)
//   const eventsById = await removeDuplicates(data.tickets, 'eventId')
//   console.log('eventos NO REPETIDOS POR PRECIO', eventsById)

//   return eventsById
// }
// export const getTicketsByEventId = async () => {
//   const url = `${URL}/api/v1/users/0b864955-c0d3-40cc-818b-d398e2bb46bd`
//   const { data } = await axios.get(url)
//   console.log('LA DATA TICKETSSS', data.tickets)
//   const eventsById =

//   return eventsById
// }

export const getEventsById = async (IdEvent) => {
  // console.log('el idEVENT', IdEvent)
  const url = `${URL}/api/v1/users/0b864955-c0d3-40cc-818b-d398e2bb46bd`
  const { data } = await axios.get(url)
  // console.log('TESTT!!!!', data.tickets)
  const hola = data.tickets.filter((item) => item.event_id === IdEvent)
  // console.log('ACAA', hola)
  return hola
}
export const getMonthAbbr = (fecha) => {
  const date = new Date(fecha)
  const monthNumber = date.getMonth()
  const monthAbbr = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'][monthNumber]
  return monthAbbr
}
export const getDayNumber = (fecha) => {
  const date = new Date(fecha)
  const dayNumber = date.getDate()
  return dayNumber + 1
}

export const getYear = (fecha) => {
  const date = new Date(fecha)
  const year = date.getFullYear()
  return year
}
