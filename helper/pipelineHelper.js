let voteCounterPipeline = [
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

let userLookupPipeline = [
  {
    $lookup: {
      from: "users",
      localField: "user_id",
      foreignField: "_id",
      pipeline: [{ $project: { _id: 1, username: 1, profile_picture: 1 } }],
      as: "user",
    },
  },
];

module.exports = {
  voteCounterPipeline,
  userLookupPipeline
};
