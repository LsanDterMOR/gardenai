import { AppRegistry, View } from 'react-native';
import Navigator from './src/Navigator'
import React, { Component } from 'react';

class Gardenai extends Component {
  render() {
     return (
        <Navigator />
     )
  }
}
export default Gardenai
AppRegistry.registerComponent('Gardenai', () => Gardenai)