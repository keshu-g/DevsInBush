const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Users",
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tags",
      },
    ],
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const postModel = mongoose.model("Posts", postSchema);

module.exports = { postModel };
