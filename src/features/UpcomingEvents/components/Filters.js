import { View, Text, Button } from 'react-native'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { store } from 'redux'
import { addMonth, clear, removeMonth, addYear, removeYear } from '../../../redux/features/filterEventsSlice'

const Filters = () => {
  const months = useSelector((state) => state.filterEvents.months)
  const years = useSelector((state) => state.filterEvents.years)
  console.log('____count', months)
  const dispatch = useDispatch()

  return (
    <View>
      {/* <Text>Filterssss</Text> */}
      <Text>meses: {months}</Text>
      <Text>años: {years}</Text>
      <Button className="pt-2" color="#F207A0" title="Agregar marzo a mes" onPress={() => dispatch(addMonth('abril'))} />
      <Button className="pt-2" color="#F207A0" title="Limpiar" onPress={() => dispatch(clear())} />
      <Button className="pt-2" color="#F207A0" title="Remover marzo" onPress={() => dispatch(removeMonth('Marzo'))} />
      <Button className="pt-2" color="#F207A0" title="Agregar 2017" onPress={() => dispatch(addYear('2017'))} />
      <Button className="pt-2" color="#F207A0" title="Remover 2017" onPress={() => dispatch(removeYear('2017'))} />

    </View>
  )
}

export default Filters
