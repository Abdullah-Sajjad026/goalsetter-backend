const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A name is required for a user."],
    },
    email: {
      type: String,
      required: [true, "An email is required for a user."],
    },
    password: {
      type: String,
      required: [true, "A password is required for a user's security."],
    },
  },
  {timeStamps: true}
);

const User = mongoose.model("User", userSchema);

module.exports = User;
