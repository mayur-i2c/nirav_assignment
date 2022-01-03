const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    image: {
      type: String
    },
    summary: {
      type: String,
      required: [true, "Summary is required"],
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", usersSchema);
