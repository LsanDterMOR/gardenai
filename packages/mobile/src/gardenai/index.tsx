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
import { Entypo, FontAwesome5 } from "@expo/vector-icons";
import Moment from "moment";

interface GardenaiProps {
  navigation: any;
}

const Gardenai = (props: GardenaiProps) => {
  const user = useUser((state) => state.user);
  const [Garden, setGarden] = useState([]);

  const renderListEmptyGarden = () => (
    <View style={styles.emptyGardenDiv}>
      <Text
        style={styles.emptyGardenText}
        onPress={() => props.navigation.navigate("CreateGarden")}
      >
        Créez votre premier jardin ici !
      </Text>
    </View>
  );

  const renderCreationDate = (date: string) => {
    Moment.locale("fr");
    return (
      <Text style={styles.setDescriptionGardenDate}>
        {Moment(date).format("d MMM YY")}
      </Text>
    );
  };

  const removeGarden = async (garden_id: string) => {
    if (!garden_id || garden_id === "") return;
    try {
      await axios.post(
        "https://gardenai-backend.herokuapp.com/api/v1/garden/delete/" +
          garden_id
      );
      setGarden(current =>
        current.filter(garden => {
          return garden["ID"] !== garden_id;
        }),
      );
      console.log("Successfully removed garden : " + garden_id);
    } catch (e) {
      console.log("Error delete garden : " + e);
    }
  };

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
      console.log("Error get all: " + e);
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
        ListEmptyComponent={renderListEmptyGarden}
        renderItem={({ item, index }) => (
          <View style={styles.setAllGarden} key={index}>
            <TouchableHighlight
              onPress={() => {
                console.log(item);
                props.navigation.navigate("Garden", {
                  garden_id: item["ID"],
                });
              }}
              style={{ flexDirection: "row" }}
            >
              <View style={styles.setGardenContent}>
                <View style={styles.setGardenHeader}>
                  <Text style={styles.setTitleGarden}> {item["Name"]} </Text>
                  <View
                    onStartShouldSetResponder={(event) => true}
                    onTouchEnd={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        removeGarden(item["ID"]);
                      }}
                    >
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
                </View>
                <View style={styles.setDescriptionGarden}>
                  <Text style={styles.setDescriptionGardenSize}>
                    Hauteur {item["Height"]} / Largeur {item["Width"]}
                  </Text>
                  {renderCreationDate(item["CreatedAt"])}
                </View>
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
  emptyGardenDiv: {
    marginTop: Dimensions.get("screen").height / 3,
    width: Dimensions.get("screen").width / 1.2,
    marginHorizontal: 5,
  },
  emptyGardenText: {
    fontWeight: "bold",
    fontSize: Dimensions.get("screen").width / 15,
    textAlign: "center",
    fontFamily: "VigaRegular",
    color: "green",
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
  setAllGarden: {
    marginTop: "10%",
    width: Dimensions.get("screen").width / 1.2,
    marginHorizontal: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "green",
    padding: 5,
    minHeight: Dimensions.get("screen").width / 4.5,
  },
  setGardenContent: {
    width: "100%",
    marginLeft: "5%",
  },
  setGardenHeader: {
    display: "flex",
    flexDirection: "row",
    width: "95%",
    justifyContent: "space-between",
  },
  setTitleGarden: {
    fontSize: Dimensions.get("screen").width / 18,
    fontWeight: "bold",
  },
  setGardenDelete: {
  },
  setDescriptionGarden: {
    width: "100%",
  },
  setDescriptionGardenSize: {
    marginTop: "5%",
    fontSize: Dimensions.get("screen").width / 20,
  },
  setDescriptionGardenDate: {
    textAlign: "right",
    fontSize: Dimensions.get("screen").width / 25,
    marginRight: "5%",
  },
  quitIcon: {
  },
});

export default Gardenai;
