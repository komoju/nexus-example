const fs = require("fs");
const crypto = require("crypto");

const verifyKomojuSignature = (
  signatureHeader,
  requestBody,
  publicKeyFilePath
) => {
  let publicKey = fs.readFileSync(publicKeyFilePath, { encoding: "utf-8" });

  let verifier = crypto.createVerify("sha256");
  verifier.update(JSON.stringify(requestBody));

  let decodedSignature = Buffer.from(signatureHeader, "base64");

  return verifier.verify(publicKey, decodedSignature);
};

module.exports = {
  verifyKomojuSignature
};
