const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    username: String,
    password: String,
    email: String,
  },
  {
    collection: "login",
    timestamps: true,
  }
);

const Model = mongoose.model("login", UserSchema);

module.exports = Model;
