const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    username: String,
    password: String,
    email: String,
  },
  {
    collection: "stella",
    timestamps: true,
  }
);

const Model = mongoose.model("stella", UserSchema);

module.exports = Model;
