import React, { useState } from "react";
import { NavigationContainer, TabActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./auth/login";
import Register from "./auth/register";
import Gardenai from "./gardenai/index";
import CameraGardenai from "./gardenai/camera";
import CreateGarden from "./gardenai/createGarden";
import ListOfPlants from "./gardenai/listOfPlants";
import Garden from "./gardenai/garden";

const Stack = createNativeStackNavigator();
const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Garden"
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Gardenai" component={Gardenai} />
      <Stack.Screen name="Camera" component={CameraGardenai} />
      <Stack.Screen name="CreateGarden" component={CreateGarden} />
      <Stack.Screen name="ListOfPlants" component={ListOfPlants} />
      <Stack.Screen name="Garden" component={Garden} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
