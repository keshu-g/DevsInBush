const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const keys = require("../config/keys");
const { message } = require("../config/message");
const { UserModel } = require("../models/Users");
const { messageHandler } = require("../config/helper");

// This API is not needed
const getAll = async (req, res) => {
  try {
    const users = await UserModel.find({});
    return messageHandler(message.FETCH_SUCCESS, "Users", users, res);
  } catch (error) {
    return messageHandler(message.SERVER_ERROR, null, error.message, res);
  }
};

// getById is for getting other users profile
const getById = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id, {
      password: 0,
      role: 0,
      __v: 0,
    })
      .populate([
        {
          path: "posts",
          select: "_id title content createdAt",
        },
      ])
      .exec();

    if (!user) {
      return messageHandler(message.NOT_FOUND, "User", null, res);
    }

    return messageHandler(message.FETCH_SUCCESS, "User", user, res);
  } catch (error) {
    return messageHandler(message.SERVER_ERROR, null, error.message, res);
  }
};

const createUser = async (req, res) => {
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

    return messageHandler(message.CREATE_SUCCESS, "User", newUser, res);
  } catch (error) {
    return messageHandler(message.SERVER_ERROR, null, error.message, res);
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const { username, email, bio, profile_picture } = req.body;

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { username, email, bio, profile_picture },
      { new: true, select: "-password" }
    );

    if (!updatedUser) {
      return messageHandler(message.UPDATE_ERROR, "User", null, res);
    }

    return messageHandler(message.UPDATE_SUCCESS, "User", null, res);
  } catch (error) {
    return messageHandler(message.SERVER_ERROR, null, error.message, res);
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const deletedUser = await UserModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      return messageHandler(message.NOT_FOUND, "User", null, res);
    }
    return messageHandler(message.DELETE_SUCCESS, "User", null, res);
  } catch (error) {
    return messageHandler(message.SERVER_ERROR, null, error.message, res);
  }
};

// Returns profile details and all posts of the user
const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const profile = await UserModel.findById(userId, { password: 0, role: 0 })
      .populate([
        {
          path: "posts",
          select: "title content createdAt",
        },
      ])
      .exec();

    if (!profile) {
      messageHandler(message.NOT_FOUND, "User", null, res);
    }

    return messageHandler(message.FETCH_SUCCESS, "User", profile, res);
  } catch (error) {
    console.log(error);
    messageHandler(message.SERVER_ERROR, null, error.message, res);
  }
};

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

    const token = jwt.sign({ id: userData._id }, keys.JWT_SECRET, { expiresIn: 999200 }); // 3 days = 259200

    let data = { token };

    return messageHandler(message.LOGIN_SUCCESS, null, data, res);
  } catch (error) {
    return messageHandler(message.SERVER_ERROR, null, error.message, res);
  }
};

module.exports = {
  getAll,
  getById,
  createUser,
  updateUser,
  deleteUser,
  getUserProfile,
  login,
};
