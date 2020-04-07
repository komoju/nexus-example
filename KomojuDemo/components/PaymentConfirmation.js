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
    <View style={styles.container}>
      <Text style={styles.pageHeader}>❓</Text>
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
  pageHeader: {
    fontSize: 70,
  },
  button: {
    ...globalStyles.button,
    padding: '5%',
    paddingLeft: '20%',
    paddingRight: '20%',
  },
});

export default PaymentConfirmation;
