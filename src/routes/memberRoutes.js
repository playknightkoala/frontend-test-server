const memberControllers = require("../controllers/memberControllers");

module.exports = (app) => {
  app.route("/member").get(memberControllers.getMember);
};
