const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema(
  {
    email: {
      type: "String",
      required: true,
    },
    password: {
      type: "String",
      required: true,
    },
    refreshTokens: {
      type: [String],
      default: undefined,
      required: false,
    },
  },
  { collection: "Users" }
);

userSchema.plugin(uniqueValidator);

const UsersModel = mongoose.model("Users", userSchema);

module.exports = UsersModel;
