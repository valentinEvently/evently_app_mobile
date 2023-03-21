import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

const ButtonPrimary = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>

  )
}

const styles = StyleSheet.create({
  button: {
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E84776',
    borderStyle: 'solid',
    marginTop: 16

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
