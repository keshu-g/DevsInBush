const express = require("express");
const keys = require("./config/keys");
const database = require("./config/databse");

const userRoutes = require("./routes/userRoutes");
const mediaRoutes = require("./routes/mediaRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");
const tagRoutes = require("./routes/tagRoutes");
const voteRoutes = require("./routes/voteRoutes");

const app = express();
app.use(express.json());

express.urlencoded({ extended: true });

app.use("/user", userRoutes);
app.use("/media", mediaRoutes);
app.use("/post", postRoutes);
app.use("/comment", commentRoutes);
app.use("/tag", tagRoutes);
app.use('/vote', voteRoutes);

const PORT = keys.PORT;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
