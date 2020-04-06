const express = require("express");
const bodyParser = require("body-parser");

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
