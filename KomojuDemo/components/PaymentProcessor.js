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

  useEffect(async () => {
    setLoadingState(true);
    try {
      const response = await fetch(paymentUrl, fetchOptions);
      if (response.status > 399) {
        // show error state
      } else {
        // kick off step 4 and directly communicate with the provider
      }
    } catch (error) {
      console.log('ERROR:', error);
    }

    setLoadingState(false);
  }, []);

  return <Text>Please wait while the payment is being reserved</Text>;
};

export default PaymentProcessor;
