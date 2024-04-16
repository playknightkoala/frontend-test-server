const chartControllers = require("../controllers/chartControllers");

module.exports = (app) => {
  app.route("/chart").get(chartControllers.getChart);
};
