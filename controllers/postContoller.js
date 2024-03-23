const mongoose = require("mongoose");

const { message } = require("../config/message");
const { postModel } = require("../models/Posts");
const { userModel } = require("../models/Users");
const { messageHandler } = require("../helper/commonHelper");
const { voteCounterPipeline, userLookupPipeline } = require("../helper/pipelineHelper");

// getAll is not needed
const getAll = async (req, res) => {
  try {
    const posts = await postModel.find({});
    return messageHandler(message.FETCH_SUCCESS, "Posts", posts, res);
  } catch (error) {
    return messageHandler(message.SERVER_ERROR, null, error.message, res);
  }
};

// return post, comments
const getPostById = async (req, res) => {
  try {
    let post_id = req.params.id;

    let pipline = [
      {
        $match: {
          _id: new mongoose.Types.ObjectId(post_id),
        },
      },
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "post_id",
          pipeline: [
            {
              $lookup: {
                from: "votes",
                localField: "_id",
                foreignField: "entity_id",
                pipeline: [
                  ...voteCounterPipeline,
                ],
                as: "voteCount",
              },
            },
            {
              $unwind: {
                path: "$voteCount",
                preserveNullAndEmptyArrays: true,
              },
            },
            {
              $project: {
                _id: 1,
                user_id: 1,
                post_id: 1,
                content: 1,
                createdAt: 1,
                updatedAt: 1,
                voteCount: { $ifNull: ["$voteCount.count", 0] },
              },
            },
            ...userLookupPipeline,
          ],
          as: "comments",
        },
      },
      ...userLookupPipeline,
      {
        $lookup: {
          from: "tags",
          localField: "tags",
          foreignField: "_id",
          pipeline: [{ $project: { _id: 1, name: 1 } }],
          as: "tags",
        },
      },
      {
        $lookup: {
          from: "votes",
          localField: "_id",
          foreignField: "entity_id",
          pipeline: [
            ...voteCounterPipeline,
          ],
          as: "postVoteCount",
        },
      },
      {
        $unwind: {
          path: "$postVoteCount",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          voteCount: { $ifNull: ["$postVoteCount.count", 0] },
        },
      },
      {
        $project: {
          __v: 0,
          user_id: 0,
          "user.posts": 0,
          "user.password": 0,
          postVoteCount: 0,
        },
      },
    ];

    const posts = await postModel.aggregate(pipline);

    if (posts.length == 0) {
      return messageHandler(message.NOT_FOUND, "Posts", null, res);
    }

    return messageHandler(message.FETCH_SUCCESS, "Post", posts, res);
  } catch (error) {
    console.log(error);
    return messageHandler(message.SERVER_ERROR, null, error.message, res);
  }
};

const createPost = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const user_id = req.user.id;

    const newPost = await postModel.create({
      user_id,
      title,
      content,
      tags,
    });

    await userModel.findByIdAndUpdate(user_id, { $push: { posts: newPost._id } }, { new: true });

    return messageHandler(message.CREATE_SUCCESS, "Post", newPost, res);
  } catch (error) {
    return messageHandler(message.SERVER_ERROR, null, error.message, res);
  }
};

const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;

    const { title, body, tags } = req.body;

    const updatedPost = await postModel.findByIdAndUpdate(postId, { title, body, tags }, { new: true });

    if (!updatedPost) {
      return messageHandler(message.UPDATE_ERROR, "Post", null, res);
    }
    return messageHandler(message.UPDATE_SUCCESS, "Post", updatedPost, res);
  } catch (error) {
    return messageHandler(message.SERVER_ERROR, null, error.message, res);
  }
};

const deletePost = async (req, res) => {
  try {
    const post_id = req.params.id;
    const user_id = req.user.id;

    const post_data = await postModel.findOneAndDelete({ _id: post_id, user_id });

    if (!post_data) {
      return messageHandler(message.NOT_FOUND, "Post", null, res);
    }

    return messageHandler(message.DELETE_SUCCESS, "Post", null, res);
  } catch (error) {
    return messageHandler(message.SERVER_ERROR, null, error.message, res);
  }
};

module.exports = {
  getAll,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
