import React, { FC, useState, useEffect, } from "react";
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Entypo,FontAwesome5 } from '@expo/vector-icons';
import { useCartItem } from "../../../store/cartItems";

interface PlantGrid {
}

const plantGrid = (props: PlantGrid) => {
  const setCartItems = useCartItem((state) => state.setCartItems);
  const cartItems = useCartItem((state) => state.items)

function removeCart(e : number) {
  let array = cartItems;
  if (e !== -1) {
    array.splice(e, 1);
    setCartItems(array);
  }
};

  return (
    <ScrollView 
    style={{
      flexGrow: 1, 
      flexDirection: 'column', 
      height:'100%', 
      width:"100%"
    }}>
      <SafeAreaView style={[{flexDirection: 'row',  flexWrap: 'wrap', justifyContent: 'center'}]}>
        {cartItems.map((item , i)=> 
          <View key={i} style={[{position:"relative",alignItems: 'center'}]}>
              <View style={[styles.plantCart,  {backgroundColor:item.code, }]}>
                  <FontAwesome5 name="circle" size={25} color="black" style={[styles.quitIcon, {color:'#FF6565',}]} onPress={() => {removeCart(i)}} solid/>
                  <Text style={{color:"white", position:'absolute', right: -1,top: -7, }} onPress={() => {removeCart(i)}} >x</Text>
                  <Text style={{color:"white", }}>{item.name}</Text>
              </View>
              <TextInput style={[styles.Input,]} placeholder="1" placeholderTextColor="#000" keyboardType="number-pad" ></TextInput>          
          </View>
        )}
      </SafeAreaView>
      <View style={[{ position: 'absolute', bottom: '-10%', }]}>
                <TouchableOpacity style={[styles.validateButton,]}
                    onPress={() =>(console.log("valider"))}>
                    <Text style={{ fontSize: Dimensions.get("screen").height / 25, color: "#FFF", fontWeight: "bold", fontFamily: 'VigaRegular' }}>valider</Text>
                </TouchableOpacity>
            </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  plantCart: {
    height: Dimensions.get("screen").height /10,
    width: Dimensions.get("screen").height /10,
    marginHorizontal: 5,
    borderRadius: 5,
    justifyContent: 'center', alignItems: 'center',
    marginRight: "2%",
    marginTop:"20%",
    // padding:10,
  },
  quitIcon: {
    position:'absolute',
    right: -10,
    top: -10,    
  },
  Input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'rgba(54, 34, 34, 0.25)',
    borderRadius: 10,
    backgroundColor: '#FFF9F5',
    marginTop: "10%",
    height:"25%",
    minWidth:'10%',
    textAlign: 'center'
  },
  validateButton: {
    marginBottom: "-100%",
    marginLeft:"10%",
    width: Dimensions.get("screen").width / 1.2,
    height: Dimensions.get("screen").height / 20,//Dimensions.get("window").height /5,
    borderWidth: 2,
    borderColor: 'rgba(54, 34, 34, 0.25)',
    minWidth: '40%',
    minHeight: '5%',
    borderRadius: 10,
    backgroundColor: "#65C18C",
    alignItems: 'center',
    justifyContent: 'center',


},
  borderRed: {
    borderWidth: 2, borderColor:'red' ,
    height:"100%",
  },
});

export default plantGrid;