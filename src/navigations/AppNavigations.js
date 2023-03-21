import React, { useState, useMemo } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import UpcomingEvents from "../features/UpcomingEvents/UpcomingEvents.js";
import MyTickets from "../features/MyTickets/MyTickets.js";
import MyCollectionsScreen from "../features/MyCollections/MyCollectionsScreen.js";
import EventDetails from "../features/UpcomingEvents/screens/EventDetails.js";
import LoginScreen from "../features/Login/LoginScreen.js";
import SignUpScreen from "../features/Login/screens/SignUpScreen.js";
import ResetPassword1Screen from "../features/Login/screens/ResetPassword1Screen.js";
import ResetPassword2Screen from "../features/Login/screens/ResetPassword2Screen.js";
import ResetPassword3Screen from "../features/Login/screens/ResetPassword3Screen.js";
import ResetPassword4Screen from "../features/Login/screens/ResetPassword4Screen.js";
import SeatPick from "../features/UpcomingEvents/screens/SeatPick.js";
import Checkout from "../features/UpcomingEvents/screens/Checkout.js";
import PaymentCheck from "../features/UpcomingEvents/screens/PaymentCheck";
import MyTicketsInfo from "../features/MyTickets/screens/MyTicketsInfo.js";
// import { AuthProvider } from '../../hooks/useAuth.js';
// import useAuth from '../../hooks/useAuth.js';
import { UserContext } from "../contexts/UserContext/UserContext.js";
import { APIContextProvider } from "../contexts/apiContext.js";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import SendTicketGift from "../features/MyTickets/screens/SendTicketGift.js";
import ReturnTickets from "../features/MyTickets/screens/ReturnTickets.js";
import ReturnTicketAccepted from "../features/MyTickets/screens/ReturnTicketAccepted.js";
import SendTicketAccepted from "../features/MyTickets/screens/SendTicketAccepted.js";
import AddTicketForm from "../features/MyCollections/screens/AddTicketForm.js";
import AddTicketToMarketplaceOk from "../features/MyCollections/screens/AddTicketToMarketplaceOk.js";
import AddTicketToMarketPlace from "../features/MyCollections/screens/AddTicketToMarketPlace.js";
import SettingsScreen from "../features/Settings/SettingsScreen.js";
import AddTicketToMarket from "../features/MyTickets/screens/AddTicketToMarket.js";
import AddTicketToMarketOk from "../features/MyTickets/screens/AddTicketToMarketplaceOk.js";
import BuyTicketOnMarketplace from "../features/MyCollections/screens/BuyTicketOnMarketplace.js";
import DoneDealOk from "../features/MyCollections/screens/DoneDealOk.js";
import Profile from "../features/Settings/screens/Profile.js";
import SettingsUpcomingEvents from "../features/UpcomingEvents/screens/SettingsUpcomingEvents.js";
import ProfileUpcomingEvents from "../features/UpcomingEvents/screens/ProfileUpcomingEvents.js";
import SettingsMyCollections from "../features/MyCollections/screens/SettingsMyCollections.js";
import ProfileMyCollections from "../features/MyCollections/screens/ProfileMyCollections.js";
import SettingsMyTickets from "../features/MyTickets/screens/SettingsMyTickets.js";
import ProfileMyTickets from "../features/MyTickets/screens/ProfileMyTickets.js";
import ChangeNameUpcomingEvents from "../features/UpcomingEvents/screens/ChangeNameUpcomingEvents.js";
import ChangeEmailUpcomingEvents from "../features/UpcomingEvents/screens/ChangeEmailUpcomingEvents.js";
import ChangePasswordUpcomingEvents from "../features/UpcomingEvents/screens/ChangePasswordUpcomingEvents.js";
import ChangeNameMyTickets from "../features/MyTickets/screens/ChangeNameMyTickets.js";
import ChangeEmailMyTickets from "../features/MyTickets/screens/ChangeEmailMyTickets.js";
import ChangePasswordMyTickets from "../features/MyTickets/screens/ChangePasswordMyTickets.js";
import ChangeNameMyCollections from "../features/MyCollections/screens/ChangeNameMyCollections.js";
import ChangeEmailMyCollections from "../features/MyCollections/screens/ChangeEmailMyCollections.js";
import ChangePasswordMyCollections from "../features/MyCollections/screens/ChangePasswordMyCollections.js";
import NotificationsUpcomingEvents from "../features/UpcomingEvents/screens/NotificationsUpcomingEvents.js";
import NotificationsMyCollections from "../features/MyCollections/screens/NotificationsMyCollections.js";
import NotificationsMyTickets from "../features/MyTickets/screens/NotificationsMyTickets.js";
import SignUpVerifyEmail from "../features/Login/screens/SignUpVerifyEmail.js";
import SignUpVerifyEmailOk from "../features/Login/screens/SignUpVerifyEmailOk.js";
import PaymentMyCollections from "../features/MyCollections/screens/PaymentMyCollections.js";
import PaymentUpcomingEvents from "../features/UpcomingEvents/screens/PaymentUpcomingEvents.js";
import SelectQuantity from "../features/UpcomingEvents/screens/SelectQuantity.js";
import TermScreen from "../features/Login/screens/TermScreen.js";
import SelectFavorites from "../features/Login/screens/SelectFavorites.js";
import UpdateTicketToMarketPlace from "../features/MyCollections/screens/UpdateTicketToMarketplace.js";
import HelpUpcomingEvents from "../features/UpcomingEvents/screens/HelpUpcomingEvents.js";
import TermScreenUpcomingEvents from "../features/UpcomingEvents/screens/TermScreenUpcomingEvents.js";
import SelectFavoritesUpcomingEvents from "../features/UpcomingEvents/screens/SelectFavoritesUpcomingEvents.js";
import PrivacyPoliciesUpcomingEvents from "../features/UpcomingEvents/screens/PrivacyPoliciesUpcomingEvents.js";
import CancelTicketToMarketplaceOk from "../features/MyCollections/screens/CancelTicketToMarketplaceOk.js";
import ModifyTicketToMarketPlace from "../features/MyCollections/screens/ModifyTicketPriceToMarketplace.js";
import ModifyTicketPriceToMarketPlace from "../features/MyCollections/screens/ModifyTicketPriceToMarketplace.js";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// useLayoutEffect(
//   () => {
//     const token = localStorage.getItem('token')
//     if (!token) {
//       navigate('/login', { replace: true })
//     }
//   }, [])

