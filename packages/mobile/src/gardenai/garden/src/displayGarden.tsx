import React, { FC, useState, useEffect, } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
} from "react-native";

interface Plant {
    name: string;
    pos: Pos;
  }

interface Pos {
    x: number;
    y: number;
    size: number;
}

interface PlantInfo {
    name: string;
    size: number;
}

interface GardenProps {
    i: number;
    y: number;
    map: Array<Array<PlantInfo>>;
  }

interface DisplayProps {
    Width: number;
    Height: number;
    Path: Array<Array<number>>;
    PlantList: Array<Plant>;
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

var tomato = require('../ressource/tomato.png');
var carot = require('../ressource/carot.png');
var lettuce = require('../ressource/lettuce.png');
// var plant4 = require('../ressource/plant4.png');
// var plant5 = require('../ressource/plant5.png');
// var plant6 = require('../ressource/plant6.png');
// var plant7 = require('../ressource/plant7.png');
// var plant8 = require('../ressource/plant8.png');
// var plant9 = require('../ressource/plant9.png');

function ParseMap(props: GardenProps) {
    let i = props.i;
    let y = props.y;
    var height = plant.height;
    var width = plant.width;
    var plantname = ""
    plantname = props.map[y - 1][i - 1].name;
    var plantImg;
    if (plantname != null) {
        plantImg = plantname == "tomato" ? tomato : plantImg;
        plantImg = plantname == "carot" ? carot : plantImg;
        // plantNumber == 3 ? plantImg = plant3 : plantImg;
        // plantNumber == 4 ? plantImg = plant4 : plantImg;
        // plantNumber == 5 ? plantImg = plant5 : plantImg;
        // plantNumber == 6 ? plantImg = plant6 : plantImg;
        // plantNumber == 7 ? plantImg = plant7 : plantImg;
        // plantNumber == 8 ? plantImg = plant8 : plantImg;
        // plantNumber == 9 ? plantImg = plant9 : plantImg;
        return (
            <View key = {"plant_" + y * 10 + i}>
                <Image style={{top: topMargin + (i * height + y * height) - (50 * (props.map[y-1][i-1].size - 1)), left:- width + (y * width  - i * width) - (50 * (props.map[y-1][i-1].size - 1)), position: "absolute", width: plant.size * props.map[y-1][i-1].size , height: plant.size * props.map[y-1][i-1].size, resizeMode: "contain"}} source={plantImg}/>
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
    var garden = {
        width: props.Width,
        height: props.Height
    }
    var path = props.Path;
    var PlantList = props.PlantList;
    var map = Array(garden.width).fill({name: "", size: 0}).map(_ => Array(garden.height).fill({name: "field_dirt", size: 1}));
    var biggerSize = garden.width > garden.height ? garden.width : garden.height
    var scale = 1.0 / (biggerSize / 4)
    topMargin = 50 * biggerSize;
    path.forEach(pathElem => {
        if (pathElem[0] < garden.width && pathElem[1] < garden.height) {
            map[pathElem[0]][pathElem[1]] = {name: "field_rock", size: 1};
        }
    })

    var gardenField = [];
    var plantField = [];
    var height = field.height;
    var width = field.width;

    for (let y = 1; y <= garden.width; y++) {
        for (let i = 1; i <=  garden.height; i++) {
            if (map[y-1][i-1].name == "field_dirt") {
		    gardenField.push(
			    <View key = {"field_" + y * 10 + i}>
                    <Image style={{top: topMargin + (i * height + y * height), left: - width + (y * width  - i * width), position: "absolute", width: field.size, height: field.size, resizeMode: "contain"}} source={field_dirt}/>
			    </View>
		    );
            }
            else if (map[y-1][i-1].name == "field_rock") {
                gardenField.push(
                    <View key = {"field_" + y * 10 + i}>
                        <Image style={{top: topMargin + (i * height + y * height), left: - width + (y * width  - i * width), position: "absolute", width: field.size, height: field.size, resizeMode: "contain"}} source={field_rock}/>
                    </View>
                );
            }
	    }
    }

    PlantList.forEach(plantElem => {
        if (plantElem.pos.x < garden.width && plantElem.pos.y < garden.height) {
            map[plantElem.pos.x][plantElem.pos.y] = {name: plantElem.name, size: plantElem.pos.size}
        }
    })

    for (let y = 1; y <= garden.width; y++) {
        for (let i = 1; i <= garden.height; i++) {
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