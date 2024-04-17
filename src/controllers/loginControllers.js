const loginService = require("../services/loginServices");
exports.login = async (request, response) => {
  const responseData = await loginService.login(request);
  if (responseData.status) {
    response.json(responseData);
  } else {
    response.status(400).send(responseData.response);
  }
};
