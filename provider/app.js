const express = require("express");
const bodyParser = require("body-parser");

const reservePayment = require("./reservePayment");
const capturePayment = require("./capturePayment");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post("/", (req, res) => {
  reservePayment(req, res);
});

app.post("/capture_payment/:orderId", (req, res) => {
  capturePayment(req, res);
});

// /mobile/landing?session=https://komoju.com/s/p/6l487urgjq4369szt578f07uq
app.get("/mobile/landing", (req, res) => {
  const { session } = req.query;
  const encodedSessionUrl = encodeURIComponent(session);
  const appLink = `komoju-demo://session/${encodedSessionUrl}`;

  console.log("redirecting to deep link:", appLink);
  return res.redirect(appLink);
});

app.listen(port, () =>
  console.log(`Provider is running on http://localhost:${port}`)
);
