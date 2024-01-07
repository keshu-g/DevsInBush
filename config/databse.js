const mongoose = require('mongoose');
const keys = require('./keys');

mongoose.connect(keys.MONGO_URI);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Yay Database Connected....');
});

module.exports = mongoose;
