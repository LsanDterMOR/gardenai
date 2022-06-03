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

const plantGrid = () => {

  const [cartItems, setCartItems] = useState([
    { name: 'TOMATE', code: '#1abc9c' },
    { name: 'MAÏS', code: '#2ecc71' },
    { name: 'PATATE', code: '#3498db' },
    { name: 'TONY', code: '#9b59b6' },
    { name: 'SALADE', code: '#1abc9c' },
    { name: 'BLE', code: '#3498db' },
    { name: 'PARKER', code: '#9b59b6' },
  ]);

  useEffect(() => {
    // const screenWidth = Dimensions.get('screen').width;
    // const screenHeight = Dimensions.get('screen').height;
}, []);

  useEffect(() => {
    console.log("useEffect cartItems => ")
    console.log(cartItems);
  }, [cartItems]);

function removeCart(e : number) {
  var array = cartItems; // make a separate copy of the array
  if (e !== -1) {
    array.splice(e, 1);
    setCartItems(cartItems => ([...array]));

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
              <TextInput style={[styles.Input,]} placeholder="test" placeholderTextColor="#000" keyboardType="number-pad" onChangeText={() => removeCart(i)}></TextInput>          
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
    height:"20%",
    
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