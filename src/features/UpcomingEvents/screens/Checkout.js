/* eslint-disable react/prop-types */
import { View, Text, TextInput, Modal, ImageBackground } from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { URL } from "../../../constants/constants.js";
import RBSheet from "react-native-raw-bottom-sheet";
import PaymentPopOver from "../components/PaymentPopOver.js";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import {
  formatTime,
  getDayNumber,
  getMonthAbbr,
  getYear,
  clearKeyAsyncStorage,
  storeData,
} from "../services/api.js";
import ButtonPrimary from "../../../components/ButtonPrimary";
import NavbarPrimary from "../../../components/NavbarPrimary";
import Lottie from "lottie-react-native";
import WebView from "react-native-webview";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Checkout = () => {
  const refRBSheet = useRef();
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const ticket = useSelector((state) => state.ticket);
  const event = useSelector((state) => state.event);
  const cart = useSelector((state) => state.cart);
  const cartFilter = cart.items.filter((item) => item.numTickets > 0);
  const [tokenValue, setTokenValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [webUrl, setWebUrl] = useState("");
  console.log("este es mi carritooo", cart);
  console.log("este es mi carrito??????");
  console.log("___sectionId", cart.items[0].sectionId);
  console.log("___numTickets", cart.items[0].numTickets);

  const onPress = () => {
    if (!open) {
      refRBSheet.current.open();
    } else {
      refRBSheet.current.close();
      handleSubmit();
    }
  };
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("@storage_Key");
      if (value !== null) {
        // value previously stored
        // console.log('valor del token', value)
        setTokenValue(value);
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  const redirectToChronosPay = async (token) => {
    try {
      const url = `${URL}/api/v1/bookings`;
      console.log("___sectionId", cart.items[0].sectionId);
      console.log("___numTickets", cart.items[0].numTickets);
      const _data = {
        section_id: cart.items[0].sectionId,
        quantity: 1,
        isWeb: false,
        isCrypto: false,
      };
      const { data } = await axios.post(url, _data, {
        headers: {
          "x-token": token,
        },
      });
      // console.log('lo que me devuelve', data)

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const openLinkInWebView = (url) => {
    // console.log('url:', url)
    setWebUrl(url);
    setLoading(false);
    setVisible(true);
  };

  async function handleSubmit() {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("@storage_Key");
      // console.log('token', token)
      const { url, reference } = await redirectToChronosPay(token);

      // console.log('esta es la referencia', reference)
      // console.log('esta es la referencia', url)
      storeData("@storage_reference", reference);
      openLinkInWebView(url);
    } catch (error) {
      console.error(error);
      // clearKeyAsyncStorage('@storage_reference')
    }
    // finally {
    //   setLoading(false)
    // }
  }
  async function checkPaymentStatus() {
    // console.log('referencia en la funcion', AsyncStorage.getItem('@storage_reference'))
    const referenceId = await AsyncStorage.getItem("@storage_reference");
    console.log("esta es la referencia", referenceId);
    try {
      const _datos = {
        reference: referenceId,
      };
      const url = `${URL}/api/v1/bookings/check_payment`;
      const response = await axios.post(url, _datos, {
        headers: { "x-token": tokenValue },
      });
      console.log("respuesta de check pago", response.data);
    } catch (error) {
      // setLoading(false)
      // clearKeyAsyncStorage('@storage_reference')
      console.error(error);
      throw error;
    } finally {
      // si responde que el pago fue correcto generar ticket
      // clearKeyAsyncStorage('@storage_reference')
      // generateTicket()
      navigation.navigate("PaymentCheck");
      // setLoading(false)
    }
  }

  const handleMessage = async (event) => {
    if (event.nativeEvent.data === "back") {
      await checkPaymentStatus();
      // navigation.navigate('PaymentCheck')
      // generateTicket()
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return loading ? (
    <View className="flex-1 bg-secondary ">
      <View className="flex-1 justify-end items-center pb-7">
        <Lottie
          className="h-28 w-28"
          source={require("../../../../assets/loading2.json")}
          autoPlay
          loop
        />
      </View>
      <View className="flex-1 items-center ">
        <Text className="text-white font-lg font-semibold">
          Redireccionando a Chronos Pay...
        </Text>
      </View>
    </View>
  ) : (
    <View className="flex-1 bg-secondary pb-6">
      <NavbarPrimary title="Resumen de compra" />

      <ScrollView className="flex-1 pl-4 pr-4">
        <View className="flex-1 ">
          <View className="flex-1 flex-row p-2 rounded-md h-32">
            <View className="flex-1 flex-row">
              <ImageBackground
                className="flex-2 flex-end"
                source={{ uri: event.cover_image }}
                resizeMode="cover"
                imageStyle={{ borderRadius: 12, width: 100, height: 117 }}
              ></ImageBackground>
            </View>
            <View className="flex-1 items-between">
              <Text className="text-white text-xl">{event.name}</Text>
              <Text className="text-secondary text-sm pt-1">
                <Text>{getDayNumber(ticket.date)}</Text>{" "}
                <Text>{getMonthAbbr(ticket.date)}</Text>{" "}
                <Text>{getYear(ticket.date)}</Text>, {formatTime(ticket.time)}{" "}
                hs
              </Text>
              <Text className="text-secondary text-sm pt-1">
                {ticket.place}, {ticket.address}
              </Text>
            </View>
          </View>
          {cartFilter.map((item, index) => (
            <View
              key={index}
              className="flex-1 flex-row h-32 p-2 mt-2 rounded-md"
            >
              <View className="flex-1 flex-row">
                <ImageBackground
                  className="flex-1 flex-end"
                  source={{ uri: event.cover_image }}
                  resizeMode="cover"
                  imageStyle={{ borderRadius: 12, width: 70, height: 93 }}
                ></ImageBackground>
              </View>
              <View className="flex-1 flex-row">
                <View className="flex-1 items-between">
                  <Text className=" text-darkGray text-sm">Sección</Text>
                  <Text className=" text-white text-sm">{item.area}</Text>
                  <Text className=" text-darkGray text-sm pt-1">Precio</Text>
                  <Text className="text-secondary text-sm">${item.price}</Text>
                </View>
              </View>
              <View className="flex-1">
                <Text className=" text-darkGray text-sm">Cantidad</Text>
                <Text className=" text-white text-sm">{item.numTickets}</Text>
              </View>
            </View>
          ))}

          <View className="flex-row justify-between pt-4">
            <Text className="font-semibold text-secondary text-md">
              Subtotal
            </Text>
            <Text className="font-semibold text-secondary text-md">
              $ {cart.priceTotal}
            </Text>
          </View>
          <View className="flex-row justify-between pt-2">
            <Text className="font-semibold text-secondary text-md">
              Comisión de servicio
            </Text>
            <Text className="font-semibold text-secondary text-md">0 ARS</Text>
          </View>
          <View className="flex-row justify-between pt-2">
            <Text className="font-semibold text-secondary text-md">
              Descuento
            </Text>
            <Text className="font-semibold text-secondary text-md">0 ARS</Text>
          </View>
          <View className="flex-row items-center space-x-2 pb-4 mt-4">
            <View className="flex-row items-center space-x-2 pb-2">
              <TextInput
                placeholderTextColor="#6D7D8D"
                placeholder="Ingresar codigo de descuento"
                keyboardType="default"
                className="flex-row flex-1 space-x-2 bg-inputPrimary text-white p-2 rounded"
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <View className="flex-2 justify-end pl-6 pr-6">
        <View className="flex-row justify-between pt-2 pb-4">
          <Text className="font-semibold text-white text-2xl">Total</Text>
          <Text className="font-semibold text-white text-2xl">
            $ {cart.priceTotal}
          </Text>
        </View>
        <ButtonPrimary
          color="#F207A0"
          title="FINALIZAR COMPRA"
          onPress={() => {
            // navigation.navigate('PaymentUpcomingEvents')
            console.log("checkout");
            console.log("___sectionId", cart.items[0].sectionId);
            console.log("___numTickets", cart.items[0].numTickets);
            refRBSheet.current.open();
          }}
        />
      </View>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent",
          },
          draggableIcon: {
            backgroundColor: "#98ABC0",
          },
          container: {
            borderTopEndRadius: 22,
            borderTopStartRadius: 22,
            height: "auto",
            backgroundColor: "#2D2649",
          },
        }}
      >
        <PaymentPopOver onPress={onPress} />
      </RBSheet>
      <Modal
        visible={visible}
        transparent={true}
        animationType={"slide"}
        onRequestClose={() => setVisible(false)}
      >
        {/* <WebView source={{ uri: webUrl }} /> */}
        <WebView source={{ uri: webUrl }} onMessage={handleMessage} />
      </Modal>
    </View>
  );
};

export default Checkout;
