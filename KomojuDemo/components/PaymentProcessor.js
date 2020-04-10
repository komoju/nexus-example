import React, {useEffect, useState} from 'react';

import Loading from './Loading';
import ErrorMessage from './Error';

const PaymentProcessor = ({navigation, route}) => {
  const {paymentUrl} = route.params;
  const [hasErrored, setHasErrored] = useState(false);

  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({method: 'qr', provider: 'tim'}),
  };

  useEffect(() => {
    setHasErrored(false);
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
        setHasErrored(true);
      });
  }, []);

  if (hasErrored) {
    return <ErrorMessage />;
  }

  return <Loading message="Please wait while the payment is being reserved" />;
};

export default PaymentProcessor;
