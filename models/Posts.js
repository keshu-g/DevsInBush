const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
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
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        }
    }],
    contact_status: {
        type: Boolean,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    created_at: {
        type: Date
    },
    updated_at: {
        type: Date
    }
},
    {
        timestamps: true, 
    }
);

const PostModel = mongoose.model('post', PostSchema);

module.exports = { PostModel };