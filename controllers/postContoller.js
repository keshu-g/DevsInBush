const { messageHandler } = require("../config/helper");
const { message } = require("../config/message");
const keys = require("../config/keys");
const { PostModel } = require("../models/Posts");
const { UserModel } = require("../models/Users");

// getAll is not needed
const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find({});
    return messageHandler(message.FETCH_SUCCESS, "Posts", posts, res);
  } catch (error) {
    return messageHandler(message.SERVER_ERROR, null, error.message, res);
  }
};

const getById = async (req, res) => {
  try {
    const posts = await PostModel.findById(req.params.id).populate([
      {
        path: "user_id",
        select: "_id username profile_picture",
      },
      {
        path: "tags",
        select: "_id name",
      },
      // {
      //   path: 'likes',
      //   select: '_id username profile_picture'
      // }
    ]);

    let pipline = [
      
    ];

    if (!posts) {
      return messageHandler(message.NOT_FOUND, "Posts", null, res);
    }

    return messageHandler(message.FETCH_SUCCESS, "Posts", posts, res);
  } catch (error) {
    return messageHandler(message.SERVER_ERROR, null, error.message, res);
  }
};

const create = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const user_id = req.user.id;

    const newPost = await PostModel.create({
      user_id,
      title,
      content,
      tags,
    });

    await UserModel.findByIdAndUpdate(
      user_id,
      { $push: { posts: newPost._id } },
      { new: true }
    );

    return messageHandler(message.CREATE_SUCCESS, "Post", newPost, res);
  } catch (error) {
    return messageHandler(message.SERVER_ERROR, null, error.message, res);
  }
};

const update = async (req, res) => {
  try {
    const postId = req.params.id;

    const { title, body, tags } = req.body;

    const updatedPost = await PostModel.findByIdAndUpdate(
      postId,
      { title, body, tags },
      { new: true }
    );

    if (!updatedPost) {
      return messageHandler(message.UPDATE_ERROR, "Post", null, res);
    }
    return messageHandler(message.UPDATE_SUCCESS, "Post", updatedPost, res);
  } catch (error) {
    return messageHandler(message.SERVER_ERROR, null, error.message, res);
  }
};

const deletee = async (req, res) => {
  try {
    const postId = req.params.id;

    const post_data = await PostModel.find({
      _id: postId,
      user_id: req.user.id,
    });

    if (!post_data) {
      return messageHandler(message.NOT_FOUND, "Post", null, res);
    }

    await PostModel.deleteOne({ _id: postId });

    return messageHandler(message.DELETE_SUCCESS, "Post", null, res);
  } catch (error) {
    return messageHandler(message.SERVER_ERROR, null, error.message, res);
  }
};

const likePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.body.userId;

    const updatedPost = await PostModel.findByIdAndUpdate(
      postId,
      { $addToSet: { likes: userId } },
      { new: true }
    );

    if (!updatedPost) {
      return messageHandler(message.UPDATE_ERROR, "Post", null, res);
    }
    return messageHandler(message.UPDATE_SUCCESS, "Post", updatedPost, res);
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
  likePost,
};
