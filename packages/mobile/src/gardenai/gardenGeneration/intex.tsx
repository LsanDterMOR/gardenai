import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Dimensions , TextInput} from "react-native";

const GardenGenerator = () => {

    const [LengthSize, setLengthSize] = useState(20);
    const [WidthSize, setWidthSize] = useState(50);
    useEffect(() => {
        const windowWidth = Dimensions.get('window').width;
        const windowHeight = Dimensions.get('window').height;
        const screenWidth = Dimensions.get('screen').width;
        const screenHeight = Dimensions.get('screen').height;
        console.log("screenHeight => ",screenHeight)
        console.log("screenWidth => ", screenWidth)
    }, [])

    return (
        <View style={styles.container}>
            <Text>Crée un potager</Text>
            <TextInput style={styles.Input} placeholder="Longueur" keyboardType = 'numeric' onChangeText={text => (setLengthSize(parseFloat(text)))}></TextInput>  
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        display: 'flex',
        backgroundColor: "#FFFBF9",
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    Rect: {
        height: Dimensions.get("screen").width / 3,//Dimensions.get("window").height /5,
        width: Dimensions.get("screen").width / 2,//Dimensions.get("screen").width / 2.2, 
        borderWidth: 2,  
        borderColor: 'rgba(54, 34, 34, 0.25)',
        backgroundColor: '#FFF9F5',
        borderRadius: 5,
        justifyContent:'center', 
        alignItems: 'center',
    },
    Carre: {
        height: Dimensions.get("screen").width / 2.5,//Dimensions.get("window").height /5,
        width: Dimensions.get("screen").width / 2.5,//Dimensions.get("screen").width / 2.2, 
        borderWidth: 2,  
        borderColor: 'rgba(54, 34, 34, 0.25)',
        backgroundColor: '#FFF9F5',
        borderRadius: 5,
        justifyContent:'center', 
        alignItems: 'center',
    },

    Input: {
        borderWidth:1,
        borderColor: 'rgba(54, 34, 34, 0.25)',
        minWidth: '80%',
        minHeight: '5%',
        borderRadius: 10,
        backgroundColor: '#FFF9F5',
        paddingLeft: 20,
        marginTop : "5%",
      },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    CenterMap: {
        marginStart:"23%",
    }
});

export default GardenGenerator