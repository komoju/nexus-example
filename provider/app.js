const express = require("express");
const bodyParser = require("body-parser");

const reservePayment = require("./reservePayment");

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post("/", (req, res) => {
  reservePayment(req, res);
});

app.listen(port, () =>
  console.log(`Provider is running on http://localhost:${port}`)
);
