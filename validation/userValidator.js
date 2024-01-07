const { body } = require('express-validator');
const { UserModel } = require('../models/User');


const createUserValidation = [
  body('username')
    .notEmpty().withMessage('Username is required')
    .isLength({ min: 3 }).withMessage('Username must be at least 3 characters')
    .isAlphanumeric().withMessage('Username can only contain letters and numbers')
    .custom(async (value) => {
      const user = await UserModel.findOne({ username: value });
      if (user) {
        throw new Error('Username already in use');
      }
    }),

  body('email')
    .notEmpty().withMessage('Email is required') 
    .isEmail().withMessage('Invalid email address')
    .custom(async (value) => {
      const user = await UserModel.findOne({ email: value });
      if (user) {
        throw new Error('Email already in use');
      }
    }),

  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),

  body('profile_picture')
    .optional({ nullable: true })
    .isURL().withMessage('Profile picture must be a valid URL'),

  body('contact_links.*')
    .optional({ nullable: true })
    .isURL().withMessage('Contact links must be valid URLs'),

];

module.exports = {
  createUserValidation,
};