//    function onLogin (user, token) {
//   AsyncStorage.setItem('user', JSON.stringify(user))
//     AsyncStorage.setItem('user', 'usuario1')
//   AsyncStorage.setItem('token', token)
//   user.role === 'admin' ? navigate('/', { replace: true }) : navigate('/Home', { replace: true })
//     user === null ? navigation.navigate('LoginScreen') : navigation.navigate('UpcomingEvents')
//   }

// function onLogin () {
//   // AsyncStorage.setItem('user', JSON.stringify(user))
//   // AsyncStorage.setItem('token', token)
//   navigate('/Home', { replace: true })
// }
// function onLogout () {
//   setUser(null)
// }

/* My Settings */
function SettingsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

/* My Tickets */
function MyTicketsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Mis Tickets"
        component={MyTickets}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Mis Eventos"
        component={MyTicketsInfo}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Enviar ticket como regalo"
        component={SendTicketGift}
      />
      <Stack.Screen
        name="Devolver tickets"
        component={ReturnTickets}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Devolver tickets aceptado"
        component={ReturnTicketAccepted}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Enviar tickets aceptado"
        component={SendTicketAccepted}
        options={{
          headerShown: false,
        }}
      />
      {/* <Stack.Screen
         name="SettingsMyTickets"
         component={SettingsScreen}
          options={{
            headerShown: false
          }}
       /> */}
      <Stack.Screen
        name="Agregar ticket al market"
        component={AddTicketToMarket}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Agregar ticket al market ok"
        component={AddTicketToMarketOk}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SettingsMyTickets"
        component={SettingsMyTickets}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ProfileMyTickets"
        component={ProfileMyTickets}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ChangeNameMyTickets"
        component={ChangeNameMyTickets}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ChangeEmailMyTickets"
        component={ChangeEmailMyTickets}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ChangePasswordMyTickets"
        component={ChangePasswordMyTickets}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="NotificationsMyTickets"
        component={NotificationsMyTickets}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

