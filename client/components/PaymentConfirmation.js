import React, {useState} from 'react';
import {Button} from 'react-native-elements';
import {View, Text, StyleSheet} from 'react-native';

import globalStyles from './globalStyles';
import Loading from './Loading';
import ErrorMessage from './Error';

const BACKEND_URL = 'https://nexus-example-provider.herokuapp.com'

/*
The PaymentConfirmation component is responsible for asking for confirmation from
the user and if they confirm, capturing the payment. The capture payment URL is a 
direct link to the provider and doesn't need to meet any specific requirements. In
this example, the request will be sent with the order ID the provider returned in
the PaymentProcessor step, as well as the payment ID. The payment ID is required by
the provider to notify Komoju that the payment has been successfully captured, but
that could have been stored in a database on the provider side and doesn't need to
be sent from the client.
*/
const PaymentConfirmation = ({navigation, route}) => {
  const {authentic, amount, currency, paymentId, orderId, komojuEndpoint} =
    route.params;

  const [isLoading, setIsLoading] = useState(false);
  const [hasErrored, setHasErrored] = useState(false);

  const confirmPayment = () => {
    setHasErrored(false);
    setIsLoading(true);
    const capturePaymentRequestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({paymentId, komojuEndpoint}),
    };
    const capturePaymentUrl = `${BACKEND_URL}/capture_payment/${orderId}`;

    fetch(capturePaymentUrl, capturePaymentRequestOptions)
      .then((response) => {
        if (response.status < 400) {
          console.log('capture payment response: ', response);
          navigation.navigate('PaymentSuccess');
        } else {
          throw Error(
            `bad response from the provider, url: ${capturePaymentUrl}, response code: ${response.status}, response body: ${response.body}`,
          );
        }
      })
      .catch((error) => {
        console.log('capture payment error: ', error);
        setHasErrored(true);
      });
  };

  const navigateToHome = () => {
    navigation.navigate('Welcome');
  };

  if (hasErrored) {
    return <ErrorMessage navigation={navigation} />;
  }

  if (isLoading) {
    return (
      <Loading message="Please wait while the payment is being confirmed" />
    );
  }

  const authenticityMessage = authentic ? "✔️ Valid komoju.com signature"
                                        : "❌ Invalid komoju.com signature";

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.emoji}>💸</Text>
      <Text style={styles.text}>{authenticityMessage}</Text>
      <Text
        style={
          styles.text
        }>{`Do you want to spend ${amount} ${currency}?`}</Text>
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
