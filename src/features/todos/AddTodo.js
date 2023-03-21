import React, { useState } from 'react'
import { View, TextInput, Button, StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux'
import { addEvent } from '../../redux/eventSlice'

export const AddTodo = () => {
  const [text, setText] = useState({ text: 'nuevo evento' })
  const dispatch = useDispatch()

  function handleSumbit () {
    dispatch(addEvent(text))
    setText('')
  }

  return (
    <View style={styles.container}>
      <TextInput placeholder="Todo" value={text} onChangeText={setText} style={styles.input} />
      <Button title="Add" onPress={handleSumbit}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 2
  },
  input: {
    backgroundColor: 'ghostwhite',
    marginBottom: 8,
    padding: 8,
    height: 40
  }
})
