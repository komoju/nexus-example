/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import 'react-native-gesture-handler';

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import QRScanner from './components/QRScanner';
import Home from './components/Home';
import PaymentProcessor from './components/PaymentProcessor';
import PaymentConfirmation from './components/PaymentConfirmation';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={Home} />
        <Stack.Screen
          name="Scanner"
          component={QRScanner}
          options={{title: 'Scan Komoju QR Code'}}
        />
        <Stack.Screen name="PaymentProcessor" component={PaymentProcessor} />
        <Stack.Screen
          name="PaymentConfirmation"
          component={PaymentConfirmation}
          options={{title: 'Confirm Payment'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
