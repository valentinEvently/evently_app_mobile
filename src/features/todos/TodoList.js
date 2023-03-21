import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'

export function TodoList () {
  const events = useSelector((state) => state.events)
  console.log(events)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>
      {events.map((todo, index) => (
        <Text style={styles.todoText} key={index}>{`${index + 1}. ${
          todo?.text
        }`}</Text>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 12
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  todoText: {
    margin: 4
  }
})
