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

interface PlantProps {
    i: number;
    y: number;
    plant: any;
}

const mapTest = [[3, 3, 0, 0, 1], 
[3, 0, 0, 0, 1], [0, 0, 6, 0, 1], [0, 0, 0, 0, 0], [0, 7, 7, 0, 0]]

var field_grass = require('../ressource/field_grass.png');
var field_dirt = require('../ressource/field_dirt.png');

var plant1 = require('../ressource/plant1.png');
var plant2 = require('../ressource/plant2.png');
var plant3 = require('../ressource/plant3.png');
var plant4 = require('../ressource/plant4.png');
var plant5 = require('../ressource/plant5.png');
var plant6 = require('../ressource/plant6.png');
var plant7 = require('../ressource/plant7.png');
var plant8 = require('../ressource/plant8.png');
var plant9 = require('../ressource/plant9.png');

function ParseMap(props: GardenProps) {
    let i = props.i;
    let y = props.y;
    let plantNumber = props.map[y - 1][i - 1];
    var plant;
    if (plantNumber != 0) {
        plantNumber == 1 ? plant = plant1 : plant;
        plantNumber == 2 ? plant = plant2 : plant;
        plantNumber == 3 ? plant = plant3 : plant;
        plantNumber == 4 ? plant = plant4 : plant;
        plantNumber == 5 ? plant = plant5 : plant;
        plantNumber == 6 ? plant = plant6 : plant;
        plantNumber == 7 ? plant = plant7 : plant;
        plantNumber == 8 ? plant = plant8 : plant;
        plantNumber == 9 ? plant = plant9 : plant;
        return (
            <View key = {"plant_" + y * 10 + i}>
                <Image style={{top: 35 + (i * 35 + y * 34), left: -45 + (y * 45 - i * 46), position: "absolute", width: 80, height: 80, resizeMode: "contain"}} source={plant}/>
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
    var plantField = [];

    for (let y = 1; y < 6; y++) {
        for (let i = 1; i < 6; i++) {
		    gardenField.push(
			    <View key = {"field_" + y * 10 + i}>
                    <Image style={{top: 50 + (i * 35 + y * 35), left: -50 + (y * 45 - i * 46), position: "absolute", width: 90, height: 90}} source={field_dirt}/>
			    </View>
		    );
	    }
    }
    for (let y = 1; y < 6; y++) {
        for (let i = 1; i < 6; i++) {
		    plantField.push(
			    <View key = {"plant_" + y * 10 + i}>
                    <ParseMap i={i} y={y} map={mapTest}/>
			    </View>
		    );
	    }
    }

    return (
        <View style={styles.container}>
            { gardenField }
            { plantField }
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