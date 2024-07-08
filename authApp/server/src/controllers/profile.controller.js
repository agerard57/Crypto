const login = require("./login.controller");
const register = require("./register.controller");
const signOut = require("./signOut.controller");
const testAuth = require("./testAuth.controller");

module.exports = {
  login,
  register,
  signOut,
  testAuth
};
