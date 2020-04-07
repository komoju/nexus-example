import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Button} from 'react-native-elements';

const Home = ({navigation}) => (
  <View style={styles.container}>
    <Text style={styles.greeting}>Hi! 👋</Text>
    <Text style={styles.explainerText}>
      This is an example app to demonstrate how to integrate with the Nexus
      APIs. You can tap on the "Scan Komoju QR Code" button below to scan the
      example QR code to see the flow for an example payment.
    </Text>
    <Button
      title="Scan Komoju QR Code"
      onPress={() => navigation.navigate('Scanner')}
      buttonStyle={styles.button}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 48,
    textAlign: 'center',
  },
  explainerText: {
    margin: '7%',
    fontSize: 20,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#e9572b',
    padding: '5% 0%',
    borderRadius: 5,
  },
});

export default Home;
