const axios = require("axios");

const { generateNexusProviderSignature } = require("./verifier");

/* 
This is the endpoint the client directly talks to the provider with to ensure the
payment is correctly captured and confirmed. What this does is up to the individual
application, but once payment is successfully captured then the komoju callback URL
must be called with the body of {"type": "payment.captured", "payment_id": id}. In 
this example app we're getting the payment ID from the client application as it 
doesn't have a database, but the value can be stored on the initial reserve payment
if preferred.
Docs: https://docs.komoju.com/en/qr/gateway_integration/#capture-payment
*/
const capturePayment = (req, res) => {
  let { paymentId, komojuEndpoint } = req.body;

  if (paymentId == null || paymentId == "") {
    return res
      .status(400)
      .send({ error: "paymentId is missing from request body" });
  }
  if (komojuEndpoint == null || komojuEndpoint == "") {
    komojuEndpoint = "https://komoju.com"
  }

  const body = JSON.stringify({
    type: "payment.captured",
    payment_id: paymentId
  });

  providerSignature = generateNexusProviderSignature(
    "./keys/private.pem",
    body
  );

  axios
    .post(`${komojuEndpoint}/l/callbacks/tim`, body, {
      headers: {
        "Content-Type": "application/json",
        "nexus-provider-signature": providerSignature
      }
    })
    .then(response => console.log("callback response: ", response.status))
    .catch(error => console.log("callback error:", error));

  return res.end();
};

module.exports = capturePayment;
