import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import { UserContext } from '../../../contexts/UserContext/UserContext'
import NavbarPrimary from '../../../components/NavbarPrimary'

const ProfileUpcomingEvents = () => {
  const navigation = useNavigation()
  const { user, setUser } = useContext(UserContext)

  return (
    <View className="bg-secondary flex-1">

      <NavbarPrimary title="Mi Perfil" />
      <View className="items-center justify-center pt-4 pb-4">
        <TouchableOpacity className="h-28 flex-row items-center" style={styles.containerAvatar}>
          <Image
            style={styles.avatar}
            source={require('../../../../assets/Profile.png')}
          />
          <View className="bg-slate-500 justify-end -pl-4" style={styles.containerButton}>
            <Image
              style={styles.edit}
              source={require('../../../../assets/Edit.png')}
            />
          </View>
        </TouchableOpacity>

      </View>

      <TouchableOpacity className="flex-row p-4 m-4 bg-inputPrimary rounded-md" onPress={() => navigation.navigate('ChangeNameUpcomingEvents')}>
        <View className="flex-1 justify-between">
            <View className="">
              <Text className="pl-2 text-secondary">Nombre y Apellido</Text>
            </View>
            <View className="flex-2" >
                  <Text className="pl-2 text-tertiary">{user.name}</Text>
            </View>
        </View>
        <View className="flex-2 justify-center items-center">
        <Image
                    style={styles.iconMini}
                    source={require('../../../../assets/edit2.png')}
                  />
        </View>
      </TouchableOpacity>

      <View className=" m-4 bg-inputPrimary rounded-md">

      <TouchableOpacity className="flex-row m-4 bg-inputPrimary rounded-md" onPress={() => navigation.navigate('ChangeEmailUpcomingEvents')}>
        <View className="flex-1 justify-between">
            <View>
              <Text className=" text-secondary">Email</Text>
            </View>
            <View className="flex-2" >
                  <Text className=" text-tertiary">{user.email}</Text>
            </View>
        </View>
        <View className="flex-2 justify-center items-center">
        <Image
                    style={styles.iconMini}
                    source={require('../../../../assets/edit2.png')}
                  />
        </View>
      </TouchableOpacity>

      <TouchableOpacity className="flex-row m-4 bg-inputPrimary rounded-md" onPress={() => navigation.navigate('ChangePasswordUpcomingEvents')}>
        <View className="flex-1 justify-between">
            <View className="">
              <Text className="text-secondary">Contraseña</Text>
            </View>
            <View className="flex-2" >
                  <Text className="text-tertiary">********</Text>
            </View>
        </View>
        <View className="flex-2 justify-center items-center">
        <Image
                    style={styles.iconMini}
                    source={require('../../../../assets/edit2.png')}
                  />
        </View>
      </TouchableOpacity>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({

  avatar: {
    height: 100,
    width: 100
  },
  containerAvatar: {
    height: 100
  },
  containerButton: {
    height: 100

  },
  edit: {
    height: 28,
    width: 28,
    marginLeft: -30
  },
  iconMini: {
    width: 18,
    height: 18
  }

})

export default ProfileUpcomingEvents
