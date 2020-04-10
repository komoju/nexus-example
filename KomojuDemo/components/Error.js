import React from 'react';
import {View, Text, Linking} from 'react-native';

import globalStyles from './globalStyles';

const Error = () => (
  <View style={globalStyles.container}>
    <Text style={globalStyles.emoji}>😿</Text>
    <Text style={globalStyles.text}>
      It looks like something's gone wrong. Please try again. If you're still
      having a problem please raise an issue on the{' '}
      <Text
        style={{color: 'blue'}}
        onPress={() =>
          Linking.openURL('https://github.com/komoju/nexus-example/issues/new')
        }>
        Github repository
      </Text>
    </Text>
  </View>
);

export default Error;
