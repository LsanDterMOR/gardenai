import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Dimensions,
} from "react-native";
import ImageZoom from "react-native-image-pan-zoom";
import { FontAwesome5 } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import DisplayGarden from "./src/displayGarden";
import React from "react";

interface GardenProps {
  navigation: any;
}

var data = {
  result: {
    ID: 39710644,
    Name: "Jardin cool",
    Width: 8,
    Height: 8,
    PlantList: [
      {
        ID: 236,
        PosX: 1,
        PosY: 1,
        Size: 1,
        GardenID: 39710644,
        PlantID: 1,
        Plant: {
          ID: 0,
          CommonName: "tomato",
          ScientificName: "",
          PlantType: "",
          PlantCategory: "",
          MinHeight: 0,
          MaxHeight: 0,
          MinSpreadRoot: 0,
          MaxSpreadRoot: 0,
          GrowthRate: 0,
          SunExposure: 0,
          MinimumRootDepth: 0,
          MinpH: 0,
          MaxpH: 0,
          MinUSDAZone: 0,
          MaxUSDAZone: 0,
          RootType: 0,
        },
      },
      {
        ID: 237,
        PosX: 3,
        PosY: 1,
        Size: 1,
        GardenID: 39710644,
        PlantID: 1,
        Plant: {
          ID: 0,
          CommonName: "carot",
          ScientificName: "",
          PlantType: "",
          PlantCategory: "",
          MinHeight: 0,
          MaxHeight: 0,
          MinSpreadRoot: 0,
          MaxSpreadRoot: 0,
          GrowthRate: 0,
          SunExposure: 0,
          MinimumRootDepth: 0,
          MinpH: 0,
          MaxpH: 0,
          MinUSDAZone: 0,
          MaxUSDAZone: 0,
          RootType: 0,
        },
      },
    ],
    Path: [
      [2, 0],
      [2, 1],
      [2, 2],
      [2, 3],
      [2, 4],
      [2, 5],
      [3, 5],
      [4, 5],
      [5, 5],
      [6, 5],
      [7, 5],
      [8, 5],
    ],
  },
};

const Garden = (props: GardenProps) => {
  const moveToGardenai = () => props.navigation.navigate("Gardenai");

  var PlantList = [{name: "plant", pos: {x: 0, y: 0, size: 0}}];
  data.result.PlantList.forEach((plant) => {
    PlantList.push({
      name: plant.Plant.CommonName,
      pos: {x: plant.PosX, y: plant.PosY, size: plant.Size},
    });
  });
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          marginTop: "10%",
        }}
      >
        <Ionicons
          name="return-up-back-outline"
          style={styles.quitIcon}
          size={28}
          color="#65C18C"
          onPress={() => moveToGardenai()}
        />
        <Text style={styles.titlePage}>{data.result.Name}</Text>
      </View>
      <ImageZoom
        style={styles.imageHolder}
        cropWidth={Dimensions.get("window").width}
        cropHeight={Dimensions.get("window").height}
        imageWidth={Dimensions.get("window").width * 2}
        imageHeight={Dimensions.get("window").height}
      >
        <DisplayGarden
          Width={data.result.Width}
          Height={data.result.Height}
          Path={data.result.Path}
          PlantList={PlantList.slice(1)}
        />
      </ImageZoom>
    </View>
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
  imageHolder: {},
  titlePage: {
    fontWeight: "bold",
    fontSize: Dimensions.get("screen").width / 10,
    fontFamily: "VigaRegular",
  },
  quitIcon: {
    position: "absolute",
    left: -50,
    top: 10,
  },
});

export default Garden;
