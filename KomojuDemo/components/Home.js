import React from 'react';
import {View, Text, Button} from 'react-native';

const Home = ({navigation}) => (
  <View>
    <Text>Hi!</Text>
    <Button
      title="Scan Komoju QR Code"
      onPress={() => navigation.navigate('Scanner')}></Button>
  </View>
);

export default Home;
