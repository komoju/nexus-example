import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';

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
        console.log(
          '***** orderId',
          JSON.parse(json.payment.payment_details.authorization_response_text)
            .orderId,
        );
        // communicate with the provider directly to capture payment
      })
      .catch(error => console.log('ERROR: ', error))
      .finally(() => setLoadingState(false));
  }, []);

  return <Text>Please wait while the payment is being reserved</Text>;
};

export default PaymentProcessor;
