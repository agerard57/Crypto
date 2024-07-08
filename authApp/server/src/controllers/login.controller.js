const schedule = require("node-schedule");
const UsersModel = require("../models/users.model");
const generateJwt = require("../utils/generateJwt");

module.exports = (req, res) => {
  const { rememberMe } = req.body;

  UsersModel.findOne({
    "email": req.body.email,
  })
    .lean()
    .exec((err, user) => {
      if (err) {
        res.status(500).json({ message: err.message });
        return;
      }

      const authToken = generateJwt(user, "auth", rememberMe);
      const refreshToken = generateJwt(user, "refresh", rememberMe);
      const date = new Date();
      const expirationDate = rememberMe
        ? new Date(date.setMonth(date.getMonth() + 1))
        : new Date(date.setDate(date.getDate() + 1));

      // Save the refresh token in the database
      UsersModel.findOneAndUpdate(
        { _id: user._id },
        { $push: { refreshTokens: refreshToken } },
        (err, _user) => {
          if (err) {
            res.status(500).json({ message: err.message });
            return;
          }
          // Schedule the deletion of the refresh token
          schedule.scheduleJob(expirationDate, () => {
            UsersModel.findOneAndUpdate(
              { _id: user._id },
              { $pull: { refreshTokens: refreshToken } },
              (err, _user) => {
                if (err) {
                  console.error(err.message);
                }
              }
            );
          });
          res.status(200).json({
            message: `You are logged as ${user.email}`,
            authToken,
            rememberMe,
          });
        }
      );
    });
};
