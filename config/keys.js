// config/keys.js
require('dotenv').config();

module.exports = {
  MONGO_URI : process.env.MONGO_URI,
  CLOUDINARY_CLOUD_NAME : process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY : process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET : process.env.CLOUDINARY_API_SECRET,
  PORT : process.env.PORT,
  BCRYPT_SALT_ROUNDS : 10
};
