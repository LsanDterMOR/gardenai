import React, { FC, useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
  Modal,
} from "react-native";
import { Entypo, FontAwesome5 } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Double } from "react-native/Libraries/Types/CodegenTypes";
import sprites from "./spriteConfig.js";

interface PlantPos {
  name: string;
  pos: Pos;
  score: number;
}

interface Pos {
  x: number;
  y: number;
  size: number;
}

interface PlantInfo {
  name: string;
  size: number;
  score: number;
}

interface GardenProps {
  i: number;
  y: number;
  map: Array<Array<PlantInfo>>;
  plantSprites: PlantSprites;
}

interface PlantSprites {
  [key: string]: number | { uri: string };
}

interface DisplayProps {
  Width: number;
  Height: number;
  Path: Array<PlantList>;
  PlantList: Array<PlantPos>;
}

interface PlantList {
  ID: number;
  Name: string;
  PosX: number;
  PosY: number;
  Size: number;
  GardenID: number;
  PlantID: number;
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

const plant = {
  size: 90,
  width: 45,
  height: 26,
};

const field = {
  size: 90,
  width: 45,
  height: 26,
};

var topMargin = 0;

function ParseMap(props: GardenProps) {
  const [modalVisible, setModalVisible] = useState(false);
  let i = props.i;
  let y = props.y;
  var height = plant.height;
  var width = plant.width;
  var plantName = props.map[y - 1][i - 1].name;
  if (!plantName) return null;
  const plantImg =
    props.plantSprites[plantName] || props.plantSprites.defaultPlant;
  if (!plantImg) return null;
  const plantScore = props.map[y - 1][i - 1].score;
  const borderColor =
    plantScore > 0 ? "green" : plantScore < 0 ? "red" : "gray";
  return (
    <View
      key={"plant_" + y * 10 + i}
      onStartShouldSetResponder={(event) => true}
      onTouchEnd={(e) => {
        e.stopPropagation();
      }}
    >
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={[styles.plantPopup, { borderColor }]}>
          <View style={styles.plantPopupContent}>
            <Text style={styles.plantPopupName}>
              {props.map[y - 1][i - 1].name}
            </Text>
            <Text style={styles.plantPopupSize}>
              Taille :{" "}
              {props.map[y - 1][i - 1].size == 1 ? "moyenne" : "grande"}
            </Text>
            <Text style={styles.plantPopupScore}>Score : {plantScore}</Text>
          </View>
          <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
            <FontAwesome5
              name="circle"
              size={25}
              color="black"
              style={{ color: "#FF6565" }}
              solid
            />
            <Text
              style={{
                color: "white",
                position: "absolute",
                right: 9,
                top: 3,
              }}
            >
              x
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <TouchableWithoutFeedback
        onPress={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <Image
          style={{
            top:
              topMargin +
              (i * height + y * height) -
              50 * (props.map[y - 1][i - 1].size - 1),
            left:
              -width +
              (y * width - i * width) -
              50 * (props.map[y - 1][i - 1].size - 1),
            position: "absolute",
            width: plant.size * props.map[y - 1][i - 1].size,
            height: plant.size * props.map[y - 1][i - 1].size,
            resizeMode: "contain",
          }}
          source={plantImg}
        />
      </TouchableWithoutFeedback>
    </View>
  );
}

const displayGarden = (props: DisplayProps) => {
  var garden = {
    width: props.Width,
    height: props.Height,
  };
  var path = props.Path;
  var PlantList = props.PlantList;
  var map = Array(garden.width)
    .fill({ name: "", size: 0 })
    .map((_) => Array(garden.height).fill({ name: "field_dirt", size: 1 }));
  var biggerSize = garden.width > garden.height ? garden.width : garden.height;
  var scale = 1.0 / (biggerSize / 4);
  topMargin = 50 * biggerSize;
  path.forEach((pathElem) => {
    if (pathElem.PosX < garden.width && pathElem.PosY < garden.height) {
      map[pathElem.PosX][pathElem.PosY] = { name: "field_rock", size: 1 };
    }
  });

  const plantSprites = { defaultPlant: require("../ressource/default.png") };

  Object.keys(sprites).forEach((key) => {
    plantSprites[key] = sprites[key];
  });

  var gardenField = [];
  var plantField = [];
  var height = field.height;
  var width = field.width;

  for (let y = 1; y <= garden.width; y++) {
    for (let i = 1; i <= garden.height; i++) {
      if (map[y - 1][i - 1].name == "field_dirt") {
        gardenField.push(
          <View key={"field_" + y * 10 + i}>
            <Image
              style={{
                top: topMargin + (i * height + y * height),
                left: -width + (y * width - i * width),
                position: "absolute",
                width: field.size,
                height: field.size,
                resizeMode: "contain",
              }}
              source={sprites.field_dirt}
            />
          </View>
        );
      } else if (map[y - 1][i - 1].name == "field_rock") {
        gardenField.push(
          <View key={"field_" + y * 10 + i}>
            <Image
              style={{
                top: topMargin + (i * height + y * height),
                left: -width + (y * width - i * width),
                position: "absolute",
                width: field.size,
                height: field.size,
                resizeMode: "contain",
              }}
              source={sprites.field_rock}
            />
          </View>
        );
      }
    }
  }

  PlantList.forEach((plantElem) => {
    if (
      plantElem.pos.x < garden.width &&
      plantElem.pos.y < garden.height &&
      plantElem.pos.x != -1 &&
      plantElem.pos.y != -1
    ) {
      map[plantElem.pos.x][plantElem.pos.y] = {
        name: plantElem.name,
        size: plantElem.pos.size,
        score: plantElem.score,
      };
    }
  });

  for (let y = 1; y <= garden.width; y++) {
    for (let i = 1; i <= garden.height; i++) {
      if (map[y - 1][i - 1].name == "field_dirt" || map[y - 1][i - 1].name == "field_rock") continue;
      plantField.push(
        <View key={"plant_" + y * 10 + i}>
          <ParseMap i={i} y={y} map={map} plantSprites={plantSprites} />
        </View>
      );
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <Image
          style={{ top: -1200, left: -1800, position: "absolute" }}
          source={sprites.background}
        />
      </View>
      <View style={{ transform: [{ scale: scale }] }}>
        {gardenField}
        {plantField}
      </View>
      <View>
        <Image
          style={{
            top: -100,
            left: -100,
            transform: [{ scale: 0.3 }],
            position: "absolute",
          }}
          source={sprites.sun}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "#FAEEE7",
    alignItems: "center",
    paddingTop: StatusBar.currentHeight,
  },
  plantPopup: {
    backgroundColor: "#FFFBF9",
    position: "absolute",
    top: Dimensions.get("window").height / 2.5,
    left:
      Dimensions.get("window").width / 2 - Dimensions.get("window").width / 5,
    width: "40%",
    height: "15%",
    padding: "2%",
    borderRadius: 10,
    borderWidth: 2,
    flexDirection: "row",
  },
  plantPopupContent: {
    flex: 1,
  },
  plantPopupName: {
    textAlign: "center",
    marginTop: "15%",
    fontSize: Dimensions.get("screen").width / 15,
  },
  plantPopupSize: {
    textAlign: "center",
    marginTop: "10%",
    fontSize: Dimensions.get("screen").width / 25,
  },
  plantPopupScore: {
    textAlign: "center",
    marginTop: "10%",
    fontSize: Dimensions.get("screen").width / 25,
  },
});

export default displayGarden;
