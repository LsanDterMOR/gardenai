import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  StatusBar,
} from "react-native";
import { useFonts } from "expo-font";
import Ionicons from "@expo/vector-icons/Ionicons";
import axios from "axios";

interface GardenaiProps {
  navigation: any;
}

const Gardenai = (props: GardenaiProps) => {
  const [loaded] = useFonts({
    VigaRegular: require("./src/font/Viga-Regular.ttf"),
  });
  const [Garden, setGarden] = useState(null);
  const [tmp, setTmp] = useState([
    { name: "TOMATE", code: "#1abc9c" },
    { name: "MAÏS", code: "#2ecc71" },
    { name: "PATATE", code: "#3498db" },
  ]);
  useEffect(() => {
    try {
      const requestData = async () => {
        console.log("userGarden");
        const userGarden = await axios.get(
          "https://gardenai-backend.herokuapp.com/api/v1/garden/GetAll"
        );
        console.log("userGarden -->");
        console.log(userGarden);
        console.log(userGarden.status);
      };
      console.log("request data");
      requestData();
    } catch (e) {
      console.log(e);
    }
  }, []);
  if (!loaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <View style={styles.setPositionTitlePage}>
        <Text style={styles.titlePage}>vos potager</Text>
        <Ionicons
          name="add-circle-outline"
          color="#65C18C"
          style={styles.addIcon}
          size={30}
          onPress={() => props.navigation.navigate("CreateGarden")}
        />
        {/* <FontAwesome5
          name={"plus-circle"}
          style={styles.addIcon}
          size={24}
          onPress={() => props.navigation.navigate("CreateGarden")}
        /> */}
      </View>
      {tmp.map((elem, i) => {
        return (
          <View style={styles.setAllGarden} key={i}>
            <View style={{ flexDirection: "row" }}>
              <View
                style={[styles.plantCart, { backgroundColor: elem.code }]}
              />
              <View>
                <Text style={styles.setTitleGarden}> title </Text>
                <Text style={styles.setDescriptionGarden}> Description </Text>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    paddingTop: StatusBar.currentHeight,
    alignItems: "center",
    backgroundColor: "#FFF9F5",
  },
  titlePage: {
    fontWeight: "bold",
    fontSize: Dimensions.get("screen").width / 10,
    fontFamily: "VigaRegular",
  },
  setPositionTitlePage: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "15%",
    marginLeft: "-10%",
  },
  addIcon: {
    position: "absolute",
    right: -Dimensions.get("screen").width / 4,
    top: 12,
  },
  setAllGarden: {
    marginTop: "10%",
    height: Dimensions.get("screen").height / 8,
    width: Dimensions.get("screen").width / 1.2,
    marginHorizontal: 5,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "red",
  },
  plantCart: {
    height: Dimensions.get("screen").height / 10,
    width: Dimensions.get("screen").height / 10,
    marginHorizontal: 5,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "2%",
  },
  setTitleGarden: {
    marginTop: "20%",
    fontSize: Dimensions.get("screen").width / 18,
    fontWeight: "bold",
  },
  setDescriptionGarden: {
    marginTop: "5%",
    fontSize: Dimensions.get("screen").width / 20,
  },
});

export default Gardenai;
