// config/keys.js
require('dotenv').config();

module.exports = {
  MONGO_URI : process.env.MONGO_URI,
  PORT : process.env.PORT,
  BCRYPT_SALT_ROUNDS : 10
};
