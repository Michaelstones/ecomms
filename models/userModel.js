const mongoose = require("mongoose");

const UserShema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "name field cannot be empty"],
      trim: true,
    },
    email: {
      type: String,
      require: [true, "field cannot be empty"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      require: [true, "password field cannot be empty"],
    },
    role: { type: Number, default: 0 },
    cart: { type: Array, default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserShema);
