const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");

const { verifyKomojuSignature } = require("./verifier");

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post("/", (req, res) => {
  console.log("headers", req.headers);
  console.log("req.body", req.body);

  const isRequestVerified = verifyKomojuSignature(
    req.headers["komoju-signature"],
    req.body,
    "./keys/pub.pem"
  );

  // if the verifier is false then return a 401 Unauthorized, otherwise, continue on
  if (!isRequestVerified) {
    // figure out what the expected error return value should be
    res.status(401).send(JSON.stringify({ success: false }));
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
      res
        .status(200)
        .send(JSON.stringify({ success: true, orderId: pretendOrderId }));
    }
  }

  res.setHeader("Content-Type", "application/json");
  res.status(400).send(
    JSON.stringify({
      success: false,
      error: { type: "under_maintenance", message: "still being built" }
    })
  );
});

app.listen(port, () =>
  console.log(`Provider is running on http://localhost:${port}`)
);
