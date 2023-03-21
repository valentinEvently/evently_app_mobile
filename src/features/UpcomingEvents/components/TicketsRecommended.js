import { View, Text, SectionList, StyleSheet, StatusBar } from 'react-native'
import React from 'react'
import { DATA } from '../../../constants/constants'

const TicketsRecommended = () => {
  return (
    <>
    <SectionList
          horizontal={true}
          sections={DATA}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => (
              <View style={styles.item}>
                  <Text style={styles.title}>{item}</Text>
                </View>
          )}
          renderSectionHeader={({ section: { title } }) => (
              <Text style={styles.header}>{title}</Text>
          )}
              />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 24
  }
})
export default TicketsRecommended
