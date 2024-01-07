// models/Comment.js
const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    likes: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        }
    }],
    body: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    created_at: {
        type: Date,
    },
    updated_at: {
        type: Date
    }
},{
    timestamps: true, 
  });

const CommentModel = mongoose.model('Comment', CommentSchema);

module.exports = { CommentModel };
