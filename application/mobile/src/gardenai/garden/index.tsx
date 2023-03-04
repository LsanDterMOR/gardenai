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
import axios, { AxiosResponse } from "axios";
import React from "react";

interface GardenProps {
  navigation: any;
  route: any;
}

interface GardenData {
  ID: number;
  Name: string;
  Width: number;
  Height: number;
  PlantList: Array<Tile>;
  Path: Array<Tile>;
}

interface Tile {
  ID: number;
  Name: string;
  PosX: number;
  PosY: number;
  Size: number;
  GardenID: number;
  PlantID: number;
  Score: number;
  Plant: Plant;
}

interface Plant {
  ID: number;
  CommonName: string;
  ScientificName: string;
  PlantType: string;
  PlantCategory: string;
  MinHeight: number;
  MaxHeight: number;
  MinSpreadRoot: number;
  MaxSpreadRoot: number;
  GrowthRate: number;
  SunExposure: number;
  MinimumRootDepth: number;
  MinpH: number;
  MaxpH: number;
  MinUSDAZone: number;
  MaxUSDAZone: number;
  RootType: number;
}

// const Path = [
//   [2, 0],
//   [2, 1],
//   [2, 2],
//   [2, 3],
//   [2, 4],
//   [2, 5],
//   [3, 5],
//   [4, 5],
//   [5, 5],
//   [6, 5],
//   [7, 5],
//   [8, 5],
// ];

const Garden = (props: GardenProps) => {
  var PlantList = [{ name: "plant", pos: { x: 0, y: 0, size: 0 }, score: 0 }];
  const [data, setData] = useState<GardenData>();

  useEffect(() => {
    const getGardenById = async () => {
      const { garden_id } = props.route.params;
      try {
        const res = await axios.get(
          "https://gardenai-backend.herokuapp.com/api/v1/garden/GetById/" +
            garden_id
        );
        setData(res.data.result);
      } catch (e) {
        console.log("Error get by id: " + e);
      }
    };

    getGardenById();
  }, []);

  if (data == undefined) return null;

  data.PlantList.forEach((plant) => {
    PlantList.push({
      name: plant.Plant.CommonName,
      pos: { x: plant.PosX, y: plant.PosY, size: plant.Size },
      score: plant.Score,
    });
  });

  return (
    <View style={styles.container}>
      <View style={styles.pageHeader}>
        <Ionicons
          name="return-up-back-outline"
          style={styles.pageReturn}
          size={28}
          color="#65C18C"
          onPress={() => props.navigation.navigate("Gardenai")}
        />
        <Text style={styles.pageTitle}>{data.Name}</Text>
      </View>
      <ImageZoom
        cropWidth={Dimensions.get("window").width}
        cropHeight={Dimensions.get("window").height}
        imageWidth={Dimensions.get("window").width * 2}
        imageHeight={Dimensions.get("window").height}
      >
        <DisplayGarden
          Width={data.Width}
          Height={data.Height}
          Path={data.Path}
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
    backgroundColor: "#FAEEE7",
    alignItems: "center",
    paddingTop: StatusBar.currentHeight,
  },
  pageHeader: {
    flexDirection: "row",
    marginTop: "10%",
    width: "100%",
    borderBottomWidth: 2,
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
});

export default Garden;
