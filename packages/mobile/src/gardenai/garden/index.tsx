import { useState, useEffect } from "react";
import { StyleSheet, Text, View, StatusBar, TouchableWithoutFeedback, Keyboard, Image, Dimensions   } from "react-native";
import ImageZoom from 'react-native-image-pan-zoom';
import { FontAwesome5 } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

interface GardenProps {
    navigation: any;
}

const Garden = (props: GardenProps) => {
    return (
        <View style={styles.container}>
        <Text style={styles.text}>{"Mon jardin"}</Text>
        <ImageZoom style={styles.imageHolder} cropWidth={Dimensions.get('window').width}
                    cropHeight={Dimensions.get('window').height}
                    imageWidth={Dimensions.get('window').width}
                    imageHeight={Dimensions.get('window').height}>
             <Image style={styles.field} source={require('./ressource/field.png')}/>
             <Image style={styles.plant} source={require('./ressource/plante.png')}/>
         </ImageZoom>
         </View>
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
    imageHolder: {
        backgroundColor: "red",
   },
    text: {
        fontSize: 40
    },
    field: {
        position: "absolute",
        top: "25%",
        left: "10%",
        width: 300,
        height: 300,
    },
    plant: {
        position: "absolute",
        top: "25%",
        left: "10%",
        width: 100,
        height: 100,
    }
});

export default Garden;