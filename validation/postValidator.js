const { body, param } = require('express-validator');
const { PostModel } = require('../models/Posts');
const { UserModel } = require('../models/User');
const mongoose = require('mongoose');
const createPostValidation = [
  param('id')
    .optional({ nullable: true })
    .isMongoId().withMessage("Id is not valid")
    .bail({ level: 'request' })
    .custom(async (value, { req }) => {
      if (!(await PostModel.findById(value))) {
        throw new Error('Post not found');
      }
    }),

  body('userId')
    .optional({ nullable: true })
    .custom(async (value, { req }) => {
      if (req.params.id && value) {
        throw new Error('Cannot change userId')
      }
      else if (value) {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          throw new Error('User ID is not valid');
        }

        let data = await UserModel.findById(value);
        if (!data) {
          throw new Error('User not found');
        }
      }
      else if (!req.params.id && !value) {
        throw new Error('UserId is required');
      }
    }).bail(),

  body('title')
    .notEmpty().withMessage('Title is required')
    .bail()
    .isLength({ min: 1 }).withMessage('Title must be at least 1 character'),

  body('body')
    .notEmpty().withMessage('Body is required')
    .bail()
    .isLength({ min: 20 }).withMessage('Body must be at least 20 character'),
];

module.exports = {
  createPostValidation,
};
