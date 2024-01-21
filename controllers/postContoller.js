const { messageHandler } = require('../config/helper');
const { message } = require('../config/message');
const keys = require('../config/keys');
const { PostModel } = require('../models/Posts');
const { post } = require('../routes/userRoutes');

const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find({});
    return messageHandler(message.FEATCH_SUCCESS, "Posts", posts, res);

  } catch (error) {
    return messageHandler(message.SERVER_ERROR, null, error.message, res)
  }
};

const getById = async (req, res) => {
  try {
    const posts = await PostModel.findById(req.params.id).populate([
      {
        path: 'userId',
        select: '_id username profile_picture'
      },
      {
        path: 'likes',
        select: '_id username profile_picture'
      }
    ]);


    if (!posts) {
      return messageHandler(message.NOT_FOUND, "Posts", null, res);
    }

    return messageHandler(message.FEATCH_SUCCESS, "Posts", posts, res);

  } catch (error) {
    return messageHandler(message.SERVER_ERROR, null, error.message, res)
  }
};

const create = async (req, res) => {
  try {

    const { userId, title, body } = req.body;

    const newPost = await PostModel.create({
      userId,
      title,
      body
    });

    return messageHandler(message.CREATE_SUCCESS, "Post", newPost, res)

  } catch (error) {
    return messageHandler(message.SERVER_ERROR, null, error.message, res)
  }
};

const update = async (req, res) => {
  try {
    const postId = req.params.id;

    const { title, body } = req.body;

    const updatedPost = await PostModel.findByIdAndUpdate(postId, { title, body }, { new: true });

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

    const deletedPost = await PostModel.findByIdAndDelete(postId);

    if (!deletedPost) {
      return messageHandler(message.NOT_FOUND, "Post", null, res);
    }
    return messageHandler(message.DELETE_SUCCESS, "Post", deletedPost, res);

  } catch (error) {
    return messageHandler(message.SERVER_ERROR, null, error.message, res);
  }
};

const likePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.body.userId;

    const updatedPost = await PostModel.findByIdAndUpdate(postId, { $addToSet: { likes: userId } }, { new: true });

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
