const loginControllers = require("../controllers/loginControllers");

module.exports = (app) => {
    app.route("/login").post(loginControllers.login);
};
