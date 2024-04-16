const chartServices = require("../services/chartServices");
exports.getChart = (request, response) => {
    const responseData = chartServices.getChart();
    if (responseData.status) {
        response.json(responseData);
    } else {
        response.status(400).send(responseData.response);
    }
};
