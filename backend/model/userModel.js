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
    description: String,
    rate: String,
    favourite: String,
  },
  {
    collection: "nem",
    timestamps: true,
  }
);

const Model = mongoose.model("nem", UserSchema);

module.exports = Model;
