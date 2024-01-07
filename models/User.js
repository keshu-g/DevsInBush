// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        profile_picture: {
            type: String
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true 
        },
        contact_links: {
            type: Map,
            of: String,
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

const UserModel = mongoose.model('users', UserSchema);

module.exports = { UserModel };
