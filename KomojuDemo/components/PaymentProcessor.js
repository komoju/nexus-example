import React, {useEffect, useState} from 'react';
import {Text, Alert} from 'react-native';

const PaymentProcessor = ({route}) => {
  const {paymentUrl} = route.params;
  const [isLoading, setLoadingState] = useState(false);

  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({method: 'qr', provider: 'tim'}),
  };

  useEffect(() => {
    setLoadingState(true);
    fetch(paymentUrl, fetchOptions)
      .then(response => {
        if (response.status < 400) {
          return response.json();
        } else {
          // set error state
        }
      })
      .then(json => {
        const {
          payment: {total, currency, id},
        } = json;
        const authorizationResponseText = JSON.parse(
          json.payment.payment_details.authorization_response_text,
        );
        console.log('******** json', json);
        console.log('total', total);
        console.log('currency', currency);
        console.log('payment id', id);
        Alert.alert(
          'Payment Confirmation',
          `Do you want to spend ${total} ${currency}?`,
          [
            {
              text: 'Yes',
              onPress: () => {
                // communicate with the provider directly to capture payment
                const capturePaymentRequestOptions = {
                  method: 'POST',
                  headers: {'Content-Type': 'application/json'},
                  body: JSON.stringify({paymentId: id}),
                };
                fetch(
                  `http://degicaexample.au.ngrok.io/capture_payment/${authorizationResponseText.orderId}`,
                  capturePaymentRequestOptions,
                )
                  .then(response =>
                    console.log('capture payment response: ', response),
                  )
                  .catch(error =>
                    console.log('capture payment error: ', error),
                  );
                console.log('say yes to the payment');
              },
            },
            {
              text: 'No',
              onPress: () => {
                // go back to the home screen
                console.log('noooooooooope');
              },
            },
            {cancelable: false},
          ],
        );
      })
      .catch(error => console.log('ERROR: ', error))
      .finally(() => setLoadingState(false));
  }, []);

  return <Text>Please wait while the payment is being reserved</Text>;
};

export default PaymentProcessor;
