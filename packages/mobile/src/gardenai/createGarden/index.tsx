import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import PlantGrid from "./src/plantGrid";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useCartItem } from "../../store/cartItems";
import axios from "axios";
import { useUser } from "../../store/user";

interface CreateGardenProps {
  navigation: any;
}

axios.interceptors.request.use((response) => {
  console.log("request sent, waiting ...");
  return response;
}, (error) => {
  console.log("request error");
  return Promise.reject(error);
});
axios.interceptors.response.use((response) => {
  console.log("response received !");
  return response;
}, (error) => {
  console.log("response error");
  return Promise.reject(error);
});

const CreateGarden = (props: CreateGardenProps) => {
  const [LengthSize, setLengthSize] = useState(20);
  const [WidthSize, setWidthSize] = useState(50);
  const [Name, setName] = useState("");
  const cartItems = useCartItem((state) => state.items);
  const setCartItems = useCartItem((state) => state.setCartItems);
  const userId = useUser((state) => state.user);

  useEffect(() => {
    const screenWidth = Dimensions.get("screen").width;
    const screenHeight = Dimensions.get("screen").height;
  }, []);

  useEffect(() => {});

  function TitleFunction(text: string, marginTopValue: string) {
    return (
      <View style={{ marginTop: marginTopValue }}>
        <Text style={styles.titleStep}>{text}</Text>
      </View>
    );
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: "10%",
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
          <Text style={styles.titlePage}>Créer un potager</Text>
        </View>
        {TitleFunction("Jardin", "0%")}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flex: 1 }} />
          <TextInput
            style={styles.InputGardenName}
            placeholder="Nom du jardin"
            placeholderTextColor="#000"
            onChangeText={setName}
          ></TextInput>
          <View style={{ flex: 1 }} />
        </View>

        {TitleFunction("Mesures", "2%")}

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flex: 1 }} />
          <TextInput
            style={styles.Input}
            placeholder="Longueur"
            placeholderTextColor="#000"
            keyboardType="number-pad"
            onChangeText={(text) => setLengthSize(parseInt(text))}
          ></TextInput>
          <View style={{ flex: 1 }} />
          <TextInput
            style={styles.Input}
            placeholder="Largeur"
            placeholderTextColor="#000"
            keyboardType="number-pad"
            onChangeText={(text) => setWidthSize(parseInt(text))}
          ></TextInput>
          <View style={{ flex: 1 }} />
        </View>
        {TitleFunction("Plantes", "2%")}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: "3%",
          }}
        >
          <View style={{ flex: 2 }} />
          <TouchableOpacity
            style={styles.PlantButton}
            onPress={() => props.navigation.navigate("Camera")}
          >
            <Ionicons name="camera-outline" size={24} color="#65C18C" />
            {/* <FontAwesome5 name="camera" size={24} color="#65C18C" /> */}
            <Text>Photo</Text>
          </TouchableOpacity>
          <View style={{ flex: 1 }} />
          <TouchableOpacity
            style={styles.PlantButton}
            onPress={() => props.navigation.navigate("ListOfPlants")}
          >
            <Ionicons name="library-outline" size={24} color="#65C18C" />
            {/* <FontAwesome5 name="book" size={24} color="#65C18C" /> */}
            <Text>Glossaire</Text>
          </TouchableOpacity>
          <View style={{ flex: 2 }} />
        </View>

        <PlantGrid />
        <View style={[styles.setValidateBtn]}>
          <TouchableOpacity
            style={[styles.validateButton]}
            onPress={async () => {
              try {
                const createGarden = await axios.post(
                  "https://gardenai-backend.herokuapp.com/api/v1/garden/Create",
                  {
                    Name: Name,
                    Height: LengthSize,
                    Width: WidthSize,
                    PlantList: cartItems,
                    UserId: userId?.id,
                  }
                );
                console.log("createGarden -> ", createGarden.status);
                console.log(createGarden.data);
                if (createGarden.status == 200) {
                  props.navigation.navigate("Garden", {
                    garden_id: createGarden.data.result,
                  });
                }
              } catch (e) {
                console.log("Garden creation failed: " + e);
              }
            }}
          >
            <Text
              style={{
                fontSize: Dimensions.get("screen").height / 25,
                color: "#FFF",
                fontWeight: "bold",
                fontFamily: "VigaRegular",
              }}
            >
              valider
            </Text>
          </TouchableOpacity>
        </View>
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
  titleStep: {
    fontWeight: "bold",
    fontSize: Dimensions.get("screen").width / 15,
    color: "#65C18C",
    position: "relative",
    left: -Dimensions.get("screen").width / 3,
    fontFamily: "VigaRegular",
  },
  quitIcon: {
    position: "absolute",
    left: -Dimensions.get("screen").width / 10,
    top: 13,
  },
  PlantButton: {
    flex: 7,
    height: Dimensions.get("screen").height / 10, //Dimensions.get("window").height /5,
    borderWidth: 2,
    borderColor: "rgba(54, 34, 34, 0.25)",
    backgroundColor: "#FFF9F5",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  Input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "rgba(54, 34, 34, 0.25)",
    minWidth: "40%",
    minHeight: "5%",
    borderRadius: 10,
    backgroundColor: "#FFF9F5",
    paddingLeft: 20,
    marginTop: "3%",
  },
  InputGardenName: {
    flex: 1,
    borderWidth: 1,
    borderColor: "rgba(54, 34, 34, 0.25)",
    minWidth: "80%",
    minHeight: "5%",
    borderRadius: 10,
    backgroundColor: "#FFF9F5",
    paddingLeft: 20,
    marginTop: "3%",
  },
  setValidateBtn: {
    justifyContent: "flex-end",
    marginBottom: 30,
    marginTop: "0%",
  },
  validateButton: {
    marginTop: "5%",
    width: Dimensions.get("screen").width / 1.2,
    height: Dimensions.get("screen").height / 20, //Dimensions.get("window").height /5,
    borderWidth: 2,
    borderColor: "rgba(54, 34, 34, 0.25)",
    minWidth: "40%",
    minHeight: "5%",
    borderRadius: 10,
    backgroundColor: "#65C18C",
    alignItems: "center",
    justifyContent: "center",
  },
  borderRed: {
    borderWidth: 2,
    borderColor: "red",
  },
});

export default CreateGarden;
