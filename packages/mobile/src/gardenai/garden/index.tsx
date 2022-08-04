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
    Name: "test1",
    Width: 3,
    Height: 3,
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
          CommonName: null,
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
        PosX: 2,
        PosY: 1,
        Size: 1,
        GardenID: 39710644,
        PlantID: 1,
        Plant: {
          ID: 0,
          CommonName: null,
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
  },
};

const data_old = {
  Size: [8, 8],
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
  Plant: [
    {
      id: 4,
      pos: [0, 0, 2],
    },
    {
      id: 3,
      pos: [4, 0, 1],
    },
    {
      id: 3,
      pos: [0, 4, 1],
    },
    {
      id: 2,
      pos: [3, 2, 1],
    },
    {
      id: 2,
      pos: [3, 3, 1],
    },
    {
      id: 2,
      pos: [3, 4, 1],
    },
    {
      id: 2,
      pos: [4, 3, 1],
    },
    {
      id: 1,
      pos: [4, 4, 1],
    },
  ],
};

const Garden = (props: GardenProps) => {
  const moveToGardenai = () => props.navigation.navigate("Gardenai");
  return (
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
        onPress={() => moveToGardenai()}
      />
      <Text style={styles.titlePage}>{"Mon jardin"}</Text>
      </View>
      <ImageZoom
        style={styles.imageHolder}
        cropWidth={Dimensions.get("window").width}
        cropHeight={Dimensions.get("window").height}
        imageWidth={Dimensions.get("window").width * 2}
        imageHeight={Dimensions.get("window").height}
      >
        <DisplayGarden
          Size={data_old.Size}
          Path={data_old.Path}
          Plant={data_old.Plant}
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
    left: -Dimensions.get("screen").width / 4,
    top: 10,
  },
});

export default Garden;
