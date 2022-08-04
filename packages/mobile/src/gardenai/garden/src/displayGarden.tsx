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
    map: Array<Array<Array<number>>>;
  }

interface DisplayProps {
    Size: Array<number>;
    Path: Array<Array<number>>;
    Plant: Array<{
        id: number;
        pos: Array<number>;
    }>;
}

const plant = {
    size: 90,
    width: 45,
    height: 26
}

const field = {
    size: 90,
    width: 45,
    height: 26
}

var topMargin = 0;

var background = require('../ressource/background.png');

var sun = require('../ressource/sun.png');

var field_grass = require('../ressource/field_grass.png');
var field_dirt = require('../ressource/field_dirt.png');
var field_rock = require('../ressource/field_rock.png');

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
    var height = plant.height;
    var width = plant.width;
    let plantNumber = props.map[y - 1][i - 1][0];
    var plantImg = 0;
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
                <Image style={{top: topMargin + (i * height + y * height) - (50 * (props.map[y-1][i-1][1] - 1)), left:- width + (y * width  - i * width) - (50 * (props.map[y-1][i-1][1] - 1)), position: "absolute", width: plant.size * props.map[y-1][i-1][1] , height: plant.size * props.map[y-1][i-1][1], resizeMode: "contain"}} source={plantImg}/>
            </View>
        )
    }
    else {
        return(
            <View></View>
        )
    }
}



const displayGarden = (props: DisplayProps) => {
    var ids = "";
    var size = props.Size;
    var path = props.Path;
    var plant = props.Plant;
    var map = Array(size[0]).fill(1).map(_ => Array(size[1]).fill([0,0]));
    var biggerSize = size[0] > size[1] ? size[0] : size[1]
    var scale = 1.0 / (biggerSize/4)
    topMargin = 50 * biggerSize;
    plant.forEach(plantElem => {
        ids += plantElem.id + ",";
    });
    path.forEach(pathElem => {
        if (pathElem[0] < size[0] && pathElem[1] < size[1]) {
            map[pathElem[0]][pathElem[1]] = [-1, 1];
        }
    })

    var gardenField = [];
    var plantField = [];
    var height = field.height;
    var width = field.width;

    for (let y = 1; y <= size[0]; y++) {
        for (let i = 1; i <=  size[1]; i++) {
            if (map[y-1][i-1][0] == 0) {
		    gardenField.push(
			    <View key = {"field_" + y * 10 + i}>
                    <Image style={{top: topMargin + (i * height + y * height), left: - width + (y * width  - i * width), position: "absolute", width: field.size, height: field.size, resizeMode: "contain"}} source={field_dirt}/>
			    </View>
		    );
            }
            else if (map[y-1][i-1][0] == -1) {
                gardenField.push(
                    <View key = {"field_" + y * 10 + i}>
                        <Image style={{top: topMargin + (i * height + y * height), left: - width + (y * width  - i * width), position: "absolute", width: field.size, height: field.size, resizeMode: "contain"}} source={field_rock}/>
                    </View>
                );
            }
	    }
    }

    plant.forEach(plantElem => {
        if (plantElem.pos[0] < size[0] && plantElem.pos[1] < size[1]) {
            map[plantElem.pos[0]][plantElem.pos[1]] = [plantElem.id,plantElem.pos[2]];
        }
    })

    for (let y = 1; y <= size[0]; y++) {
        for (let i = 1; i <= size[1]; i++) {
		    plantField.push(
			    <View key = {"plant_" + y * 10 + i}>
                    <ParseMap i={i} y={y} map={map}/>
			    </View>
		    );
	    }
    }

    return (
        <View style={styles.container}>
            <View>
                <Image style={{top: -1200, left: -1800, position: "absolute"}} source={background}/>
            </View>
            <View style={{transform: [{ scale: scale}]}}>
                { gardenField }
                { plantField }
            </View>
            <View>
                <Image style={{top: -100, left: -100, transform: [{ scale: 0.3}], position: "absolute"}} source={sun}/>
            </View>
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