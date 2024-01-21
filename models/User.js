// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        profile_picture: {
            type: String
        },
        bio: {
            type: String,
        },
        role: {
            type: Number,
            default: 1,
        },
        status: {
            type: Boolean,
            default: true
        },
    },
    {
        timestamps: true,
    }
);

const UserModel = mongoose.model('Users', UserSchema);

module.exports = { UserModel };
