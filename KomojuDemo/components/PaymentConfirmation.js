import React from 'react';
import {Button} from 'react-native-elements';
import {View, Text} from 'react-native';

const PaymentConfirmation = ({navigation, route}) => {
  const {total, currency, paymentId, orderId} = route.params;

  const confirmPayment = () => {
    const capturePaymentRequestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({paymentId}),
    };

    fetch(
      `http://degicaexample.au.ngrok.io/capture_payment/${orderId}`,
      capturePaymentRequestOptions,
    )
      .then(response => console.log('capture payment response: ', response))
      .catch(error => console.log('capture payment error: ', error));
  };

  const navigateToHome = () => {
    navigation.navigate('Welcome');
  };

  return (
    <View>
      <Text>{`Do you want to spend ${total} ${currency}?`}</Text>
      <Button title="Yes" onPress={confirmPayment} />
      <Button title="No" onPress={navigateToHome} />
    </View>
  );
};

export default PaymentConfirmation;
