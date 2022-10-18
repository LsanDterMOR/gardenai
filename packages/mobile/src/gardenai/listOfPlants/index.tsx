import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  StatusBar,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { useCartItem } from "../../store/cartItems";
import axios from "axios";

interface ListOfPlantsProps {
  navigation: any;
  route: any;
}

const ListOfPlants = (props: ListOfPlantsProps) => {
  const [search, setSearch] = useState("");
  const setCartItems = useCartItem((state) => state.setCartItems);
  const cartItems = useCartItem((state) => state.items);
  const setPlantQuantity = useCartItem((state) => state.setPlantQuantity);
  const [Filter, setFilter] = useState("");
  const [Plant, setPlant] = useState([]);
  const [PlantInfo, setPlantInfo] = useState<
    { name: string; code: string; quantity: number; show: boolean }[]
  >([]);
  function addPlant(items: any) {
    setCartItems(items);
    props.navigation.navigate("CreateGarden");
  }

  const renderListEmptyPlantList = () => {
    return (
      <View style={styles.plantNotFound}>
        <Text style={styles.plantNotFoundText}>Aucun résultat...</Text>
      </View>
    );
  };

  useEffect(() => {
    try {
      console.log("useEffect dans create garden");
      const requestPlant = async () => {
        const listOfPLants = await axios.get(
          "https://gardenai-backend.herokuapp.com/api/v1/plant/"
        );
        console.log("listOfPLants.data -> ");
        console.log(listOfPLants.data.result);
        setPlant(listOfPLants.data.result);
        let plantQuantityData: {
          name: string;
          code: string;
          quantity: number;
          show: boolean;
        }[] = [];
        await listOfPLants.data.result.forEach((plant: any) => {
          plantQuantityData.push({
            name: plant["CommonName"],
            quantity: 0,
            code: "#65C18C",
            show: false,
          });
        });
        setPlantInfo(plantQuantityData);
        console.log("Display Plant Number");
        console.log(PlantInfo);
      };
      requestPlant();
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.pageHeader}>
          <Ionicons
            name="return-up-back-outline"
            style={styles.pageReturn}
            size={28}
            color="#65C18C"
            onPress={() => props.navigation.navigate("CreateGarden")}
          />
          <Text style={styles.pageTitle}>Liste des plantes</Text>
        </View>
        <View style={{ height: "8%", flexDirection: "row" }}>
          <TextInput
            style={styles.Input}
            placeholder="recherche"
            placeholderTextColor="#000"
            onChangeText={(text) => setFilter(text)}
          ></TextInput>
          <TouchableOpacity style={[styles.validateButton]} onPress={() => {
            console.log("ADD ITEM IN CART");
            addPlant(PlantInfo);
            //addPlant()
          }}>
            <Text style={styles.validateButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={
            Filter == ""
              ? Plant
              : Plant.filter((plant) => {
                  let plantName = "";
                  plantName = plant["CommonName"];
                  return plantName.includes(Filter.toLowerCase());
                })
          }
          keyExtractor={(items, i) => i.toString()}
          ListEmptyComponent={renderListEmptyPlantList}
          style={styles.plantList}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => {
                let oldPlantInfo = [...PlantInfo];
                if (oldPlantInfo.length == 0) return;
                oldPlantInfo[index] = {
                  name: oldPlantInfo[index].name,
                  code: oldPlantInfo[index].code,
                  quantity: oldPlantInfo[index].quantity,
                  show: !oldPlantInfo[index].show,
                };
                setPlantInfo(oldPlantInfo);
              }}
            >
              <View style={styles.plantItem} key={index}>
                <Text style={styles.plantName}>{item["CommonName"]}</Text>
                <Text style={[styles.plantQuantity]}>
                  {PlantInfo.length != 0 ? PlantInfo[index].quantity : 0}
                </Text>
                <Ionicons
                  name="remove-circle-outline"
                  color="#65C18C"
                  style={styles.plantRemoveIcon}
                  size={45}
                  onPress={() => {
                    let oldPlantInfo = [...PlantInfo];
                    if (oldPlantInfo.length == 0) return;
                    oldPlantInfo[index] = {
                      name: oldPlantInfo[index].name,
                      code: oldPlantInfo[index].code,
                      quantity:
                        oldPlantInfo[index].quantity > 0
                          ? oldPlantInfo[index].quantity - 1
                          : oldPlantInfo[index].quantity,
                      show: oldPlantInfo[index].show,
                    };
                    setPlantInfo(oldPlantInfo);
                  }}
                />
                <Ionicons
                  name="add-circle-outline"
                  color="#65C18C"
                  style={styles.plantAddIcon}
                  remove-circle-outline
                  size={45}
                  onPress={() => {
                    let oldPlantInfo = [...PlantInfo];
                    if (oldPlantInfo.length == 0) return;
                    oldPlantInfo[index] = {
                      name: oldPlantInfo[index].name,
                      code: oldPlantInfo[index].code,
                      quantity: oldPlantInfo[index].quantity + 1,
                      show: oldPlantInfo[index].show,
                    };
                    setPlantInfo(oldPlantInfo);
                  }}
                />
              </View>
              {(PlantInfo.length != 0 ? PlantInfo[index].show : false) ? (
                <View
                  style={styles.plantItemHidden}
                  key={"hidden-info-" + index}
                >
                  <Text style={styles.plantItemHiddenText}>
                    GrowthRate : {item["GrowthRate"]}
                  </Text>
                  <Text style={styles.plantItemHiddenText}>
                    MaxHeight : {item["MaxHeight"]}
                  </Text>
                  <Text style={styles.plantItemHiddenText}>
                    PlantType : {item["PlantType"]}
                  </Text>
                  <Text style={styles.plantItemHiddenText}>
                    PlantCategory : {item["PlantCategory"]}
                  </Text>
                </View>
              ) : (
                <View></View>
              )}
            </TouchableOpacity>
          )}
        />
      </View>
    </TouchableWithoutFeedback>
    //   <Text style={styles.item} onPress={() => addPlant(item)}>
    //   // {item.name}
    //   //{" "}
    // </Text>
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
  Input: {
    borderWidth: 1,
    borderColor: "rgba(54, 34, 34, 0.25)",
    minWidth: "75%",
    height: "60%",
    borderRadius: 10,
    backgroundColor: "#FFF9F5",
    paddingLeft: 20,
    alignSelf: "center",
  },
  plantList: {
    width: "100%",
    marginTop: "5%",
  },
  plantItem: {
    width: "90%",
    paddingVertical: "4%",
    marginLeft: "5%",
    borderColor: "rgba(54, 34, 34, 0.25)",
    borderTopWidth: 2,
    flexDirection: "row",
  },
  plantName: {
    fontSize: Dimensions.get("screen").width / 15,
    alignSelf: "center",
    marginLeft: "5%",
  },
  plantQuantity: {
    fontSize: Dimensions.get("screen").width / 15,
    alignSelf: "center",
    marginLeft: "auto",
    marginRight: "5%",
  },
  plantItemHidden: {
    width: "90%",
    marginLeft: "5%",
    marginBottom: "5%",
  },
  plantItemHiddenText: {
    marginLeft: "5%",
    fontSize: Dimensions.get("screen").width / 20,
  },
  plantRemoveIcon: {
    alignSelf: "center",
  },
  plantAddIcon: {
    alignSelf: "center",
  },
  borderRed: {
    borderWidth: 2,
    borderColor: "red",
  },
  validateButton: {
    width: "12%",
    borderWidth: 2,
    borderColor: "rgba(54, 34, 34, 0.25)",
    minWidth: "10%",
    minHeight: "5%",
    borderRadius: 10,
    backgroundColor: "#65C18C",
    alignSelf: "center",
    marginLeft: "3%",
  },
  validateButtonText: {
    fontSize: Dimensions.get("screen").height / 25,
    color: "#FFF",
    fontWeight: "bold",
    fontFamily: "VigaRegular",
    alignSelf: "center",
  },
  plantNotFound: {
    textAlign: "center",
    marginTop: "40%"
  },
  plantNotFoundText: {
    textAlign: "center",
    fontSize: Dimensions.get("screen").height / 25,
  },
});

export default ListOfPlants;
