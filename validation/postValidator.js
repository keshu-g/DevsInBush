const { body, param } = require('express-validator');
const { PostModel } = require('../models/Posts');
const { UserModel } = require('../models/Users');
const { TagModel } = require('../models/Tags');
const mongoose = require('mongoose');

const createPostValidation = [
  param('id')
    .optional({ nullable: true })
    .isMongoId().withMessage("Invalid Post Id")
    .bail({ level: 'request' })
    .custom(async (value, { req }) => {
      let data = await PostModel.find({ _id: value, user_id: req.user.id, status: 1 })
      if (data.length == 0) {
        throw new Error('Post not found');
      }
    }),

  // body('user_id')
  //   .optional({ nullable: true })
  //   .custom(async (value, { req }) => {
  //     if (req.params.id && value) {
  //       throw new Error('Cannot change userId')
  //     }
  //     else if (value) {
  //       if (!mongoose.Types.ObjectId.isValid(value)) {
  //         throw new Error('User ID is not valid');
  //       }

  //       let data = await UserModel.findById(value);
  //       if (!data) {
  //         throw new Error('User not found');
  //       }
  //     }
  //     else if (!req.params.id && !value) {
  //       throw new Error('UserId is required');
  //     }
  //   }).bail(),

  body('title')
    .notEmpty().withMessage('Title is required')
    .bail()
    .isLength({ min: 1 }).withMessage('Title must be at least 1 character'),

  body('content')
    .notEmpty().withMessage('Content is required')
    .bail()
    .isLength({ min: 20 }).withMessage('Content must be at least 20 character'),

  body('tags')
    .optional({ nullable: true })
    .isArray({ max: 10 }).withMessage('Max 10 Tags Allowed').bail()
    .custom(async (value) => {
      if (!value.every(item => mongoose.Types.ObjectId.isValid(item))) {
        throw new Error('Invalid Tag Id');
      }
      const existingTags = await TagModel.find({ _id: { $in: value } });
      if (existingTags.length != value.length) {
        throw new Error("Tag not found");
      }
    }),
];

module.exports = {
  createPostValidation,
};
