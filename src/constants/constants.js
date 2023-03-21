
// const URL = 'http://10.0.2.2:3000'
// URL Production
const URL = 'https://nftminter-production-4518.up.railway.app'

// URL test enviroment
// 'https://web-production-543f.up.railway.app/'
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const PASSWORD_REGEX = /^.{6,}$/
const MESES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
const arrayYears = [2023, 2022, 2021, 2019]
const arrayMonths = [
  { name: 'Enero', short: 'Ene', number: 0 },
  { name: 'Febrero', short: 'Feb', number: 1 },
  { name: 'Marzo', short: 'Mar', number: 2 },
  { name: 'Abril', short: 'Abr', number: 3 },
  { name: 'Mayo', short: 'May', number: 4 },
  { name: 'Junio', short: 'Jun', number: 5 },
  { name: 'Julio', short: 'Jul', number: 6 },
  { name: 'Agosto', short: 'Ago', number: 7 },
  { name: 'Septiembre', short: 'Sep', number: 8 },
  { name: 'Octubre', short: 'Oct', number: 9 },
  { name: 'Noviembre', short: 'Nov', number: 10 },
  { name: 'Diciembre', short: 'Dic', number: 11 }
]
// 👇️ named exports
export { URL, EMAIL_REGEX, PASSWORD_REGEX, MESES, arrayYears, arrayMonths }
