import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Text, View, StyleSheet, Linking} from 'react-native';

import globalStyles from './globalStyles';

const PaymentProcessor = ({navigation, route}) => {
  const {paymentUrl} = route.params;
  const [isError, setError] = useState(false);

  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({method: 'qr', provider: 'tim'}),
  };

  useEffect(() => {
    fetch(paymentUrl, fetchOptions)
      .then(response => {
        if (response.status < 400) {
          return response.json();
        } else {
          throw Error(
            `bad response from Komoju, url: ${paymentUrl}, response code: ${response.status}, response body: ${response.body}`,
          );
        }
      })
      .then(json => {
        const {
          payment: {total, currency, id},
        } = json;
        const authorizationResponseText = JSON.parse(
          json.payment.payment_details.authorization_response_text,
        );

        navigation.navigate('PaymentConfirmation', {
          orderId: authorizationResponseText.orderId,
          paymentId: id,
          total,
          currency,
        });
      })
      .catch(error => {
        console.log('ERROR: ', error);
        setError(true);
      });
  }, []);

  return (
    <View style={globalStyles.container}>
      {isError ? (
        <View style={globalStyles.container}>
          <Text style={styles.emoji}>😿</Text>
          <Text style={styles.text}>
            It looks like something's gone wrong. Please try again. If you're
            still having a problem please raise an issue on the{' '}
            <Text
              style={{color: 'blue'}}
              onPress={() =>
                Linking.openURL(
                  'https://github.com/komoju/nexus-example/issues/new',
                )
              }>
              Github repository
            </Text>
          </Text>
        </View>
      ) : (
        <View>
          <ActivityIndicator size="large" color="#e9572b" />
          <Text style={styles.text}>
            Please wait while the payment is being reserved
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    margin: '7% 0%',
  },
  emoji: {
    fontSize: 70,
  },
});

export default PaymentProcessor;
