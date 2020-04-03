import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';

const PaymentProcessor = ({route}) => {
  const {paymentUrl} = route;
  const [isLoading, setLoadingState] = useState(false);

  const fetchOptions = {
    method: 'POST',
    body: JSON.stringify({method: 'qr', provider: 'tim'}),
  };

  useEffect(() => {
    setLoadingState(true);
    fetch(paymentUrl, fetchOptions)
      .then(response => {
        console.log(response);
        setLoadingState(false);
        //   kick off step 4 and directly communicate with the provider
      })
      .catch(err => {
        // TODO set up error handling for failed request
        console.log('ERROR:', err);
        setLoadingState(false);
      });
  }, []);
  return <Text>Please wait while the payment is being reserved</Text>;
};

export default PaymentProcessor;
