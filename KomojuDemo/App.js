/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import 'react-native-gesture-handler';

import React, {useState, useRef} from 'react';
import {NavigationContainer, useLinking} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import QRScanner from './components/QRScanner';
import Home from './components/Home';
import PaymentProcessor from './components/PaymentProcessor';
import PaymentConfirmation from './components/PaymentConfirmation';
import PaymentSuccess from './components/PaymentSuccess';

const Stack = createStackNavigator();

const App = () => {
  // Deep linking integration taken from https://reactnavigation.org/docs/deep-linking/
  const ref = useRef();

  const {getInitialState} = useLinking(ref, {
    prefixes: ['komoju-demo://'],
    config: {
      PaymentProcessor: {
        path: 'session/:paymentUrl',
        parse: {
          paymentUrl: encodedUrl => decodeURIComponent(encodedUrl),
        },
      },
    },
  });

  const [isReady, setIsReady] = useState(false);
  const [initialState, setInitialState] = useState();

  React.useEffect(() => {
    getInitialState()
      .catch(error => console.log('ERROR: ', error))
      .then(state => {
        if (state !== undefined) {
          setInitialState(state);
        }

        setIsReady(true);
      });
  }, [getInitialState]);

  if (!isReady) {
    return null;
  }

  return (
    <NavigationContainer initialState={initialState} ref={ref}>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={Home} />
        <Stack.Screen
          name="Scanner"
          component={QRScanner}
          options={{title: 'Scan Komoju QR Code'}}
        />
        <Stack.Screen
          name="PaymentProcessor"
          component={PaymentProcessor}
          options={{headerLeft: null}}
        />
        <Stack.Screen
          name="PaymentConfirmation"
          component={PaymentConfirmation}
          options={{title: 'Confirm Payment', headerLeft: null}}
        />
        <Stack.Screen
          name="PaymentSuccess"
          component={PaymentSuccess}
          options={{title: 'Payment Successful'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
