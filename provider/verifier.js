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

const generateKomojuProviderSignature = (privateKeyFilePath, requestBody) => {
  const privateKey = fs.readFileSync(privateKeyFilePath, { encoding: "utf-8" });
  const sign = crypto.createSign("sha256");
  sign.update(requestBody);
  sign.end();
  const signature = sign.sign(privateKey);

  let base64EncodedSignature = Buffer.from(signature).toString("base64");

  return base64EncodedSignature;
};

module.exports = {
  verifyKomojuSignature,
  generateKomojuProviderSignature
};
