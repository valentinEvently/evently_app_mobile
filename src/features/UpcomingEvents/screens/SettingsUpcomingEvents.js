import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native'
import { UserContext } from '../../../contexts/UserContext/UserContext.js'
import NavbarPrimary from '../../../components/NavbarPrimary'
import Svg, { SvgProps, Path, Circle } from 'react-native-svg'

const SettingsUpcomingEvents = () => {
  const navigation = useNavigation()
  const { setUser } = useContext(UserContext)

  return (
    <View className="bg-secondary flex-1">

      <NavbarPrimary title='Configuración'/>

      <TouchableOpacity className="p-4 m-4 bg-inputPrimary rounded-md" onPress={() => navigation.navigate('ProfileUpcomingEvents')}>
        <View className="flex-row justify-between">
            <View className="flex-row justify-center items-center">
            <Svg
              width={16}
              height={19}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              {...SvgProps}
            >
              <Path
                d="M1 18v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1M12 5a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
                stroke="#CDCDCD"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
              <Text className="pl-2 text-white">Mi Perfil</Text>
            </View>
            <View className="flex-2 ml-3 justify-center" >
                  <Ionicons name="md-chevron-forward-sharp" size={22} color='#CDCDCD'/>
            </View>
        </View>
      </TouchableOpacity>

      <View className=" m-4 bg-inputPrimary rounded-md">
        <TouchableOpacity className="p-4 flex-row justify-between" onPress={() => navigation.navigate('NotificationsUpcomingEvents')}>
            <View className="flex-row justify-center items-center">
            <Svg
              width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
              {...SvgProps}
            >
    <Path
      d="m5.825 13.934-.544-.517.544.517ZM7.75 9A4.25 4.25 0 0 1 12 4.75v-1.5A5.75 5.75 0 0 0 6.25 9h1.5Zm0 2.756V9h-1.5v2.756h1.5ZM5.75 16c0-.6.234-1.145.618-1.55l-1.087-1.033A3.74 3.74 0 0 0 4.25 16h1.5Zm1.25.25H6v1.5h1v-1.5Zm10 0H7v1.5h10v-1.5Zm1 0h-1v1.5h1v-1.5Zm-.369-1.8c.384.405.619.95.619 1.55h1.5c0-1-.393-1.91-1.031-2.583l-1.088 1.034ZM16.25 9v2.756h1.5V9h-1.5ZM12 4.75A4.25 4.25 0 0 1 16.25 9h1.5A5.75 5.75 0 0 0 12 3.25v1.5Zm6.719 8.667c-.602-.633-.969-1.147-.969-1.66h-1.5c0 1.181.816 2.098 1.381 2.694l1.088-1.034ZM4.25 16c0 .966.784 1.75 1.75 1.75v-1.5a.25.25 0 0 1-.25-.25h-1.5ZM18 17.75A1.75 1.75 0 0 0 19.75 16h-1.5a.25.25 0 0 1-.25.25v1.5ZM6.25 11.756c0 .514-.367 1.028-.969 1.661l1.087 1.034c.566-.596 1.382-1.513 1.382-2.695h-1.5Z"
      fill="#CDCDCD"
    />
    <Path
      d="M13.798 19.877a2 2 0 0 1-3.62-.05M12 3v1"
      stroke="#CDCDCD"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
              <Text className="pl-2 text-white">Notificaciones</Text>
            </View>
            <View className="flex-2 ml-3 justify-center" >
                  <Ionicons name="md-chevron-forward-sharp" size={22} color='#CDCDCD'/>
            </View>
        </TouchableOpacity>
        <TouchableOpacity className="pr-4 pl-4 pb-4 flex-row justify-between" onPress={() => navigation.navigate('SelectFavoritesUpcomingEvents')}>
            <View className="flex-row justify-center items-center">
                <Svg
                  width={20}
                  height={20}
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  {...SvgProps}
                >
                  <Path
                    d="M9.4 11.5v3.425c0 .267.125.43.375.488.25.058.442-.03.575-.263l3.025-5.925a.466.466 0 0 0-.025-.487.475.475 0 0 0-.425-.238H10.75V5.025c0-.267-.125-.433-.375-.5s-.442.017-.575.25l-3.15 6c-.083.183-.079.35.013.5a.45.45 0 0 0 .412.225H9.4ZM10 20a9.733 9.733 0 0 1-3.9-.788 10.092 10.092 0 0 1-3.175-2.137c-.9-.9-1.612-1.958-2.137-3.175A9.732 9.732 0 0 1 0 10c0-1.383.263-2.683.788-3.9a10.092 10.092 0 0 1 2.137-3.175c.9-.9 1.958-1.613 3.175-2.138A9.743 9.743 0 0 1 10 0c1.383 0 2.683.262 3.9.787a10.105 10.105 0 0 1 3.175 2.138c.9.9 1.612 1.958 2.137 3.175A9.733 9.733 0 0 1 20 10a9.733 9.733 0 0 1-.788 3.9 10.092 10.092 0 0 1-2.137 3.175c-.9.9-1.958 1.612-3.175 2.137A9.733 9.733 0 0 1 10 20Zm0-2c2.217 0 4.104-.779 5.663-2.337C17.221 14.104 18 12.217 18 10s-.779-4.104-2.337-5.663C14.104 2.779 12.217 2 10 2s-4.104.779-5.662 2.337C2.779 5.896 2 7.783 2 10s.78 4.104 2.338 5.663C5.896 17.221 7.783 18 10 18Z"
                    fill="#CDCDCD"
                  />
                </Svg>
              <Text className="pl-2 text-white">Tu Evently</Text>
            </View>
            <View className="flex-2 ml-3 justify-center" >
                  <Ionicons name="md-chevron-forward-sharp" size={22} color='#CDCDCD'/>
            </View>
        </TouchableOpacity>
      </View>

      <View className=" m-4 bg-inputPrimary rounded-md">
        <TouchableOpacity className="p-4 flex-row justify-between" onPress={() => navigation.navigate('PrivacyPoliciesUpcomingEvents')}>
            <View className="flex-row justify-center items-center">
            <Svg
              width={24}
              height={24}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              {...SvgProps}
            >
              <Path
                d="m9.349 11.5 2 2L15.5 9.349m-3.775-6.27-6 1.714A1 1 0 0 0 5 5.754v5.1a10 10 0 0 0 4.188 8.137l2.23 1.594a1 1 0 0 0 1.163 0l2.231-1.594A10 10 0 0 0 19 10.854v-5.1a1 1 0 0 0-.725-.961l-6-1.714a1 1 0 0 0-.55 0Z"
                stroke="#CDCDCD"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
              <Text className="pl-2 text-white">Políticas de privacidad</Text>
            </View>
            <View className="flex-2 ml-3 justify-center" >
                  <Ionicons name="md-chevron-forward-sharp" size={22} color='#CDCDCD'/>
            </View>
        </TouchableOpacity>
        <TouchableOpacity className="pr-4 pl-4 pb-4 flex-row justify-between" onPress={() => navigation.navigate('TermScreenUpcomingEvents')}>
            <View className="flex-row justify-center items-center">
            <Svg
              width={24}
              height={24}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              {...SvgProps}
            >
              <Path
                d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 12h6M9 16h3"
                stroke="#CDCDCD"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Path
                d="M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2H9V5Z"
                stroke="#CDCDCD"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
              <Text className="pl-2 text-white">Términos de uso</Text>
            </View>
            <View className="flex-2 ml-3 justify-center" >
                  <Ionicons name="md-chevron-forward-sharp" size={22} color='#CDCDCD'/>
            </View>
        </TouchableOpacity>
        <TouchableOpacity className="pr-4 pl-4 pb-4 flex-row justify-between" onPress={() => navigation.navigate('HelpUpcomingEvents')}>
            <View className="flex-row justify-center items-center">
            <Svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...SvgProps}
  >
    <Path
      d="M9 10a3 3 0 1 1 3 3v1m9-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      stroke="#CDCDCD"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle cx={12} cy={17} r={1} fill="#CDCDCD" />
  </Svg>
              <Text className="pl-2 text-white">Ayuda</Text>
            </View>
            <View className="flex-2 ml-3 justify-center" >
                  <Ionicons name="md-chevron-forward-sharp" size={22} color='#CDCDCD'/>
            </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity className="p-4 m-4 bg-inputPrimary rounded-md" onPress={() => setUser(null)}>
        <View className="flex-row justify-between">
            <View className="flex-row justify-center items-center">
            <Svg
              width={19}
              height={20}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              {...SvgProps}
            >
              <Path
                d="M12 14.5V17a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v3.063M8 10h10m0 0-2.5-2.5M18 10l-2.5 2.5"
                stroke="#CDCDCD"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
              <Text className="pl-2 text-white">Salir</Text>
            </View>
            <View className="flex-2 ml-3 justify-center" >
            <Ionicons name="md-chevron-forward-sharp" size={22} color='#CDCDCD'/>
            </View>
        </View>
      </TouchableOpacity>

    </View>
  )
}

export default SettingsUpcomingEvents
