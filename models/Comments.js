// models/Comment.js
const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Users",
    },
    post_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Posts",
    },
    votes: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Users",
        },
      },
    ],
    content: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const CommentModel = mongoose.model("Comments", CommentSchema);

module.exports = { CommentModel };
