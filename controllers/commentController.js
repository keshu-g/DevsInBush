const { messageHandler } = require("../config/helper");
const { message } = require("../config/message");
const { commentModel } = require("../models/Comments");

// API to get all comments for single post
// const getByPostId = async (req, res) => {
//   try {
//     const comments = await commentModel.find({ post_id: req.params.post_id });

//     return messageHandler(message.FETCH_SUCCESS, "Comments", posts, res);
//   } catch (error) {
//     return messageHandler(message.SERVER_ERROR, null, error.message, res);
//   }
// };

const createComment = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { post_id, content } = req.body;

    const newComment = await commentModel.create({
      user_id,
      post_id,
      content,
    });

    return messageHandler(message.CREATE_SUCCESS, "Comment", newComment, res);
  } catch (error) {
    return messageHandler(message.SERVER_ERROR, null, error.message, res);
  }
};

const updateComment = async (req, res) => {
  try {
    const comment_id = req.params.id;
    const { content } = req.body;

    let commentData = await commentModel.findByIdAndUpdate(comment_id, { content });

    if (!commentData) {
      return messageHandler(message.UPDATE_ERROR, "Comment", null, res);
    }

    return messageHandler(message.UPDATE_SUCCESS, "Comment", null, res);
  } catch (error) {
    return messageHandler(message.SERVER_ERROR, null, error.message, res);
  }
};

const deleteComment = async (req, res) => {
  try {
    const comment_id = req.params.id;

    const comment_data = await commentModel.findOneAndDelete({
      _id: comment_id,
      user_id: req.user.id,
    });

    if (!comment_data) {
      return messageHandler(message.NOT_FOUND, "Comment", null, res);
    }
    
    return messageHandler(message.DELETE_SUCCESS, "Comment", null, res);
  } catch (error) {
    return messageHandler(message.SERVER_ERROR, null, error.message, res);
  }
};

module.exports = {
  createComment,
  updateComment,
  deleteComment,
};
