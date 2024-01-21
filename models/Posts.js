const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Users',
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
    }],
    status: {
        type: Boolean,
        default: true
    },
},
    {
        timestamps: true,
    }
);

const PostModel = mongoose.model('Posts', PostSchema);

module.exports = { PostModel };