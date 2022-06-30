import React, { useState } from "react";
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

interface GardenaiProps {
  navigation: any;
}

const Gardenai = (props: GardenaiProps) => {
  const [loaded] = useFonts({
    VigaRegular: require("./src/font/Viga-Regular.ttf"),
  });
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
      <Button
        title="Press me"
        onPress={() => props.navigation.navigate("Camera")}
      />
      <Button
        title="Press me"
        onPress={() => props.navigation.navigate("CreateGarden")}
      />
      <Button
        title="Garden"
        onPress={() => props.navigation.navigate("Garden")}
      />
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
    justifyContent: "space-between",
    marginTop: "15%",
    marginLeft: "-10%",
  },
  addIcon: {
    position: "absolute",
    right: -Dimensions.get("screen").width / 10,
    top: 12,
  },
});

export default Gardenai;
