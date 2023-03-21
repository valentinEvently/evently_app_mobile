import React, { useRef, useEffect, useState } from 'react'
import { View, Text, StyleSheet, Animated } from 'react-native'

const SmallModal = ({ title }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const bottomPosition = useRef(new Animated.Value(100)).current

  const showModal = () => {
    setIsModalVisible(true)
    Animated.timing(bottomPosition, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true
    }).start()
  }

  const hideModal = () => {
    setTimeout(() => {
      Animated.timing(bottomPosition, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true
      }).start(() => setIsModalVisible(false))
    }, 2000)
  }

  useEffect(() => {
    showModal()
    hideModal()
  }, [])

  if (!isModalVisible) {
    return null
  }

  return (
    <Animated.View style={[styles.modalContainer, { transform: [{ translateY: bottomPosition }] }]}>
      <View style={styles.modalContent}>
        <Text className="text-base font-semibold text-white">{title}</Text>
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: '#A50285',
    padding: 0,
    borderRadius: 8

  },
  modalContent: {
    backgroundColor: '#A50285',
    padding: 8,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 8

  }

})

export default SmallModal
