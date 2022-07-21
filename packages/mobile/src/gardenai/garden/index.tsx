import { useState, useEffect } from "react";
import { StyleSheet, Text, View, StatusBar, TouchableWithoutFeedback, Keyboard, Image, Dimensions   } from "react-native";
import ImageZoom from 'react-native-image-pan-zoom';
import { FontAwesome5 } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import DisplayGarden from './src/displayGarden'

interface GardenProps {
    navigation: any;
}

const Garden = (props: GardenProps) => {
    return (
        <View style={styles.container}>
        <Text style={styles.text}>{"Mon jardin"}</Text>
        <ImageZoom style={styles.imageHolder} cropWidth={Dimensions.get('window').width}
                    cropHeight={Dimensions.get('window').height}
                    imageWidth={Dimensions.get('window').width + Dimensions.get('window').width / 2}
                    imageHeight={Dimensions.get('window').height}
                    >
             <DisplayGarden/>
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
   },
    text: {
        fontSize: 40
    }
});

export default Garden;