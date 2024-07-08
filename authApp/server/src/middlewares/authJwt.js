/* eslint-disable consistent-return */
const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwt.config");

const isUserLogged = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }
  jwt.verify(token, jwtConfig.authJwt.key, (err, decrypted) => {
    if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).send({
        message: "Authentication token expired!",
      });
    }
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).send({
        message: "Invalid token!",
      });
    }
    res.locals.user = decrypted;
    next();
  });
};

const authJwt = {
  isUserLogged,
};

module.exports = authJwt;
