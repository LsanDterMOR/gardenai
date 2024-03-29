import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
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

var pathConfiguration1 = require("../garden/ressource/pathConfiguration1.png");
var pathConfiguration2 = require("../garden/ressource/pathConfiguration2.png");
var pathConfiguration3 = require("../garden/ressource/pathConfiguration3.png");

const CreateGarden = (props: CreateGardenProps) => {
  const [LengthSize, setLengthSize] = useState(0);
  const [WidthSize, setWidthSize] = useState(0);
  const [Name, setName] = useState("");
  const cartItems = useCartItem((state) => state.items);
  const setCartItems = useCartItem((state) => state.setCartItems);
  const userId = useUser((state) => state.user);
  const [Loading, setLoading] = useState(false);
  const [PathType, setPathType] = useState(0);
  const [isErrorGardenName, setIsErrorGardenName] = useState(false);
  const [isErrorGardenSize, setIsErrorGardenSize] = useState(false);

  function calculateGardenPath(startX: number, startY: number) {
    let Path: Array<{ PosX: number; PosY: number }> = [];
    if (PathType == 1 || PathType == 3) {
      for (let y = 0; y < LengthSize; y++) {
        Path.push({ PosX: startX, PosY: y });
      }
    }
    if (PathType == 2 || PathType == 3) {
      for (let x = 0; x < WidthSize; x++) {
        Path.push({ PosX: x, PosY: startY });
      }
    }
    return Path;
  }

  function TitleFunction(text: string, marginTopValue: string) {
    return (
      <View style={[styles.pageSubTitle, { marginTop: marginTopValue }]}>
        <Text style={styles.pageSubTitleText}>{text}</Text>
      </View>
    );
  }
  return Loading ? (
    <View style={styles.container}>
      <Text style={styles.loadingText}>Chargement...</Text>
    </View>
  ) : (
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
          <Text style={styles.pageTitle}>Créer un potager</Text>
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
        {isErrorGardenName ? (
          <Text style={styles.errorText}>Le nom du jardin est vide.</Text>
        ) : null}

        {TitleFunction("Mesures (m)", "2%")}

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
        {isErrorGardenSize ? (
          <Text style={styles.errorText}>
            Mesures invalides (1 à 50 seulement).
          </Text>
        ) : null}
        {TitleFunction("Plantes", "2%")}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: "3%",
          }}
        >
          <View style={{ flex: 1 }} />
          <TouchableOpacity
            style={styles.PlantButton}
            onPress={() => props.navigation.navigate("ListOfPlants")}
          >
            <Ionicons name="library-outline" size={24} color="#65C18C" />
            <Text>Glossaire</Text>
          </TouchableOpacity>
          <View style={{ flex: 1 }} />
        </View>

        {TitleFunction("Configuration", "2%")}
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
            onPress={() => {
              if (PathType == 1) setPathType(0);
              else setPathType(1);
            }}
          >
            {PathType == 1 ? (
              <Ionicons
                name="checkmark-circle-outline"
                color="#65C18C"
                style={styles.pathCheckmarkIcon}
                size={25}
              />
            ) : null}
            <Image
              style={{
                width: "150%",
                height: "150%",
              }}
              source={pathConfiguration1}
            />
          </TouchableOpacity>
          <View style={{ flex: 1 }} />
          <TouchableOpacity
            style={styles.PlantButton}
            onPress={() => {
              if (PathType == 2) setPathType(0);
              else setPathType(2);
            }}
          >
            {PathType == 2 ? (
              <Ionicons
                name="checkmark-circle-outline"
                color="#65C18C"
                style={styles.pathCheckmarkIcon}
                size={25}
              />
            ) : null}
            <Image
              style={{
                width: "150%",
                height: "150%",
              }}
              source={pathConfiguration2}
            />
          </TouchableOpacity>
          <View style={{ flex: 1 }} />
          <TouchableOpacity
            style={styles.PlantButton}
            onPress={() => {
              if (PathType == 3) setPathType(0);
              else setPathType(3);
            }}
          >
            {PathType == 3 ? (
              <Ionicons
                name="checkmark-circle-outline"
                color="#65C18C"
                style={styles.pathCheckmarkIcon}
                size={25}
              />
            ) : null}
            <Image
              style={{
                width: "150%",
                height: "150%",
              }}
              source={pathConfiguration3}
            />
          </TouchableOpacity>
          <View style={{ flex: 2 }} />
        </View>

        <PlantGrid />
        <View style={[styles.setValidateBtn]}>
          <TouchableOpacity
            style={[styles.validateButton]}
            onPress={async () => {
              setIsErrorGardenName(false);
              setIsErrorGardenSize(false);
              let errorGardenName = false;
              let errorGardenSize = false;
              if (Name.length == 0) {
                setIsErrorGardenName(true);
                errorGardenName = true;
              }
              if (LengthSize == 0 || WidthSize == 0) {
                setIsErrorGardenSize(true);
                errorGardenSize = true;
              }
              if (errorGardenName || errorGardenSize) return;
              let gardenPath = calculateGardenPath(
                Math.floor(WidthSize / 2),
                Math.floor(LengthSize / 2)
              );
              try {
                setLoading(true);
                const createGarden = await axios.post(
                  "https://gardenai-backend.herokuapp.com/api/v1/garden/Create",
                  {
                    Name: Name,
                    Height: LengthSize,
                    Width: WidthSize,
                    PlantList: cartItems,
                    PathList: gardenPath,
                    UserId: userId?.id,
                  }
                );
                setLoading(false);
                console.log("Successfully created garden: ", createGarden.status);
                //console.log(createGarden);
                if (createGarden.status == 200) {
                  setCartItems([]);
                  props.navigation.navigate("Garden", {
                    garden_id: createGarden.data.result,
                  });
                }
              } catch (e) {
                setLoading(false);
                console.log("Garden creation failed: " + e);
              }
            }}
          >
            <Text style={styles.validateButtonText}>créer</Text>
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
    backgroundColor: "#FAEEE7",
    alignItems: "center",
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
  scrollView: {
    marginHorizontal: 20,
  },
  pageSubTitle: {
    width: "100%",
  },
  pageSubTitleText: {
    fontWeight: "bold",
    fontSize: Dimensions.get("screen").width / 15,
    color: "#65C18C",
    textAlign: "left",
    fontFamily: "VigaRegular",
    marginLeft: "5%",
  },
  loadingText: {
    fontWeight: "bold",
    fontSize: Dimensions.get("screen").width / 10,
    marginTop: Dimensions.get("screen").height / 3,
    textAlign: "center",
    color: "green",
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
    width: Dimensions.get("screen").width / 2,
    height: Dimensions.get("screen").height / 20, //Dimensions.get("window").height /5,
    borderWidth: 2,
    borderColor: "rgba(54, 34, 34, 0.25)",
    minWidth: "20%",
    minHeight: "6%",
    borderRadius: 10,
    backgroundColor: "#65C18C",
    alignItems: "center",
    justifyContent: "center",
  },
  validateButtonText: {
    fontSize: Dimensions.get("screen").height / 25,
    color: "#FFF",
    fontWeight: "bold",
    fontFamily: "VigaRegular",
    alignSelf: "center",
    marginBottom: "2%",
    height: "90%",
  },
  pathCheckmarkIcon: {
    position: "absolute",
    right: 0,
    top: 0,
  },
  errorText: {
    color: "red",
    marginTop: "1%",
    width: "80%",
  },
  borderRed: {
    borderWidth: 2,
    borderColor: "red",
  },
});

export default CreateGarden;
