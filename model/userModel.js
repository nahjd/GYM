const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    id: String,
    name: String,
    price: String,
    image: String,
    username: String,
    password: String,
    email: String,
  },
  {
    collection: "nem",
    timestamps: true,
  }
);

const User = mongoose.model("nem", UserSchema);

module.exports = User;
