import React from "react";
import { AppRegistry } from "react-native";
import Navigator from "./src/Navigator";
import { useFonts } from 'expo-font';


const App = () => {
   const [loaded] = useFonts({
      VigaRegular: require('./font/Viga-Regular.ttf'),
    });

    if (!loaded) {
      return null;
    }
  return <Navigator />;
};

export default App;

AppRegistry.registerComponent("Gardenai", () => App);
