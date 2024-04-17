const memberServices = require("../services/memberServices");
exports.getMember = async (request, response) => {
  const responseData = await memberServices.getMember();
  if (responseData.status) {
    response.json(responseData);
  } else {
    response.status(400).send(responseData.response);
  }
};
exports.createMember = async (request, response) => {
  const responseData = await memberServices.createMember(request);
  if (responseData.status) {
    response.json(responseData);
  } else {
    response.status(400).send(responseData.response);
  }
};
exports.updateMember = async (request, response) => {
  const responseData = await memberServices.updateMember(request);
  if (responseData.status) {
    response.json(responseData);
  } else {
    response.status(400).send(responseData.response);
  }
};
exports.deleteMember = async (request, response) => {
  const responseData = await memberServices.deleteMember(request);
  if (responseData.status) {
    response.json(responseData);
  } else {
    response.status(400).send(responseData.response);
  }
};
