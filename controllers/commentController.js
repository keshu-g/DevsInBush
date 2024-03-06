const { messageHandler } = require("../config/helper");
const { message } = require("../config/message");
const { CommentModel } = require("../models/Comments");

// API to get all comments for single post
const getByPostId = async (req, res) => {
  try {
    const comments = await CommentModel.find({ post_id: req.params.post_id });

    return messageHandler(message.FETCH_SUCCESS, "Comments", posts, res);
  } catch (error) {
    return messageHandler(message.SERVER_ERROR, null, error.message, res);
  }
};

const create = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { post_id, content } = req.body;

    const newComment = await CommentModel.create({
      user_id,
      post_id,
      content,
    });

    return messageHandler(message.CREATE_SUCCESS, "Comment", newComment, res);
  } catch (error) {
    return messageHandler(message.SERVER_ERROR, null, error.message, res);
  }
};

const update = async (req, res) => {
  try {
    const comment_id = req.params.id;
    const { post_id, content } = req.body;

    let updatedComment = await CommentModel.findByIdAndUpdate(
      comment_id,
      { content },
      { new: true, user_id: 0 }
    );

    if (!data) {
      return messageHandler(message.UPDATE_ERROR, "Comment", null, res);
    }

    return messageHandler(
      message.UPDATE_SUCCESS,
      "Comment",
      updatedComment,
      res
    );
  } catch (error) {
    return messageHandler(message.SERVER_ERROR, null, error.message, res);
  }
};

module.exports = {
  getByPostId,
  create,
};
