import { useState, useEffect } from "react";
import { StyleSheet, Text, View, StatusBar, TouchableWithoutFeedback, Keyboard, Image  } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

interface GardenProps {
    navigation: any;
}

const Garden = (props: GardenProps) => {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
            <Text style={styles.text}>{"Mon jardin"}</Text>
            <Image
                style={styles.field}
                source={require('./ressource/field.png')}
            />
            <Image
                style={styles.image}
                source={require('./ressource/plante.png')}
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
    image: {
   },
    text: {
        marginTop: 30,
        fontSize: 30
    },
    field: {
        position: "absolute",
        top: 90,
    }
});

export default Garden;