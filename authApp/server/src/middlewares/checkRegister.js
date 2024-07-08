/* eslint-disable consistent-return */
const UsersModel = require("../models/users.model");

const checkFields = (req, res, next) => {
  const fields = [
    "email",
    "password",
  ];
  // eslint-disable-next-line no-restricted-syntax
  for (const field of fields) {
    if (req.body[field] === "") {
      return res.status(400).json({ message: `${field} is empty` });
    }
  }
  next();
};

const checkDuplicateUser = (req, res, next) => {
  const { email } = req.body;
  UsersModel.findOne({
    "email": email,
  }).exec((err, user) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    if (user) {
      return res
        .status(409)
        .json({ message: "User already exists" });
    }
    next();
  });
};

const checkEmail = (req, res, next) => {
  const { email } = req.body;
  if (!email.includes("@")) {
    return res.status(400).json({ message: "Email is invalid" });
  }
  next();
};

const checkPassword = (req, res, next) => {
  const pwd = req.body.password;
  /* Basically test if (!/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,128}$/.test(pwd)) */

  // Test if password is between 8 and 128 characters long
  if (pwd.length < 8 || pwd.length > 128) {
    return res.status(400).json({ message: "Password must be between 8 and 128 characters" });
  }
  // Test if password contains at least one digit
  if (!pwd.match(/\d/)) {
    return res.status(400).json({ message: "Password must contain at least one digit" });
  }
  // Test if password contains at least one lowercase or uppercase letter
  if (!pwd.match(/(?=.*[a-z])(?=.*[A-Z])/)) {
    return res.status(400).json({
      message: "Password must contain at least one lowercase or uppercase letter",
    });
  }
  // Test if password contains at least one special character
  if (!pwd.match(/[!@#$%^&*]/)) {
    return res.status(400).json({
      message: "Password must contain at least one special character",
    });
  }
  next();
};

const checkRegister = {
  checkFields,
  checkDuplicateUser,
  checkEmail,
  checkPassword,
};

module.exports = checkRegister;
