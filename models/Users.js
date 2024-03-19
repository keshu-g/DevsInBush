const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    profile_picture: {
      type: String,
    },
    type: String,
    bio: {},
    role: {
      type: Number,
      default: 1,
    },
    status: {
      type: Boolean,
      default: true,
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Posts",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("Users", userSchema);

module.exports = { userModel };