/* Upcoming events */
function UpcomingEventsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="UpcomingEvents"
        component={UpcomingEvents}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SeatPick"
        component={SeatPick}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EventDetails"
        component={EventDetails}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Finalizar compra"
        component={Checkout}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PaymentCheck"
        component={PaymentCheck}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SettingsUpcomingEvents"
        component={SettingsUpcomingEvents}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ProfileUpcomingEvents"
        component={ProfileUpcomingEvents}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ChangeNameUpcomingEvents"
        component={ChangeNameUpcomingEvents}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ChangeEmailUpcomingEvents"
        component={ChangeEmailUpcomingEvents}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ChangePasswordUpcomingEvents"
        component={ChangePasswordUpcomingEvents}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="NotificationsUpcomingEvents"
        component={NotificationsUpcomingEvents}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PaymentUpcomingEvents"
        component={PaymentUpcomingEvents}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SelectQuantity"
        component={SelectQuantity}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="HelpUpcomingEvents"
        component={HelpUpcomingEvents}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TermScreenUpcomingEvents"
        component={TermScreenUpcomingEvents}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SelectFavoritesUpcomingEvents"
        component={SelectFavoritesUpcomingEvents}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PrivacyPoliciesUpcomingEvents"
        component={PrivacyPoliciesUpcomingEvents}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

/* My collection */
function MyCollectionsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Ticket collections"
        component={MyCollectionsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Agregar ticket a marketplace"
        component={AddTicketToMarketPlace}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Modificar ticket a marketplace"
        component={UpdateTicketToMarketPlace}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ModifyTicketPriceToMarketPlace"
        component={ModifyTicketPriceToMarketPlace}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Agregar ticket a marketplace ok"
        component={AddTicketToMarketplaceOk}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Cancelar ticket a marketplace ok"
        component={CancelTicketToMarketplaceOk}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SettingsMyCollection"
        component={SettingsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="BuyTicketOnMarketplace"
        component={BuyTicketOnMarketplace}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DoneDealOk"
        component={DoneDealOk}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SettingsMyCollections"
        component={SettingsMyCollections}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ProfileMyCollections"
        component={ProfileMyCollections}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ChangeNameMyCollections"
        component={ChangeNameMyCollections}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ChangeEmailMyCollections"
        component={ChangeEmailMyCollections}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ChangePasswordMyCollections"
        component={ChangePasswordMyCollections}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="NotificationsMyCollections"
        component={NotificationsMyCollections}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PaymentMyCollections"
        component={PaymentMyCollections}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

/* Tab Bar */
function TabScreen() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#FF69E1",
        tabBarInactiveTintColor: "#FFF",
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: "#2D2649",
          paddingBottom: 5,
          paddingTop: 5,
        },
      }}
    >
      <Tab.Screen
        name="Upcomming events"
        component={UpcomingEventsStack}
        options={{
          headerShown: false,
          tabBarLabel: "Eventos",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="view-list"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Mis tickets"
        component={MyTicketsStack}
        options={{
          headerShown: false,
          tabBarLabel: "Mis tickets",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="ticket" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Ticket collections"
        component={MyCollectionsStack}
        options={{
          headerShown: false,
          tabBarLabel: "Coleccionables",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="ticket" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

/* Login */
function LoginStack() {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen
          name="ReduxEj"
          component={ReduxEj}
          // onLogin={onLogin}
          options={{
            headerShown: false
          }}
        /> */}
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        // onLogin={onLogin}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        // onLogin={onLogin}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignUpVerifyEmail"
        component={SignUpVerifyEmail}
        // onLogin={onLogin}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignUpVerifyEmailOk"
        component={SignUpVerifyEmailOk}
        // onLogin={onLogin}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SelectFavorites"
        component={SelectFavorites}
        // onLogin={onLogin}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ResetPassword1Screen"
        component={ResetPassword1Screen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ResetPassword2Screen"
        component={ResetPassword2Screen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ResetPassword3Screen"
        component={ResetPassword3Screen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ResetPassword4Screen"
        component={ResetPassword4Screen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TermScreen"
        component={TermScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TabScreen"
        component={TabScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

const AppNavigations = () => {
  const [user, setUser] = useState(null);
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);
  return (
    <NavigationContainer>
      <Provider store={store}>
        <UserContext.Provider value={value}>
          <APIContextProvider>
            <Stack.Navigator>
              {user ? (
                <>
                  <Stack.Screen
                    name="TabScreen"
                    component={TabScreen}
                    options={{
                      headerShown: false,
                    }}
                  />
                </>
              ) : (
                <>
                  <Stack.Screen
                    name="LoginStack"
                    component={LoginStack}
                    options={{
                      headerShown: false,
                    }}
                  />
                </>
              )}
            </Stack.Navigator>
          </APIContextProvider>
        </UserContext.Provider>
      </Provider>
    </NavigationContainer>
  );
};

export default AppNavigations;
