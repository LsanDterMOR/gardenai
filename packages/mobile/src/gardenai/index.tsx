import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

interface GardenaiProps {
    navigation: any;
  }
  
const Gardenai = (props: GardenaiProps) => {
  
    return (  
      <View style={styles.container}>
          <Text>GARDENAI </Text>
          <Button
            title="Press me"
            onPress={()=> props.navigation.navigate("Camera")}/>
          <Button
            title="Press me"
            onPress={()=> props.navigation.navigate("CreateGarden")}/>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      height: "100%",
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',   
      // backgroundColor: "#FFF9F5"
    },
  });
  
  export default Gardenai;
  