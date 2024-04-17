const responseDTO = require("../dto/responseDTO");
const processJWT = require("../units/processJWT");
const unit = require("../units/unit");

const { isEmpty, ipFilter } = unit;

module.exports = async (request, response, next) => {
  if (request.url.slice(0, 7) !== "/eduApi") {
    return next(JSON.stringify(responseDTO.generalResponse(false, "發生嚴重錯誤！")));
  } else {
    request.url = request.url.slice(7, request.url.length);
  }
  if (request.url !== "/login") {
    if (request.header("authorization")) {
      const authorization = request.header("authorization").split("Bearer ")[1];
      let isValid = false;
      await processJWT
        .parseJWT(authorization)
        .then((payload) => {
          const content = payload.payload;
          isValid =
            !isEmpty(content.id) &&
            !isEmpty(content.accountName) &&
            !isEmpty(content.email) &&
            !isEmpty(content.account);
        })
        .catch(() => {
          isValid = false;
        });
      if (isValid) {
        return next();
      }
    }
    return next(JSON.stringify(responseDTO.generalResponse(false, "發生嚴重錯誤！")));
  }
  return next();
};
