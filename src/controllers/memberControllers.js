const memberServices = require("../services/memberServices");
exports.getMember = (request, response) => {
    const responseData = memberServices.getMember();
    if (responseData.status) {
        response.json(responseData);
    } else {
        response.status(400).send(responseData.response);
    }
};
