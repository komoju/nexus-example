const axios = require("axios");

const { generateKomojuProviderSignature } = require("./verifier");

const capturePayment = (req, res) => {
  const { orderId } = req.params;
  const { paymentId } = req.body;
  console.log("orderId", orderId);
  console.log("paymentId", paymentId);

  if (paymentId == null || paymentId == "") {
    return res
      .status(400)
      .send({ error: "paymentId is missing from request body" });
  }

  const body = JSON.stringify({
    type: "payment.captured",
    payment_id: paymentId
  });

  providerSignature = generateKomojuProviderSignature(
    "./keys/private.pem",
    body
  );

  axios
    .post("https://komoju.com/l/callbacks/tim", body, {
      headers: {
        "Content-Type": "application/json",
        "komoju-provider-signature": providerSignature
      }
    })
    .then(response => console.log("callback response: ", response.status))
    .catch(error => console.log("callback error:", error));

  //  basic regex check for UUID structure
  // return 200 OK or 400 bad request

  return res.end();
};

module.exports = capturePayment;
