import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
  StatusBar,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { useCartItem } from "../../store/cartItems";

interface ListOfPlantsProps {
  navigation: any;
  route : any
}
const ListOfPlants = (props: ListOfPlantsProps) => {
  const [search, setSearch] = useState("");
  const setCartItems = useCartItem((state) => state.setCartItems);
  const cartItems = useCartItem((state) => state.items)

  function addPlant(item : any) {
    setCartItems([...cartItems, item])
    console.log("cartItem")
    console.log(cartItems)
      
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: "15%",
            marginLeft: "10%",
          }}
        >
          <Ionicons
            name="return-up-back-outline"
            style={styles.quitIcon}
            size={28}
            color="#65C18C"
            onPress={() => props.navigation.goBack()}
          />
          {/* <FontAwesome5 name="arrow-left" size={24} color="black" style={styles.quitIcon} onPress={() => props.navigation.goBack()} /> */}
          <Text style={styles.titlePage}>Liste des plantes</Text>
        </View>
        <View style={{ paddingTop: "15%", height: "14%" }}>
          <TextInput
            style={styles.Input}
            placeholder="recherche"
            placeholderTextColor="#000"
            onChangeText={(text) => console.log(text)}
          ></TextInput>
        </View>
        <FlatList
          data={cartItems}
          keyExtractor={(items, i) => i.toString()}
          renderItem={({ item }) => (
            <Text style={styles.item} onPress={() => addPlant(item)} >{item.name}</Text>
          )}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    backgroundColor: "#FFFBF9",
    alignItems: "center",
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  titlePage: {
    fontWeight: "bold",
    fontSize: Dimensions.get("screen").width / 10,
    fontFamily: "VigaRegular",
  },
  quitIcon: {
    position: "absolute",
    left: -Dimensions.get("screen").width / 10,
    top: 13,
  },
  Input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "rgba(54, 34, 34, 0.25)",
    minWidth: "80%",
    borderRadius: 10,
    backgroundColor: "#FFF9F5",
    paddingLeft: 20,
    marginTop: "5%",
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  borderRed: {
    borderWidth: 2,
    borderColor: "red",
  },
});

export default ListOfPlants;
