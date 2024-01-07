// helper.js
const { validationResult } = require('express-validator');
const { message } = require('./message');


const validationResultHandler = (callback) => {
  return (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const simplifiedErrors = errors.array().map(e => ({
        msg: e.msg,
        path: e.path
      }));
      return messageHandler(message.CUSTOM, "Invalid Values", simplifiedErrors, res)
    }
    callback(req, res, next);
  };
};

const messageHandler = ([msg, statusCode, status], item, data, res) => {
  const modifiedMsg = item ? msg.replace("Item", item) : msg;
  const response = {
    success: status,
    msg: modifiedMsg,
  };
  if (data) {
    response.data = data;
  }
  res.status(statusCode).json(response);
};

module.exports = {
  validationResultHandler,
  messageHandler,
};
