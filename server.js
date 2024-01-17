const express = require('express');
const database = require('./config/databse');
const keys = require('./config/keys');

const userRoutes = require('./routes/userRoutes');
// const postRoutes = require('./routes/postRoutes');
// const commentRoutes = require('./routes/commentRoutes');
const app = express();
app.use(express.json());
express.urlencoded({ extended: true }) 

// Use the routes
app.use('/user', userRoutes);
// app.use('/post', postRoutes);
// app.use('/comment', commentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`http://localhost:${keys.PORT}`);
});

