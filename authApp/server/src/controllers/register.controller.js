const bcrypt = require("bcryptjs");
const UsersModel = require("../models/users.model");

module.exports = (req, res) => {
  const user = new UsersModel({
    "email": req.body.email,
    password: bcrypt.hashSync(req.body.password),
  });

  user.save((err, _user) => {
    if (err) {
      res.status(500).json({ message: "There's an error" });
      return;
    }
    res.status(200).json({ message: "You are registered!" });
  });
};
