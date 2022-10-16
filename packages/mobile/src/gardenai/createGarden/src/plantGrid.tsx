import React, { FC, useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Entypo, FontAwesome5 } from "@expo/vector-icons";
import { useCartItem } from "../../../store/cartItems";

interface PlantGrid {}

const plantGrid = (props: PlantGrid) => {
  const setCartItems = useCartItem((state) => state.setCartItems);
  const cartItems = useCartItem((state) => state.items);
  const setPlantQuantity = useCartItem((state) => state.setPlantQuantity);

  const uniqueName: any[] = [];
  const uniqueEmployees = cartItems.filter((element) => {
    const isDuplicate = uniqueName.includes(element.name);
    if (!isDuplicate) {
      uniqueName.push(element.name);
      return true;
    }
    return false;
  });
  // useEffect(() => {
  //   setCartItems(uniqueEmployees);
  // }, [uniqueEmployees]);

  function removeCart(name: string) {
    // console.log(array);
    const newItems = cartItems.filter((item) => item.name !== name);
    setCartItems(newItems);
  }

  return (
    <ScrollView
      style={[
        {
          flexDirection: "column",
          height: "100%",
          width: "100%",
        },
      ]}
    >
      <SafeAreaView
        style={[
          { flexDirection: "row", flexWrap: "wrap", justifyContent: "center" },
        ]}
      >
        {cartItems.map((item, i) => {
          if (item.quantity == 0) {
            return <View></View>;
          } else
            return (
              <View
                key={i}
                style={[{ position: "relative", alignItems: "center" }]}
              >
                <View
                  style={[styles.plantCart, { backgroundColor: item.code }]}
                >
                  <FontAwesome5
                    name="circle"
                    size={25}
                    color="black"
                    style={[styles.quitIcon, { color: "#FF6565" }]}
                    onPress={() => {
                      removeCart(item.name);
                    }}
                    solid
                  />
                  <Text
                    style={{
                      color: "white",
                      position: "absolute",
                      right: -1,
                      top: -7,
                    }}
                    onPress={() => {
                      removeCart(item.name);
                    }}
                  >
                    x
                  </Text>
                  <Text
                    style={{
                      color: "white",
                      fontSize: Dimensions.get("screen").height / 50,
                    }}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      color: "white",
                      fontSize: Dimensions.get("screen").height / 40,
                    }}
                  >
                    {item.quantity}
                  </Text>
                </View>
              </View>
            );
        })}
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  plantCart: {
    height: Dimensions.get("screen").height / 10,
    width: Dimensions.get("screen").height / 10,
    marginHorizontal: 5,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginRight: "2%",
    marginTop: "20%",
    // padding:10,
  },
  quitIcon: {
    position: "absolute",
    right: -10,
    top: -10,
  },
  Input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "rgba(54, 34, 34, 0.25)",
    borderRadius: 10,
    backgroundColor: "#FFF9F5",
    marginTop: "10%",
    height: "25%",
    minWidth: "10%",
    textAlign: "center",
  },
  borderRed: {
    borderWidth: 1,
    borderColor: "red",
  },
});

export default plantGrid;
