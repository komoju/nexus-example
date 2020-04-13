const fs = require("fs");
const crypto = require("crypto");

/*
Every request that comes from Komoju will have a komoju-signature Header that is a
HMAC signature, to ensure that the request is truly coming from Komoju. This
signature is the body of the request encrypted with SHA-256 and then base64 encoded,
so to verify the signature, you will need to base64 decode it, and decrypt using
Komoju's public key and compare it against the request body. Since these requests are
coming from Komoju they all use it's public key, regardless of which provider it is.
*/
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

/*
All requests made to Komoju need to have the request body signed and added to the
request as the komoju-signature header. For the request to be successfully accepted
the komoju-signature will need to match the body of the request, encrypted using the
private key that matches the public key supplied to Komoju for the provider and
base64 encoded.
*/
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
