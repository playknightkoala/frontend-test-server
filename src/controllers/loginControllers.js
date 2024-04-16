const loginService = require("../services/loginServices");
exports.login = (request, response) => {
  const responseData = loginService.login(request);
  if (responseData.status) {
    response.json(responseData);
  } else {
    response.status(400).send(responseData.response);
  }
};
