const jwt = require("jsonwebtoken");

const keys = require("../config/keys");
const { UserModel } = require("../models/Users");
const { message } = require("../config/message");
const { messageHandler } = require("../config/helper");

const authMiddleware = async (req, res, next) => {
  try {
    // Extract the token from the Authorization header
    const header = req.headers["authorization"];

    if (!header) {
      return messageHandler(message.ACCESS_DENIED, null, null, res);
    }

    // Verify the token
    try {
      const verified = jwt.verify(header, keys.JWT_SECRET);

      // Find the user in database
      let userData = await UserModel.findById(verified.id);
      if (!userData) {
        return messageHandler(message.INVALID_TOKEN, null, null, res);
      }

      req.user = userData;
      next();
    } catch (error) {
      return messageHandler(message.INVALID_TOKEN, null, null, res);
    }
  } catch (err) {
    return messageHandler(message.SERVER_ERROR, err, null, res);
  }
};

module.exports = authMiddleware;
