const { v4: uuidv4 } = require("uuid");

const { verifyKomojuSignature } = require("./verifier");

/* 
The reservePayment endpoint is responsible for determining whether the user can make
the payment or not. How this is done is entirely up to each system, but if the
payment was successfully reserved then the endpoint must return a 200 OK response, 
with a JSON body with "success": "true" set.
Anything returned in the body of the response will be automatically forwarded to the
client in the payment.payment_details.authorization_response_text JSON object.
Komoju has several error conditions that you can return depending on whether the
scenario matches, otherwise returning a simple 400 response will be sufficient.
Docs: https://docs.komoju.com/en/qr/gateway_integration/#reserve-payment
Error docs: https://docs.komoju.com/en/qr/gateway_integration/#error-response
*/
const reservePayment = (req, res) => {
  const isRequestVerified = verifyKomojuSignature(
    req.headers["komoju-signature"],
    req.body,
    "./keys/komoju-pub.pem"
  );

  if (!isRequestVerified) {
    return res.status(401).send(JSON.stringify({ success: false }));
  }

  // request body structure: https://docs.komoju.com/en/qr/api_reference/#session-object
  const { type, mode, payment } = req.body;

  if (type === "payment.create") {
    if (mode === "live") {
      if (payment.amount > 2000) {
        // for our example app we're going to say that anything greater than
        // 2000 KRW will be too much for our user
        res.setHeader("Content-Type", "application/json");
        return res.status(400).send(
          JSON.stringify({
            success: false,
            error: {
              type: "amount_exceeds_limit",
              message: "User does not have sufficient funds"
            }
          })
        );
      } else {
        // in a real app this section would probably be reserving the payment
        // and returning the ID assigned to the order in the database
        const pretendOrderId = uuidv4();

        res.setHeader("Content-Type", "application/json");
        return res
          .status(200)
          .send(JSON.stringify({ success: true, orderId: pretendOrderId }));
      }
    }
  }

  // if it doesn't match the correct type and it's not in live mode let's just say
  // that the system is under maintenance
  res.setHeader("Content-Type", "application/json");
  return res.status(400).send(
    JSON.stringify({
      success: false,
      error: { type: "under_maintenance", message: "still being built" }
    })
  );
};

module.exports = reservePayment;
