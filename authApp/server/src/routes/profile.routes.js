const profileController = require("../controllers/profile.controller");
const checkRegister = require("../middlewares/checkRegister");
const checkLogin = require("../middlewares/checkLogin");
const authJwt = require("../middlewares/authJwt");

module.exports = (app) => {
  app
    .route("/profile/register")
    .post(
      [
        checkRegister.checkFields,
        checkRegister.checkDuplicateUser,
        checkRegister.checkEmail,
        checkRegister.checkPassword,
      ],
      profileController.register
    );

  app
    .route("/profile/login")
    .post(
      [
        checkLogin.checkEmail,
        checkLogin.checkPasswordSyntax,
        checkLogin.checkUserExistsAndValidPassword,
      ],
      profileController.login
    );

  app.route("/profile/signout").post(profileController.signOut);

  app
    .route("/profile")
    .delete([authJwt.isUserLogged], profileController.testAuth);
};
