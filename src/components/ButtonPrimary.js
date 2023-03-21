import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { LinearGradient } from 'expo-linear-gradient'

const ButtonPrimary = ({ title, onPress }) => {
  return (
    <LinearGradient
    colors={['#FB6728', '#E84776', '#BF159E']}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    style={styles.buttonContainer}
  >

    <TouchableOpacity onPress={onPress} style={styles.button}>

      <Text style={styles.buttonText}>{title.toUpperCase()}</Text>
    </TouchableOpacity>
  </LinearGradient>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#3366CC',
    padding: 12,
    borderRadius: 20,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center'

  },
  button: {
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderRadius: 20

  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  }
})

ButtonPrimary.propTypes = {

  title: PropTypes.string.isRequired
  // onPress: PropTypes.function.isRequired

}

export default ButtonPrimary
