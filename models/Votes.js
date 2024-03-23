const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Users",
    },
    entity_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    vote_type: {
      type: String,
      enum: ["upvote", "downvote"],
      required: true,
    },
    entity_type: {
      type: String,
      enum: ["post", "comment"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
voteSchema.index({ entity_id: 1 });

const voteModel = mongoose.model("Votes", voteSchema);

module.exports = { voteModel };
