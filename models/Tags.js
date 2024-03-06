const mongoose = require('mongoose');

const TagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
},
    {
        timestamps: true,
    }
);

const TagModel = mongoose.model('Tags', TagSchema);

module.exports = { TagModel };