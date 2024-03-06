const { body, param } = require('express-validator');
const { UserModel } = require('../models/Users');
const cloudinary = require('../config/media');
const fs = require('fs');

const createUserValidation = [
  body('username')
    .notEmpty().withMessage('Username is required').bail()
    .isLength({ min: 3 }).withMessage('Username must be at least 3 characters').bail()
    .isAlphanumeric().withMessage('Username can only contain letters and numbers').bail()
    .custom(async (value, { req }) => {
      // If the user parameter exists, this means we're updating a user
      if (req.user) {
        if ((await UserModel.findOne({ username: value, _id: { $ne: req.user.id } }))) {
          throw new Error('Username is already in use');
        }
      } else {
        // If the user parameter doesn't exist, this means we're creating a new user
        // In this case, the username must be unique
        const existingUser = await UserModel.findOne({ username: value });

        if (existingUser) {
          throw new Error('Username is already in use');
        }
      }
    }),

  body('email')
    .notEmpty().withMessage('Email is required').bail()
    .isEmail().withMessage('Invalid email address').bail()
    .custom(async (value, { req }) => {
      // If the user parameter exists, this means we're updating a user
      if (req.user) {
        if ((await UserModel.findOne({ email: value, _id: { $ne: req.user.id } }))) {
          throw new Error('Email is already in use');
        }
      } else {
        // If the id parameter doesn't exist, this means we're creating a new user
        // In this case, the email must be unique
        const existingUser = await UserModel.findOne({ email: value });

        if (existingUser) {
          throw new Error('Email is already in use');
        }
      }
    }),

  body('password')
    .notEmpty().withMessage('Password is required').bail()
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),

  body('profile_picture')
    .optional({ nullable: true })
    .custom(async (value, { req }) => {
      const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
      if (value && !urlRegex.test(value)) {
        throw new Error('Profile picture must be a valid URL');
      }
      return true;
    })
    .customSanitizer(async (value, { req }) => {
      if (!value) {
        const filePath = "./config/defaultAvatars.json";
        const jsonData = fs.readFileSync(filePath, 'utf8');
        const resources = JSON.parse(jsonData);
        const randomIndex = Math.floor(Math.random() * resources.length);
        const randomImage = resources[randomIndex];
        const randomImageUrl = randomImage.secure_url;
        return randomImageUrl;
      }
      return value;
    }),

  body('bio')
    .optional({ nullable: true })
    .isString().withMessage('Bio must be a string'),
];

const loginValidator = [
  body('email')
    .notEmpty().withMessage('Email is required').bail(),
  
  body('password')
    .notEmpty().withMessage('Password is required').bail()
]

module.exports = {
  createUserValidation,
  loginValidator,
};
