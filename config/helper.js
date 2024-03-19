const mongoose = require("mongoose");

const { message } = require("./message");
const cloudinary = require("../config/media");
const { voteModel } = require("../models/Votes");
const { validationResult } = require("express-validator");

const validationResultHandler = (callback) => {
  return (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // const simplifiedErrors = errors.array().map(e => ({
      //   msg: e.msg,
      //   path: euserdata);
      // }));

      let msg = errors.errors[0].msg;
      return messageHandler(message.CUSTOM, msg, null, res);
    }
    callback(req, res, next);
  };
};

const messageHandler = ([msg, statusCode, status], item, data, res) => {
  const modifiedMsg = item ? msg.replace("Item", item) : msg;
  const response = {
    success: status,
    msg: modifiedMsg,
  };
  if (data) {
    response.data = data;
  }
  res.status(statusCode).json(response);
};

const handleUpload = async (file) => {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return res;
};

const voteCounterPipeline = (id) => {
  let pipleine = [
    { $match: { entity_id: new mongoose.Types.ObjectId(id) } },
    {
      $group: {
        _id: null,
        count: {
          $sum: {
            $cond: [
              { $eq: ["$vote_type", "upvote"] },
              1,
              {
                $cond: [{ $eq: ["$vote_type", "downvote"] }, -1, 0],
              },
            ],
          },
        },
      },
    },
  ];
  return pipleine;
};
const voteCounter = async (entity_id) => {
  let voteCounts = await voteModel.aggregate(voteCounterPipeline(entity_id));

  if (voteCounts.length === 0) {
    return { count: 0 };
  }
  let { count } = voteCounts[0];

  return { count };
};

module.exports = {
  validationResultHandler,
  messageHandler,
  handleUpload,
  voteCounter,
  voteCounterPipeline
};
