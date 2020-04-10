import React from 'react';
import {Button} from 'react-native-elements';
import {View, Text, StyleSheet} from 'react-native';

import globalStyles from './globalStyles';

const PaymentConfirmation = ({navigation, route}) => {
  const {total, currency, paymentId, orderId} = route.params;

  const confirmPayment = () => {
    const capturePaymentRequestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({paymentId}),
    };

    fetch(
      `https://nexus-example-provider.herokuapp.com/capture_payment/${orderId}`,
      capturePaymentRequestOptions,
    )
      .then(response => {
        console.log('capture payment response: ', response);
        navigation.navigate('PaymentSuccess');
      })
      .catch(error => console.log('capture payment error: ', error));
  };

  const navigateToHome = () => {
    navigation.navigate('Welcome');
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.emoji}>💸</Text>
      <Text
        style={
          styles.text
        }>{`Do you want to spend ${total} ${currency}?`}</Text>
      <Button
        buttonStyle={styles.button}
        title="Yes"
        titleStyle={{fontSize: 24}}
        onPress={confirmPayment}
      />
      <Button
        buttonStyle={styles.button}
        title="No"
        titleStyle={{fontSize: 24}}
        onPress={navigateToHome}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    paddingBottom: 50,
  },
  button: {
    ...globalStyles.button,
    marginVertical: '5%',
    paddingHorizontal: '20%',
  },
});

export default PaymentConfirmation;
