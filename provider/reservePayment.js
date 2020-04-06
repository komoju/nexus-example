const { v4: uuidv4 } = require("uuid");

const { verifyKomojuSignature } = require("./verifier");

const reservePayment = (req, res) => {
  console.log("headers", req.headers);
  console.log("req.body", req.body);

  const isRequestVerified = verifyKomojuSignature(
    req.headers["komoju-signature"],
    req.body,
    "./keys/pub.pem"
  );

  if (!isRequestVerified) {
    return res.status(401).send(JSON.stringify({ success: false }));
  }

  const { type, mode, payment } = req.body;

  if (type === "payment.create") {
    if (mode === "live") {
      console.log("payment ID:", payment.id);
      console.log("payment amount: ", payment.amount);
      console.log("payment currency", payment.currency);
      console.log("payment description", payment.description);

      // in a real app this section would probably be reserving the payment
      // and returning the ID assigned to the order in the database
      const pretendOrderId = uuidv4();

      res.setHeader("Content-Type", "application/json");
      return res
        .status(200)
        .send(JSON.stringify({ success: true, orderId: pretendOrderId }));
    }
  }

  res.setHeader("Content-Type", "application/json");
  return res.status(400).send(
    JSON.stringify({
      success: false,
      error: { type: "under_maintenance", message: "still being built" }
    })
  );
};

module.exports = reservePayment;
