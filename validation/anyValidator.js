const { body, param } = require('express-validator');


const IdValidation = [
    param('id')
      .optional({ nullable: true })
      .isMongoId().withMessage("Id is not valid"),
];

module.exports = {
    IdValidation,
  };