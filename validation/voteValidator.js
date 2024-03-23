const { body, param } = require("express-validator");
const { postModel } = require("../models/Posts");
const { userModel } = require("../models/Users");
const { tagModel } = require("../models/Tags");
const { VoteModel } = require("../models/Votes");
const mongoose = require("mongoose");

const voteValidator = [
  body("entity_id")
    .notEmpty()
    .withMessage("entity_id is required")
    .bail()
    .isMongoId()
    .withMessage("Invalid entity id"),

  body("entity_type")
    .notEmpty()
    .withMessage("entity_type is required")
    .bail()
    .isIn(["post", "comment"])
    .withMessage("Invalid entity_type"),

  body("vote_type")
    .notEmpty()
    .withMessage("vote_type is required")
    .bail()
    .isIn(["upvote", "downvote"])
    .withMessage("Invalid vote_type"),
];

module.exports = {
  voteValidator,
};
