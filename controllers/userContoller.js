const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { messageHandler } = require('../config/helper');
const { message } = require('../config/message');
const keys = require('../config/keys');
const { UserModel } = require('../models/User');



const getAll = async (req, res) => {
  try {
    const users = await UserModel.find({});
    return messageHandler(message.FEATCH_SUCCESS, "Users", users, res);

  } catch (error) {
    return messageHandler(message.SERVER_ERROR, null, error.message, res)
  }
};

const getById = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);

    if (!user) {
      return messageHandler(message.NOT_FOUND, "User", null, res);
    }

    return messageHandler(message.FEATCH_SUCCESS, "User", user, res);

  } catch (error) {
    return messageHandler(message.SERVER_ERROR, null, error.message, res)
  }
}

const create = async (req, res) => {
  try {

    const { username, email, password, profile_picture, contact_links } = req.body;

    const hashedPassword = await bcrypt.hash(password, keys.BCRYPT_SALT_ROUNDS);

    const newUser = await UserModel.create({
      username,
      email,
      password: hashedPassword,
      profile_picture,
      contact_links,
    });

    return messageHandler(message.CREATE_SUCCESS, "User", newUser, res)

  } catch (error) {
    return messageHandler(message.SERVER_ERROR, null, error.message, res)
  }
}

const update = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return messageHandler(message.INVALID_STATE, "Id", null, res);
    }

    req.body.password = await bcrypt.hash(req.body.password, keys.BCRYPT_SALT_ROUNDS);

    const updatedUser = await UserModel.findByIdAndUpdate(userId, req.body, { new: true });

    if (!updatedUser) {
      return messageHandler(message.UPDATE_ERROR, "User", null, res);
    }

    return messageHandler(message.UPDATE_SUCCESS, "User", updatedUser, res);

  } catch (error) {
    return messageHandler(message.SERVER_ERROR, null, error.message, res);
  }
};

const deletee = async (req, res) => {
  try {
    const userId = req.params.id;

    const deletedUser = await UserModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      return messageHandler(message.NOT_FOUND, "User", null, res);
    }
    return messageHandler(message.DELETE_SUCCESS, "User", deletedUser, res);
    

  } catch (error) {
    return messageHandler(message.SERVER_ERROR, null, error.message, res);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deletee,
};
