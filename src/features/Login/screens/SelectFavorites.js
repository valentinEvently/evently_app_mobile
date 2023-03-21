import { View, Text, ImageBackground, ScrollView, TextInput, StyleSheet, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import ButtonPrimary from '../../../components/ButtonPrimary'
import { LinearGradient } from 'expo-linear-gradient'
import axios from 'axios'
import { URL } from '../../../constants/constants'
import ButtonSecondary from '../../../components/ButtonSecondary'
import { useNavigation } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux'
import { toggleVisible } from '../../../redux/features/musicFavoriteSlice'

const SelectFavorites = (props) => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const musicGenres = useSelector((state) => state.music)

  return (
    <View className="flex-1 bg-secondary">
      <ImageBackground resizeMode="cover" style={styles.background}
        source={require('../../../../assets/backgroundLogin.png')}>
        <LinearGradient
          colors={['rgba(0.8,8,0,41)', 'rgba(0.8,8,0,41)', 'transparent']}
          locations={[0, 0.5, 1]}
          className="w-full h-full justify-top rounded-t-xl p-6"
          >
              <View className="flex-2 justify-center items-center">
                <View className="items-center pt-4 pb-5">
                 <Image
                    style={styles.logo}
                    source={require('../../../../assets/LogoEvently.png')}
                  />
              </View>

              </View>

               {/* bottom */}
               <View className="flex-1">
                    <Text className="text-lightGray text-lg mb-2">Tus preferencias musicales</Text>
                    <Text className="text-darkGray text-base">Seleccioná a continuación los géneros que sean de tu gusto.</Text>
                    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {musicGenres && musicGenres.map(genero => (
          genero.visible
            ? <LinearGradient
            key={genero.length}
            colors={['#FB6728', '#E84776', '#BF159E']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.buttonContainer}
          >
            <TouchableOpacity
            onPress={() => dispatch(toggleVisible(genero))}
            >
              <Text className="text-white text-base">{genero.nombre}</Text>
            </TouchableOpacity>

            </LinearGradient>
            : <TouchableOpacity
             onPress={() => dispatch(toggleVisible(genero))}
             className=" border-solid border-2 border-borderBottom rounded-lg justify-center items-center m-1 p-2"
            >
              <Text className="text-white text-base">{genero.nombre}</Text>
            </TouchableOpacity>
        ))}
      </ScrollView>
    </View>

              </View>
              <View className="flex-2">
                    <ButtonPrimary title='CONTINUAR' onPress={e => navigation.navigate('LoginScreen')}/>
                    <ButtonSecondary title='CANCELAR' onPress={() => navigation.goBack()}/>

              </View>

        </LinearGradient>
      </ImageBackground>
    </View>
  )
}
const styles = StyleSheet.create({
  logo: {
    width: 127,
    height: 50
  },
  background: {
    flex: 1,
    justifyContent: 'center'

  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

    paddingTop: 10
  },
  scrollViewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1

  },
  generoContainer: {
    color: 'white',
    borderRadius: 10,
    padding: 10,
    margin: 5
  },
  buttonContainer: {
    backgroundColor: '#3366CC',
    padding: 8,
    borderRadius: 10,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4

  },
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

  }

})

export default SelectFavorites
