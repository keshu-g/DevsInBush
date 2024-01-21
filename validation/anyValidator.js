const { body, param } = require('express-validator');


const IdValidation = [
  param('id')
    .optional({ nullable: true })
    .isMongoId().withMessage("Id is not valid"),
];

const LikeValidation = [
  param('id')
    .optional({ nullable: true })
    .isMongoId().withMessage("Id is not valid"),

  body('userId')
    .notEmpty().withMessage('UserId is required').bail()
    .isMongoId().withMessage("UserId is not valid"),
];
module.exports = {
  IdValidation,
  LikeValidation
};