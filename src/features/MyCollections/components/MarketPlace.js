/* eslint-disable react/prop-types */
import React, { useLayoutEffect } from "react";
import {
  FlatList,
  Text,
  View,
  TouchableHighlight,
  Image,
  StatusBar,
  StyleSheet,
  ImageBackground,
  Button,
  TouchableOpacity,
} from "react-native";
import { RecipeCard } from "../../../AppStyles";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import RBSheet from "react-native-raw-bottom-sheet";
import {
  getDayNumber,
  getMonthAbbr,
  getYear,
} from "../../MyTickets/services/api";

export default function MarketPlace(props) {
  const navigation = useNavigation();
  const { route, events } = props;
  const item = route?.params?.category;
  const onPressTicket = (item) => {
    navigation.navigate("BuyTicketOnMarketplace", { item });
  };

  const renderTickets = ({ item }) => (
    <TouchableOpacity
      className="pl-4 pr-4 pb-2 h-32"
      underlayColor="none"
      onPress={() => onPressTicket(item)}
    >
      <View className="flex-1 flex-row bg-inputPrimary h-32 p-2 rounded-md">
        <View className="flex-1 flex-row">
          <ImageBackground
            className="flex-1 mr-1"
            source={{ uri: item?.image }}
            resizeMode="cover"
            imageStyle={{ borderRadius: 12 }}
          ></ImageBackground>
          <View className="flex-2 bg-black rounded-md p-2 justify-between ml-1">
            <View>
              <Text className="text-lightGray text-sm">
                {getYear(item?.date)}
              </Text>
            </View>
            <View>
              <Text className="text-white text-sm">
                {getMonthAbbr(item?.date)}
              </Text>
              <Text className="text-white font-bold text-2xl">
                {getDayNumber(item?.date)}
              </Text>
            </View>
          </View>
        </View>
        <View className="flex-1 p-2 items-between justify-between">
          <View className="flex-1">
            <Text className="font-bold text-white text-md">
              {item?.name && item?.name}
            </Text>
            <Text className="text-lightGray text-md">
              {item?.address && item?.address}
            </Text>
          </View>
          <View className="flex-1 justify-end">
            <Text className="text-lightGray text-base font-semibold">
              ${item?.resale_price && item?.resale_price}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="pb-40 bg-secondary pt-5">
      <FlatList
        vertical
        showsVerticalScrollIndicator={false}
        numColumns={1}
        data={events}
        renderItem={renderTickets}
        keyExtractor={(item) => `${item?.pk}`}
      />
    </View>
  );
}
