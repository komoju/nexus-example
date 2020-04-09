import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Button} from 'react-native-elements';
import globalStyles from './globalStyles';

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
      buttonStyle={globalStyles.button}
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
    marginVertical: '7%',
    marginHorizontal: '5%',
    fontSize: 20,
  },
});

export default Home;
