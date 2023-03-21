import { URL, MESES } from "../../../constants/constants.js";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

function removeDuplicates(array, propertyName) {
  const tmp = {};
  array.forEach(function (v) {
    if (tmp[v[propertyName]] == null) {
      tmp[v[propertyName]] = v;
    } else if (v.val < tmp[v[propertyName]].val) {
      tmp[v[propertyName]] = v;
    }
  });
  return Object.values(tmp);
}

// console.log(removeDuplicates(input, 'id'))
function upcomingEvents(tickets) {
  const newTickets = tickets.filter((item) => item.date == IdEvent);
  console.log("ACAA", hola);
  return newTickets;
}

function groupByMonthAndYear(data) {
  const result = {};
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  data.forEach((item) => {
    item.tickets_types.forEach((ticket) => {
      const date = new Date(ticket.date);
      const month = date.getMonth();
      const year = date.getFullYear();

      if (
        year < currentYear ||
        (year === currentYear && month < currentMonth)
      ) {
        return;
      }

      if (!result[year]) {
        result[year] = {};
      }

      if (!result[year][month]) {
        result[year][month] = [];
      }
      // console.log('')
      // const eventInfo = ticket.push(item.name)
      // eventInfo.push(ticket)
      // console.log('¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡')

      // Aca debo validar los filtros
      ticket.img = item.cover_image;
      ticket.id_event = item.id;
      result[year][month].push(ticket);

      // result[year][month]
    });
  });
  // console.log('______________________________________________')
  return result;
}
function groupByFilterMonthAndYear(data, months) {
  // const years = useSelector((state) => state.filterEvents.years)
  // const rangePrice = useSelector((state) => state.filterEvents.rangePrice)
  const result = {};
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  data.forEach((item) => {
    item.tickets_types.forEach((ticket) => {
      const date = new Date(ticket.date);
      const month = date.getMonth();
      const year = date.getFullYear();

      if (
        year < currentYear ||
        (year === currentYear && month < currentMonth)
      ) {
        return;
      }

      if (!result[year]) {
        result[year] = {};
      }

      if (!result[year][month]) {
        result[year][month] = [];
      }
      // console.log('')
      // const eventInfo = ticket.push(item.name)
      // eventInfo.push(ticket)
      // console.log('¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡')

      // Aca debo validar los filtros
      ticket.img = item.cover_image;
      ticket.id_event = item;
      // si el month esta en el array
      console.log(";,,,,,,,,,,,,;,,,,,,este es el month", month);
      if (months.includes(month)) {
        result[year][month].push(ticket);
      }
      if (result[year][month].length === 0) {
        delete result[year][month];
      }

      // result[year][month]
    });
  });
  console.log("______________________________________________", result);
  return result;
}

export const getEventsByMonth = async () => {
  const url = `${URL}/api/v1/events`;
  const { data } = await axios.get(url);
  const grouped = groupByMonthAndYear(data.events);

  return grouped;
};
export const getEventsFilterByMonth = async (months) => {
  const url = `${URL}/api/v1/events`;
  const { data } = await axios.get(url);
  // Aca tengo que apicar los filtros

  const grouped = groupByFilterMonthAndYear(data.events, months);
  // console.log(grouped)

  return grouped;
};

export const getEventsByUser = async () => {
  const url = `${URL}/api/v1/users/0b864955-c0d3-40cc-818b-d398e2bb46bd`;
  const { data } = await axios.get(url);
  // console.log('LA DATA TICKETSSS', data.tickets)
  const eventsById = await removeDuplicates(data?.tickets, "eventId");
  // console.log('eventos NO REPETIDOS POR PRECIO', eventsById)

  return eventsById;
};
export const getEventsByUserId = async () => {
  const url = `${URL}/api/v1/users/0b864955-c0d3-40cc-818b-d398e2bb46bd`;
  const { data } = await axios.get(url);
  const eventsById = data?.tickets;
  return eventsById;
};
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
  const url = `${URL}/api/v1/users/0b864955-c0d3-40cc-818b-d398e2bb46bd`;
  const { data } = await axios.get(url);
  // console.log('TESTT!!!!', data.tickets)
  const hola = data?.tickets?.filter((item) => item?.event_id === IdEvent);
  // console.log('ACAA', hola)
  return hola;
};
export const getEvents = async (months) => {
  const url = `${URL}/api/v1/events`;
  const { data } = await axios.get(url);
  // console.log('TESTT!!!!', data.events)
  return data.events;
};

