// helper.js
const { validationResult } = require("express-validator");
const { message } = require("./message");
const cloudinary = require("../config/media");

const validationResultHandler = (callback) => {
  return (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // const simplifiedErrors = errors.array().map(e => ({
      //   msg: e.msg,
      //   path: euserdata);th
      // }));

      let msg = errors.errors[0].msg;
      return messageHandler(message.CUSTOM, msg, null, res);
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

const handleUpload = async (file) => {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return res;
};

module.exports = {
  validationResultHandler,
  messageHandler,
  handleUpload,
};
