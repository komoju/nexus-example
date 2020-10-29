import React, {useEffect, useState} from 'react';

import Loading from './Loading';
import ErrorMessage from './Error';

/*
The PaymentProcessor component is responsible for taking the payment URL and sending
the reservePayment API call to Komoju. The url can come from a scanned QR code via
QRScanner.js or from the mobile deep link, which gets routed through the App.js file.
Once Komoju has received the request it will forward it onto the provider endpoint
as configured, in this example app that will be the / route. (Refer to the
provider/app.js file to see the implementation). It then forwards on several pieces
of information to the PaymentConfirmation component for the next step.
*/
const PaymentProcessor = ({navigation, route}) => {
  const {paymentUrl} = route.params;
  const [hasErrored, setHasErrored] = useState(false);

  const preFetchOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  };

  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({provider: 'tim'}),
  };

  useEffect(() => {
    setHasErrored(false);
    fetch(paymentUrl, preFetchOptions)
      .then((preResponse) => {
        if (preResponse.headers.map['content-type'] !== 'application/vnd.nexus-link+json') {
          throw Error(
            `Valid endpoints should return "application/vnd.nexus-link+json", url: ${paymentUrl}, response code: ${response.status}, response body: ${response.body}`,
          );
        }
        fetch(paymentUrl, fetchOptions)
          .then((response) => {
            if (response.status < 400) {
              return response.json();
            } else {
              throw Error(
                `bad response from Komoju, url: ${paymentUrl}, response code: ${response.status}, response body: ${response.body}`,
              );
            }
          })
          .then((json) => {
            const {
              payment: {total, currency, id},
            } = json;
            // any information returned from the provider will be inserted into Komoju's
            // response as a JSON string at
            // payment.payment_details.authorization_response_text
            const authorizationResponseText = JSON.parse(
              json.payment.payment_details.authorization_response_text,
            );

            const komojuEndpoint = `https://${paymentUrl.split('/')[2]}`
    
            navigation.navigate('PaymentConfirmation', {
              orderId: authorizationResponseText.orderId,
              paymentId: id,
              total,
              currency,
              komojuEndpoint
            });
          })
      })
      .catch((error) => {
        console.log('ERROR: ', error);
        setHasErrored(true);
      });
  }, [paymentUrl]);

  if (hasErrored) {
    return <ErrorMessage navigation={navigation} />;
  }

  return <Loading message="Please wait while the payment is being reserved" />;
};

export default PaymentProcessor;
