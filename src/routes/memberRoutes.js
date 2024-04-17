const memberControllers = require("../controllers/memberControllers");

module.exports = (app) => {
  app.route("/member").get(memberControllers.getMember);
  app.route("/member").post(memberControllers.createMember);
  app.route("/member/:id").put(memberControllers.updateMember).delete(memberControllers.deleteMember);
};
