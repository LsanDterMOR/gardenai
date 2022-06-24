import { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, TextInput, StatusBar, FlatList, TouchableWithoutFeedback, Keyboard  } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

interface ListOfPlantsProps {
    navigation: any;
}

const ListOfPlants = (props: ListOfPlantsProps) => {
    const [search, setSearch] = useState("");
    const [listOfPlants, setListOfPlants] = useState([
        { name: 'TOMATE', code: '#1abc9c' },
        { name: 'MAÏS', code: '#2ecc71' },
        { name: 'PATATE', code: '#3498db' },
        { name: 'TONY', code: '#9b59b6' },
        { name: 'SALADE', code: '#1abc9c' },
        { name: 'BLE', code: '#3498db' },
        { name: 'PARKER', code: '#9b59b6' },    
    ])
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: "15%", marginLeft: "10%" }}>
                    <FontAwesome5 name="arrow-left" size={24} color="black" style={styles.quitIcon} onPress={() => props.navigation.goBack()} />
                    <Text style={styles.titlePage}>Liste des plantes</Text>
                </View>
                <View style={{ paddingTop:"15%", height:"14%"}}>
                    <TextInput style={styles.Input} placeholder="recherche" placeholderTextColor="#000" onChangeText={text => console.log(text)}></TextInput>
                </View>
                <FlatList
                    data={listOfPlants}
                    keyExtractor={(items, i) => i.toString()}
                    renderItem={({item}) => <Text style={styles.item}>{item.name}</Text>}
                    />

            </View>
        </TouchableWithoutFeedback>
    );
}


const styles = StyleSheet.create({
    container: {
        height: "100%",
        display: 'flex',
        backgroundColor: "#FFFBF9",
        alignItems: 'center',
        paddingTop: StatusBar.currentHeight,
    },
    scrollView: {
        marginHorizontal: 20,
    },
    titlePage: {
        fontWeight: 'bold',
        fontSize: Dimensions.get("screen").width / 10,
        fontFamily: 'VigaRegular'
    },
    quitIcon: {
        position: 'absolute',
        left: -Dimensions.get("screen").width / 10,
        top: 11

    },
    Input: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'rgba(54, 34, 34, 0.25)',
        minWidth: '80%',
        borderRadius: 10,
        backgroundColor: '#FFF9F5',
        paddingLeft: 20,
        marginTop: "5%",
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
      },    
    borderRed: {
        borderWidth: 2, borderColor:'red' 
    },
});

export default ListOfPlants;