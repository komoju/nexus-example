const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post("/", (req, res) => {
  console.log("headers", req.headers);
  console.log("req.body", req.body);
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
