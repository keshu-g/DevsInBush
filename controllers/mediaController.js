const cloudinary = require("../config/media");
const { messageHandler } = require('../config/helper');
const { message } = require('../config/message');
const fs = require('fs');

const uploadController = async (req, res) => {
    if (!req.file) {
        return messageHandler(message.REQUIRED, "File", null, res);
    }
    const fileSizeInBytes = fs.statSync(req.file.path).size;
    const fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
    if (fileSizeInMegabytes > 3) {
        return messageHandler(message.CUSTOM, "File size must be under 3MB", null, res);
    }
    try {
        const result = await cloudinary.uploader.upload(req.file.path, { folder: req.body.folder, tags: req.body.tags });
        return messageHandler(message.CREATE_SUCCESS, "Image", result, res);
    } catch (error) {
        console.log(error);
        return messageHandler(message.SERVER_ERROR, null, error.message, res);
    }
}

module.exports = {
    upload: uploadController
};
