const express = require("express");
const bodyParser = require("body-parser");

const reservePayment = require("./reservePayment");
const capturePayment = require("./capturePayment");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

/*
This is the endpoint that Komoju talks to when the client has sent the process
payment request. This endpoint is configured in the Komoju dashboard.
*/
app.post("/", (req, res) => {
  reservePayment(req, res);
});

/* 
This is the endpoint that the client communicates with directly, after the payment
has been successfully reserved.
*/
app.post("/capture_payment/:orderId", (req, res) => {
  capturePayment(req, res);
});

/*
This is the mobile landing endpoint. When the user clicks on the provider name at
checkout they will be redirected here, with the process payment URL supplied as the
session query string. This method is responsible for redirecting the mobile device
to the client app. In this example we're encoding the session URL and attaching it
to deep link, so the client app will be able to read the URL and make a request to
process the payment.
Example URL: /mobile/landing?nexus_link=https://komoju.com/s/p/6l487urgjq4369szt578f07uq
 */
app.get("/mobile/landing", (req, res) => {
  const { nexus_link } = req.query;
  const encodedNexusLink = encodeURIComponent(nexus_link);
  const appLink = `komoju-demo://nexus_link/${encodedNexusLink}`;

  console.log("redirecting to deep link:", appLink);
  return res.redirect(appLink);
});

app.listen(port, () =>
  console.log(`Provider is running on http://localhost:${port}`)
);
