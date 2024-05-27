// android 139110344231-666c39mm829d5sthatk8gj529q3nf3mh.apps.googleusercontent.com
// web 139110344231-obn13b0e1trmimlslps5rguutuotpram.apps.googleusercontent.com

// App.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


// import HomeScreen from './screens/HomeScreen.js';
// import DetailsScreen from './screens/DetailsScreen';
import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import BillingScreen from './src/screens/BillingScreen';

const Stack = createNativeStackNavigator();

export default function App() {


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="BillingScreen" component={BillingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
