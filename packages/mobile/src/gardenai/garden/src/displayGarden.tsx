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

/*const mapTest = [[3, 3, 0, 0, 1, 0, 0, 0, 0, 0, 7, 7, 0, 0],
[3, 0, 0, 0, 1, 0, 0, 0, 0, 0, 7, 7, 0, 0],
[0, 0, 6, 0, 1, 0, 0, 0, 0, 0, 7, 7, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 0, 0],
[0, 0, 0, 7, 7, 0, 0, 0, 0, 0, 7, 7, 0, 0],
[0, 0, 0, 7, 7, 0, 0, 0, 0, 0, 7, 7, 0, 0],
[0, 0, 0, 7, 7, 0, 0, 0, 0, 0, 7, 7, 0, 0],
[3, 3, 0, 0, 1, 0, 0, 0, 0, 0, 7, 7, 0, 0],
[3, 0, 0, 0, 1, 0, 0, 0, 0, 0, 7, 7, 0, 0],
[0, 0, 6, 0, 1, 0, 0, 0, 0, 0, 7, 7, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 0, 0],
[0, 0, 0, 7, 7, 0, 0, 0, 0, 0, 7, 7, 0, 0],
[0, 0, 0, 7, 7, 0, 0, 0, 0, 0, 7, 7, 0, 0],
[0, 0, 0, 7, 7, 0, 0, 0, 0, 0, 7, 7, 0, 0]
]*/

const mapTest = [[3, 3, 0, 0, 1, 0, 0],
[3, 0, 0, 0, 1, 0, 0],
[0, 0, 6, 0, 1, 0, 0],
[0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 7, 7, 0, 0],
[0, 0, 0, 7, 7, 0, 0],
[0, 0, 0, 7, 7, 0, 0]
]

/*const mapTest = [[3, 3, 0, 0],
[3, 0, 0, 0],
[0, 0, 6, 0],
[0, 0, 0, 0],
]*/

const plant = {
    width: 80 / (mapTest.length /5),
    height: 80 / (mapTest.length /5)
}

const field = {
    width: 90 / (mapTest.length /5),
    height: 90 / (mapTest.length /5)
}

var background = require('../ressource/background.png');

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
    var width = plant.width / 2;
    let plantNumber = props.map[y - 1][i - 1];
    var plantImg;
    if (plantNumber != 0) {
        plantNumber == 1 ? plantImg = plant1 : plantImg;
        plantNumber == 2 ? plantImg = plant2 : plantImg;
        plantNumber == 3 ? plantImg = plant3 : plantImg;
        plantNumber == 4 ? plantImg = plant4 : plantImg;
        plantNumber == 5 ? plantImg = plant5 : plantImg;
        plantNumber == 6 ? plantImg = plant6 : plantImg;
        plantNumber == 7 ? plantImg = plant7 : plantImg;
        plantNumber == 8 ? plantImg = plant8 : plantImg;
        plantNumber == 9 ? plantImg = plant9 : plantImg;
        return (
            <View key = {"plant_" + y * 10 + i}>
                <Image style={{top: 80 + (i * width + y * width), left: - width + (y * width  - i * width), position: "absolute", width: plant.width, height: plant.height, resizeMode: "contain"}} source={plantImg}/>
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
    var width = field.width / 2;

    for (let y = 1; y < mapTest.length; y++) {
        for (let i = 1; i < mapTest.length; i++) {
		    gardenField.push(
			    <View key = {"field_" + y * 10 + i}>
                    <Image style={{top: 80 + width + (i * (width - width / 5) + y * (width - width / 5)), left: - width + (y * width - i * width), position: "absolute", width: field.width, height: field.height, resizeMode: "contain"}} source={field_dirt}/>
			    </View>
		    );
	    }
    }
    for (let y = 1; y < mapTest.length; y++) {
        for (let i = 1; i < mapTest.length; i++) {
		    plantField.push(
			    <View key = {"plant_" + y * 10 + i}>
                    <ParseMap i={i} y={y} map={mapTest}/>
			    </View>
		    );
	    }
    }

    return (
        <View style={styles.container}>
            <View>
                <Image style={{top: 0, left: -500, position: "absolute"}} source={background}/>
            </View>
            { gardenField }
            { plantField }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        backgroundColor: "#FFFBF9",
        alignItems: 'center',
        paddingTop: StatusBar.currentHeight,
    }
})

export default displayGarden;