import React from 'react'
import { NavigationContainer, TabActions } from '@react-navigation/native';
import { createNativeStackNavigator  } from '@react-navigation/native-stack';
import Login from './auth/login/index';
import Register from './auth/register/index';
import Gardenai from './gardenai/index';
import CameraGardenai from './gardenai/camera/index';
import GardenGenerator from './gardenai/gardenGeneration/intex'


const Stack = createNativeStackNavigator();

const AppNavigator = () => (
   <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='Login'>
         <Stack.Screen name="Login" component={Login} />
         <Stack.Screen name="Register" component={Register} />
         <Stack.Screen name="Gardenai" component={Gardenai} />
         <Stack.Screen name="Camera" component={CameraGardenai} />
         <Stack.Screen name="GardenGenerator" component={GardenGenerator} />
      </Stack.Navigator>
   </NavigationContainer>
)
export default AppNavigator