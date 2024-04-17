exports.passwordToMD5Hash = (text) => {
  const crypto = require("crypto");
  const salt = process.env.PASSWORD_SALT;
  return crypto
    .createHash("MD5")
    .update(text + salt)
    .digest("hex")
    .toUpperCase();
};

exports.isEmpty = (data) => {
  return (
    typeof data !== "number" &&
    typeof data !== "boolean" &&
    (!data || data === "undefined" || Object.keys(data).length === 0)
  );
};

exports.getTokenInfo = async (request) => {
  const processJWT = require("./processJWT");
  const authorization = request.header("authorization").split("Bearer ")[1];
  let content = null;
  await processJWT.parseJWT(authorization).then((payload) => {
    content = payload.payload;
  });
  return content;
};
