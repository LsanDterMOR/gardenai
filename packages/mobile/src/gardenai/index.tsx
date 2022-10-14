import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  StatusBar,
  FlatList,
  TouchableHighlight,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { useUser } from "../store/user";
import { TouchableOpacity } from "react-native-gesture-handler";

interface GardenaiProps {
  navigation: any;
}

const Gardenai = (props: GardenaiProps) => {
  const user = useUser((state) => state.user);
  const [Garden, setGarden] = useState([]);

  useEffect(() => {
    try {
      console.log("useEffect dans create garden");
      const requestData = async () => {
        const userGarden = await axios.get(
          "https://gardenai-backend.herokuapp.com/api/v1/garden/GetAll/" +
            user?.id
        );
        setGarden(userGarden.data.result);
      };
      requestData();
    } catch (e) {
      console.log(e);
    }
  }, []);

  const logout = async () => {
    props.navigation.navigate("Login");
  };
  return (
    <View style={styles.container}>
      <View style={styles.setPositionTitlePage}>
        <AntDesign
          name="logout"
          size={30}
          color="#65C18C"
          style={styles.logoutIcon}
          onPress={logout}
        />
        <Text style={styles.titlePage}>À vos potagers !</Text>
        <Ionicons
          name="add-circle-outline"
          color="#65C18C"
          style={styles.addIcon}
          size={45}
          onPress={() => props.navigation.navigate("CreateGarden")}
        />
      </View>
      <FlatList
        data={Garden}
        keyExtractor={(items, i) => i.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.setAllGarden} key={index}>
            <TouchableHighlight
              onPress={() => {
                props.navigation.navigate("Garden", {
                  garden_id: item["ID"],
                });
              }}
              style={{ flexDirection: "row" }}
            >
              <View>
                <Text style={styles.setTitleGarden}> {item["Name"]} </Text>
                <Text style={styles.setDescriptionGarden}>
                  Hauteur {item["Height"]} Largeur {item["Width"]}{" "}
                </Text>
              </View>
            </TouchableHighlight>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    alignItems: "center",
    backgroundColor: "#FFF9F5",
    paddingTop: 40,
    flex: 0,
  },
  titlePage: {
    fontWeight: "bold",
    fontSize: Dimensions.get("screen").width / 12,
    fontFamily: "VigaRegular",
    bottom: 5,
  },
  setPositionTitlePage: {
    marginTop: 20,
    flex: 1,
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  logoutIcon: {
    top: 2,
    transform: [{ rotateY: "180deg" }],
  },
  addIcon: {
    top: 0,
  },
  setAllGarden: {
    marginTop: "10%",
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
    fontSize: Dimensions.get("screen").width / 18,
    fontWeight: "bold",
  },
  setDescriptionGarden: {
    marginTop: "5%",
    fontSize: Dimensions.get("screen").width / 20,
  },
});

export default Gardenai;
