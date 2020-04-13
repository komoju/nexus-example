import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import globalStyles from './globalStyles';

const Loading = ({message}) => (
  <View style={globalStyles.container}>
    <ActivityIndicator size="large" color="#e9572b" />
    <Text style={globalStyles.text}>{message}</Text>
  </View>
);

export default Loading;
