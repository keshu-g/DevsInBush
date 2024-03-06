const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const keys = require('../config/keys');
const { message } = require('../config/message');
const { UserModel } = require('../models/Users');
const { messageHandler } = require('../config/helper');


const getAll = async (req, res) => {
  try {
    const users = await UserModel.find({});
    return messageHandler(message.FETCH_SUCCESS, "Users", users, res);

  } catch (error) {
    return messageHandler(message.SERVER_ERROR, null, error.message, res)
  }
};

const getById = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id, { password: 0, role : 0, __v: 0, })
      .populate([{
        path: 'posts',
        select: '_id title content createdAt',
      }])
      .exec();

    if (!user) {
      return messageHandler(message.NOT_FOUND, "User", null, res);
    }

    return messageHandler(message.FETCH_SUCCESS, "User", user, res);

  } catch (error) {
    return messageHandler(message.SERVER_ERROR, null, error.message, res)
  }
};

const create = async (req, res) => {
  try {

    const { username, email, password, profile_picture, bio } = req.body;

    const hashedPassword = await bcrypt.hash(password, keys.BCRYPT_SALT_ROUNDS);

    const newUser = await UserModel.create({
      username,
      email,
      password: hashedPassword,
      profile_picture,
      bio,
    });


    return messageHandler(message.CREATE_SUCCESS, "User", newUser, res)

  } catch (error) {
    return messageHandler(message.SERVER_ERROR, null, error.message, res)
  }
};

const update = async (req, res) => {
  try {
    const userId = req.user.id;

    req.body.password = await bcrypt.hash(req.body.password, keys.BCRYPT_SALT_ROUNDS);

    const { username, password, email, bio, profile_picture } = req.body;

    const updatedUser = await UserModel.findByIdAndUpdate(userId, { username, password, email, bio, profile_picture }, { new: true });

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
    const userId = req.user.id;

    const deletedUser = await UserModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      return messageHandler(message.NOT_FOUND, "User", null, res);
    }
    return messageHandler(message.DELETE_SUCCESS, "User", deletedUser, res);

  } catch (error) {
    return messageHandler(message.SERVER_ERROR, null, error.message, res);
  }
};

const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const profile = await UserModel.findById(userId, { password: 0, role: 0 })
      .populate([{
        path: 'posts',
        select: 'title content createdAt',
      }])
      .exec();

    if (!profile) {
      messageHandler(message.NOT_FOUND, "User", null, res);
    }

    return messageHandler(message.FETCH_SUCCESS, "User", profile, res);

  } catch (error) {
    console.log(error);
    messageHandler(message.SERVER_ERROR, null, error.message, res);
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userData = await UserModel.findOne({ email: email });

    if (!userData) {
      return messageHandler(message.INVALID_LOGIN, null, null, res);
    }

    const isMatch = await bcrypt.compare(password, userData.password);

    if (!isMatch) {
      return messageHandler(message.INVALID_LOGIN, null, null, res);
    }

    const token = jwt.sign({ id: userData._id }, keys.JWT_SECRET, { expiresIn: 259200 }) // 3 days

    let data = {
      token
    }

    return messageHandler(message.LOGIN_SUCCESS, null, data, res);

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
  getProfile,
  login,
};
