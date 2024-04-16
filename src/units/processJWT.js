const jwt = require("jsonwebtoken");
const moment = require("moment");
const secretKey = "ELAND_FRONTEND";

exports.generalJWT = (payload) => {
  return jwt.sign({ payload, exp: moment().endOf("days").unix() }, secretKey);
};

exports.parseJWT = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (error, payload) => {
      if (error) {
        reject(error);
      } else {
        resolve(payload);
      }
    });
  });
};
