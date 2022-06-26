import React, { FC, useState, useEffect, } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
} from "react-native";

interface GardenProps {
    i: number;
    y: number;
    map: Array<Array<number>>;
  }

const mapTest = [[1, 0, 0, 0, 0], 
[0, 0, 0, 0, 0], [0, 0, 0, 0, 1], [0, 0, 0, 0, 0], [1, 0, 0, 0, 0]]

function DisplayPlant(props: GardenProps) {
    let i = props.i;
    let y = props.y;
    if (props.map[y - 1][i - 1] == 1) {
        return (
            <View key = {"plant_" + y * 10 + i}>
                <Image style={{top: 55 + (i * 15 + y * 15), left: -43 + (y * 40 - i * 40), position: "absolute", width: 100, height: 100}} source={require('../ressource/plante.png')}/>
            </View>
        )
    }
    else {
        return(
            <View></View>
        )
    }
}

const displayGarden = () => {
    var gardenField = [];

    for (let y = 1; y < 6; y++) {
        for (let i = 1; i < 6; i++) {
		    gardenField.push(
			    <View key = {"field_" + y * 10 + i}>
                    <Image style={{top: 100 + (i * 15 + y * 15), left: -50 + (y * 40 - i * 40), position: "absolute", width: 100, height: 100}} source={require('../ressource/field_block.png')}/>
                    <DisplayPlant i={i} y={y} map={mapTest}/>
			    </View>
		    );
	    }
    }

    return (
        <View style={styles.container}>
            { gardenField }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        display: 'flex',
        backgroundColor: "#FFFBF9",
        alignItems: 'center',
        paddingTop: StatusBar.currentHeight,
    }
})

export default displayGarden;