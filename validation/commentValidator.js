const { body, param } = require("express-validator");
const { postModel } = require("../models/Posts");
const { userModel } = require("../models/Users");
const mongoose = require("mongoose");
const { commentModel } = require("../models/Comments");

const createCommentValidation = [
  param("id")
    .optional({ nullable: true })
    .isMongoId()
    .withMessage("Invalid Id")
    .bail({ level: "request" })
    .custom(async (value, { req }) => {
      let commentData = await commentModel.findOne({
        _id: value,
        user_id: req.user.id,
      });
      if (!commentData) {
        throw new Error("Comment not found");
      }
    }),

  body("post_id")
    .optional({ nullable: true })
    .isMongoId()
    .withMessage("Invalid Post Id")
    .bail()
    .custom(async (value, { req }) => {
      if (req.params.id) {
        throw new Error("Cannot change post_id");
      }
      let data = await postModel.findById(value);
      if (!data) {
        throw new Error("Post not found");
      }
    })
    .bail(),

  body("content")
    .notEmpty()
    .withMessage("content is required")
    .bail()
    .isLength({ min: 1 })
    .withMessage("Comment must be at least 1 character"),
];

const getCommentValidation = [
  param("post_id")
    .notEmpty()
    .withMessage("post_id is required")
    .bail()
    .isMongoId()
    .withMessage("Invalid Post Id")
    .bail()
    .custom(async (value, { req }) => {
      let data = await userModel.findById(value);
      if (!data) {
        throw new Error("Post not found");
      }
    })
    .bail(),
];

module.exports = {
  createCommentValidation,
  getCommentValidation,
};
