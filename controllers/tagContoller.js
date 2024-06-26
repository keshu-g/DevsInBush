const { messageHandler } = require("../helper/commonHelper");
const { message } = require('../config/message');

const { tagModel } = require('../models/Tags');
const { postModel } = require('../models/Posts');

const getAll = async (req, res) => {
    try {
        const tags = await tagModel.find({})
        return messageHandler(message.FETCH_SUCCESS, "Tags", tags, res);

    } catch (error) {
        return messageHandler(message.SERVER_ERROR, null, error.message, res);
    }
}

// API to get all posts of a tag
const gePostByTagId = async (req, res) => {
    try {
        let tags = await tagModel.findById(req.params.id);

        if (!tags) {
            return messageHandler(message.NOT_FOUND, "Tag", null, res);
        }
        
        let posts = await postModel.find({tags : tags._id},{tags: 0, comments: 0 })
        .populate([{
            path : "user_id",
            select : "username, profile_picture"
        }]);

        tags = tags.toJSON();
        tags.posts = posts

        return messageHandler(message.FETCH_SUCCESS, "Tag", tags, res);
    } catch (error) {
        return messageHandler(message.SERVER_ERROR, null, error.message, res);
    }
}

// only for admins 
const createTags = async (req, res) => {
    try {
        if (req.user.role == 1) {

            const tags = req.body.tags
            const tagDocuments = tags.map(tagName => new tagModel({ name: tagName }));
            const result = await tagModel.insertMany(tagDocuments, { ordered: false, silent: true });

            return messageHandler(message.CREATE_SUCCESS, "Tags", result, res)
        }
        else {
            return messageHandler(message.ACCESS_DENIED, null, null, res);
        }
    } catch (error) {
        return messageHandler(message.SERVER_ERROR, null, error.message, res);
    }
}

module.exports = {
    getAll,
    gePostByTagId,
    createTags
}