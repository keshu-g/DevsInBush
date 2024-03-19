const { message } = require("../config/message");
const { postModel } = require("../models/Posts");
const { voteModel } = require("../models/Votes");
const { commentModel } = require("../models/Comments");
const { messageHandler, voteCounter } = require("../config/helper");

const voteManager = async (req, res) => {
  try {
    const { entity_id, entity_type, vote_type } = req.body;
    const user_id = req.user.id;
    let voteCount;

    let entityConnections = {
      post: postModel,
      comment: commentModel,
    };

    let EntityModel = entityConnections[entity_type];

    let entityData = await EntityModel.findById(entity_id);

    if (!entityData) {
      return messageHandler(message.NOT_FOUND, "entity_type", null, res);
    }

    let oldVote = await voteModel.findOneAndDelete({ entity_id, user_id });

    if (oldVote && oldVote.vote_type === vote_type) {
      voteCount = await voteCounter(entity_id);
      return messageHandler(message.DELETE_SUCCESS, "Vote", voteCount, res);
    }

    let newVote = await voteModel.create({
      user_id,
      entity_id,
      entity_type,
      vote_type,
    });

    voteCount = await voteCounter(entity_id);

    return messageHandler(message.CREATE_SUCCESS, "Vote", voteCount, res);
  } catch (error) {
    return messageHandler(message.SERVER_ERROR, null, error.message, res);
  }
};

const getVoteCount = async (req, res) => {
  try {
    let id = req.params.id;

    let voteCount = await voteCounter(id);

    return messageHandler(message.FETCH_SUCCESS, "Votes", voteCount, res);
  } catch (error) {
    return messageHandler(message.SERVER_ERROR, null, error.message, res);
  }
};

module.exports = {
  voteManager,
  getVoteCount,
};
