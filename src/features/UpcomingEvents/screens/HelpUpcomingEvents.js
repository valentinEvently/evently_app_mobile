import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Toggle from 'react-native-toggle-element'
import NavbarPrimary from '../../../components/NavbarPrimary.js'
import { ScrollView } from 'react-native-gesture-handler'
import ButtonPrimary from '../../../components/ButtonPrimary.js'
import Ionicons from 'react-native-vector-icons/Ionicons'
import DropDownBullet from '../components/DropDownBullet.js'

const HelpUpcomingEvents = () => {
  const navigation = useNavigation()
  const [toggleValue, setToggleValue] = useState(false)
  const [email, setEmail] = useState('')
  const [errorEmail, setErrorEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorPassword, setErrorPassword] = useState('')
  const [hidePassword, setHidePassword] = useState(true)
  const [name, setName] = useState('')
  const [errorName, setErrorName] = useState('')

  return (
    <View className="bg-secondary pt-4 flex-1">
        <NavbarPrimary title='Ayuda'/>

      {/* Toggle button */}
      <View className="items-center">
        <Toggle
        value={toggleValue}
        onPress={(val) => setToggleValue(val)}
        leftComponent={
          <Text className={toggleValue ? 'text-white' : 'text-white font-bold'}>Contactanos</Text>
        }
        rightComponent={
          <Text className={toggleValue ? 'text-white font-bold' : 'text-white'}>FAQ</Text>
        }
        trackBar={{
          width: 300,
          height: 50,
          radius: 25,
          activeBackgroundColor: '#2D2649',
          inActiveBackgroundColor: '#2D2649',
          borderActiveColor: '#2D2649',
          borderInActiveColor: '#2D2649',
          borderWidth: 6
        }}
        thumbButton={{
          width: 150,
          height: 50,
          radius: 30,
          margin: 20,
          padding: 20,
          activeBackgroundColor: '#080029',
          inActiveBackgroundColor: '#080029'

        }}
        />
      </View>

      {/* Component */}
      {
      toggleValue
        ? <View className="flex-1 bg-secondary pt-6">
            <DropDownBullet
            title='¿Cómo puedo ver todos los conciertos que se celebran en mi localidad?'
            text='Para ver todos los eventos que se celebran en tus ciudades, independientemente de los artistas que estés siguiendo, sólo tienes que ir a la pestaña "Más" y pulsar "Conciertos en tus ciudades".
            Desde aquí, podrás ver una lista cronológica de todos los eventos que se celebran en cada una de las ciudades que sigues. Desplázate por las ciudades seguidas con el botón de flecha, y puedes saltar a una fecha específica en el futuro con el icono del calendario en la esquina superior derecha. '
            />
            <DropDownBullet
            title='¿Cómo puedo ver todos los conciertos que se celebran en mi localidad?'
            text='Para ver todos los eventos que se celebran en tus ciudades, independientemente de los artistas que estés siguiendo, sólo tienes que ir a la pestaña "Más" y pulsar "Conciertos en tus ciudades".
            Desde aquí, podrás ver una lista cronológica de todos los eventos que se celebran en cada una de las ciudades que sigues. Desplázate por las ciudades seguidas con el botón de flecha, y puedes saltar a una fecha específica en el futuro con el icono del calendario en la esquina superior derecha. '
            />

        </View>
        : <View className="flex-1 bg-secondary p-6">
            <ScrollView className="flex-1">
                <Text className="text-white text-base">Agradecemos los comentarios y sugerencias de nuestros clientes sobre la app. Si tenés alguno contactanos.</Text>
                <View className="flex-1 pt-4 ">
                <View className="pb-2">
            <Text className="text-secondary">Nombre</Text>
          <View className="flex-row items-center space-x-2 pb-2 mt-2" >
                <TextInput
                placeholder='Nombre'
                placeholderTextColor='#6D7D8D'
                keyboardType='default'
                value={name}
                name={name}
                onChangeText={(text) => setName(text) }
                className="flex-row flex-1 space-x-2 bg-inputPrimary text-white p-2 rounded"
                />
          </View>
          {errorName && <Text className="text-tertiary">{errorName}</Text>}

          </View>

          <View className="pb-2">
          <Text className="text-secondary">Correo electrónico</Text>
          <View className="flex-row items-center space-x-2 pb-2 mt-2" >
                <TextInput
                placeholder='Correo electrónico'
                placeholderTextColor='#6D7D8D'
                keyboardType='default'
                value={email}
                name={email}
                onChangeText={(text) => setEmail(text) }
                className="flex-row flex-1 space-x-2 bg-inputPrimary text-white p-2 rounded"
                />
          </View>
          {errorEmail && <Text className="text-tertiary">{errorEmail}</Text>}
          </View>
          <View>
            <View className="pb-2">
                <Text className="text-secondary">Mensaje</Text>
            <View className=" bg-inputPrimary rounded mt-2" >
                <TextInput
                placeholder='Mensaje'
                placeholderTextColor='#6D7D8D'
                keyboardType='default'
                value={email}
                name={email}
                multiline={true}
                numberOfLines={4}
                onChangeText={(text) => setEmail(text) }
                className="bg-inputPrimary text-white rounded align-top items-start p-2"
                style={{
                  textAlignVertical: 'top',
                  alignItems: 'flex-start'
                }}

                />
          </View>
          {errorPassword && <Text className="text-tertiary  ">{errorPassword}</Text>}
          </View>

            </View>

                </View>
            </ScrollView>
            <View className="flex-2">
                <ButtonPrimary title='Enviar mensaje' onPress={() => console.log('HOLA')}/>
            </View>
          </View>

      }

    </View>
  )
}

export default HelpUpcomingEvents
