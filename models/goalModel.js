const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const goalSchema = new Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      required: [true, "A goal must be associated with a user"],
      ref: "User",
    },
    text: {
      type: String,
      required: [true, "Please add a text field."],
    },
  },
  {
    timestamps: true,
  }
);

const Goal = mongoose.model("Goal", goalSchema);

module.exports = Goal;
