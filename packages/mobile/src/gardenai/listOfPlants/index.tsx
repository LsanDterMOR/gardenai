import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
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
import axios from "axios";

interface ListOfPlantsProps {
  navigation: any;
  route: any;
}
const ListOfPlants = (props: ListOfPlantsProps) => {
  const [search, setSearch] = useState("");
  const setCartItems = useCartItem((state) => state.setCartItems);
  const cartItems = useCartItem((state) => state.items);
  // const data: any[] | null | undefined = [
  //   // { name: "tomato", code: "#1abc9c", quantity: 1 },
  //   // { name: "lettuce", code: "#2ecc71", quantity: 1 },
  //   // { name: "carot", code: "#3498db", quantity: 1 },
  // ];
  const [Plant, setPlant] = useState([]);
  function addPlant(item: any) {
    setCartItems([...cartItems, item]);
  }

  const renderListEmptyPlantList = () => {
    return (
      <View>
        <Text>No data retrieved</Text>
      </View>
    )
  }

  useEffect(() => {
    try {
      console.log("useEffect dans create garden");
      const requestPlant = async () => {
        const listOfPLants = await axios.get(
          "https://gardenai-backend.herokuapp.com/api/v1/plant/"
        );
        console.log("listOfPLants.data -> ");
        console.log(listOfPLants.data.result)
        setPlant(listOfPLants.data.result);
      };
      requestPlant();
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.pageHeader}>
          <Ionicons
            name="return-up-back-outline"
            style={styles.pageReturn}
            size={28}
            color="#65C18C"
            onPress={() => props.navigation.navigate("Gardenai")}
          />
          <Text style={styles.pageTitle}>Liste des plantes</Text>
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
          data={Plant}
          keyExtractor={(items, i) => i.toString()}
          ListEmptyComponent={renderListEmptyPlantList}
          renderItem={({ item, index }) => (
            <View style={styles.plantList} key={index}>
              {/* <Text>{item["common_name"]}</Text> */}
            </View>
          )}
        />
      </View>
    </TouchableWithoutFeedback>
    //   <Text style={styles.item} onPress={() => addPlant(item)}>
    //   // {item.name}
    //   //{" "}
    // </Text>
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
  pageHeader: {
    flexDirection: "row",
    marginTop: "10%",
    width: "100%",
  },
  pageTitle: {
    fontWeight: "bold",
    fontSize: Dimensions.get("screen").width / 10,
    fontFamily: "VigaRegular",
    marginLeft: "5%",
  },
  pageReturn: {
    marginLeft: "5%",
    alignSelf: "center",
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
  plantList: {
    width: "100%",
    borderWidth: 2,
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
