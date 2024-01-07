const { body, param } = require('express-validator');
const { UserModel } = require('../models/User');


const createUserValidation = [
  param('id')
    .optional({ nullable: true })
    .isMongoId().withMessage("Id is not valid"), 

  body('username')
    .notEmpty().withMessage('Username is required')
    .isLength({ min: 3 }).withMessage('Username must be at least 3 characters')
    .isAlphanumeric().withMessage('Username can only contain letters and numbers')
    .custom(async (value, { req }) => {
      // If the id parameter exists, this means we're updating a user
      if (req.params.id) {
        const existingUser = await UserModel.findOne({ username: value });
        
        // If the username is taken and it's not the current user
        if (existingUser && existingUser._id.toString() !== req.params.id) {
          console.log(existingUser._id,req.params.id )
          throw new Error('Username is already in use');
        }
      } else {
        // If the id parameter doesn't exist, this means we're creating a new user
        // In this case, the username must be unique
        const existingUser = await UserModel.findOne({ username: value });
        
        if (existingUser) {
          throw new Error('Username is already in use');
        }
      }
    }),

  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email address')
    .custom(async (value, { req }) => {
      // If the id parameter exists, this means we're updating a user
      if (req.params.id) {
        const existingUser = await UserModel.findOne({ email: value });
        
        // If the email is taken and it's not the current user
        if (existingUser && existingUser._id.toString() !== req.params.id) {
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