export const getTickets = async () => {
  const url = `${URL}/api/v1/tickets`;
  const { data } = await axios.get(url);
  // const date = new Date(data.date)
  // const month = MESES[date.getMonth()]
  return data.tickets;
};

export const getRandomEvents = async () => {
  const url = `${URL}/api/v1/events`;
  const { data } = await axios.get(url);
  // console.log('#######', data)
  const randomEvents = data?.events?.slice().sort(() => Math.random() - 0.5);
  return randomEvents;
};

export const getMonthAbbr = (fecha) => {
  const date = new Date(fecha);
  const monthNumber = date?.getMonth();
  const monthAbbr = [
    "ENE",
    "FEB",
    "MAR",
    "ABR",
    "MAY",
    "JUN",
    "JUL",
    "AGO",
    "SEP",
    "OCT",
    "NOV",
    "DIC",
  ][monthNumber];
  return monthAbbr;
};
export const getDayNumber = (fecha) => {
  const date = new Date(fecha);
  const dayNumber = date?.getDate();
  return dayNumber + 1;
};

export const getYear = (fecha) => {
  const date = new Date(fecha);
  const year = date?.getFullYear();
  return year;
};

export const sortByUpcomingDate = (arr) => {
  // Obtener la fecha actual
  const today = new Date();
  // Filtrar las fechas futuras
  const upcomingEvents = arr?.filter(function (event) {
    const eventDate = new Date(event?.date);
    return eventDate >= today;
  });
  // Ordenar las fechas futuras por fecha
  upcomingEvents.sort(function (a, b) {
    const dateA = new Date(a?.date);
    const dateB = new Date(b?.date);
    return dateA - dateB;
  });
  return upcomingEvents;
};

export const sortByUpcomingDateFilter = (arr) => {
  // Obtener la fecha actual
  const today = new Date();
  // Filtrar las fechas futuras
  const upcomingEvents = arr.filter(function (event) {
    const eventDate = new Date(event?.date);
    return eventDate >= today;
  });
  // Ordenar las fechas futuras por fecha
  upcomingEvents.sort(function (a, b) {
    const dateA = new Date(a?.date);
    const dateB = new Date(b?.date);
    return dateA - dateB;
  });
  return upcomingEvents;
};

export const getMonthNameInSpanish = (monthNumber) => {
  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  return monthNames[monthNumber];
};
export const formatTime = (string) => {
  return string?.slice(0, 5);
};

export const iterateArray = (obj) => {
  // console.log('{{{{{{{{{{{{{{{{{{{{{Voy a iterar')
  for (const year in obj) {
    // console.log(`Year: ${year}`)
    for (const month in obj[year]) {
      // console.log(`Month: ${month}`)
      for (const ticket of obj[year][month]) {
        // console.log(`Address: ${address.address}`)
        // console.log(`Ticket: ${JSON.stringify(ticket)}`)
      }
    }
  }
};

export const clearKeyAsyncStorage = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log(`La key ${key} fue eliminada exitosamente de AsyncStorage.`);
  } catch (error) {
    console.error(error);
  }
};

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
  }
};
export function filterTicketsByMonths(months, TicketsByUserData, years) {
  return TicketsByUserData.filter(function (ticket) {
    const ticketDate = new Date(ticket?.date);
    const ticketMonth = ticketDate?.getMonth();
    const ticketYear = ticketDate?.getFullYear();
    return months?.includes(ticketMonth) && years?.includes(ticketYear);
  });
}
