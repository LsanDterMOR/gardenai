import React from "react";
import { AppRegistry } from "react-native";
import Navigator from "./src/Navigator";

const App = () => {
  return <Navigator />;
};

export default App;

AppRegistry.registerComponent("Gardenai", () => App);
