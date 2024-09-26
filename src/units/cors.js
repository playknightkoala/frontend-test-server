exports.createCors = () => {
  const cors = require("cors");
  const whitelist = JSON.parse(process.env.ALLOW_HREF_LIST) || [];
  return cors((request, callback) => {
    const origin = request.header("Origin") || request.header("host");
    if (
      origin &&
      (whitelist.indexOf(origin) !== -1 || origin.indexOf("localhost") >= 0 || origin.indexOf("127.0.0.1") >= 0)
    ) {
      callback(null, true);
    } else {
      // eslint-disable-next-line n/no-callback-literal
      callback("Not allowed by CORS");
    }
  });
};
