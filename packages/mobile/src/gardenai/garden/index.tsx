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
import { useFonts } from "expo-font";
import DisplayGarden from "./src/displayGarden";

interface GardenProps {
  navigation: any;
}

const data = {
    "Size" : [8,8],
    "Path" : [
      [2,0],
      [2,1],
      [2,2],
      [2,3],
      [2,4],
      [2,5],
      [3,5],
      [4,5],
      [5,5],
      [6,5],
      [7,5],
      [8,5],
    ],
    "Plant" : [
      {
        "id" : 4,
        "pos" : [0,0,2]
      },
      {
        "id" : 3,
        "pos" : [4,0,1]
      },
      {
        "id" : 3,
        "pos" : [0,4,1]
      },
      {
        "id" : 2,
        "pos" : [3,2,1]
      },
      {
        "id" : 2,
        "pos" : [3,3,1]
      },
      {
        "id" : 2,
        "pos" : [3,4,1]
      },
      {
        "id" : 2,
        "pos" : [4,3,1]
      },
      {
        "id" : 1,
        "pos" : [4,4,1]
      }
    ]
  }


const Garden = (props: GardenProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{"Mon jardin"}</Text>
      <ImageZoom
        style={styles.imageHolder}
        cropWidth={Dimensions.get("window").width}
        cropHeight={Dimensions.get("window").height}
        imageWidth={
          Dimensions.get("window").width * 2
        }
        imageHeight={Dimensions.get("window").height}
      >
        <DisplayGarden Size={data.Size} Path={data.Path} Plant={data.Plant}/>
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
  text: {
    fontSize: 40,
  },
});

export default Garden;
