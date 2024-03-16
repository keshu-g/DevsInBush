const express = require("express");
const database = require("./config/databse");
const keys = require("./config/keys");

const userRoutes = require("./routes/userRoutes");
const mediaRoutes = require("./routes/mediaRoutes");
const postRoutes = require("./routes/postRoutes");
const tagRoutes = require("./routes/tagRoutes");
const commentRoutes = require("./routes/commentRoutes");

const app = express();
app.use(express.json());

express.urlencoded({ extended: true });

app.use("/user", userRoutes);
app.use("/media", mediaRoutes);
app.use("/post", postRoutes);
app.use("/tag", tagRoutes);
app.use("/comment", commentRoutes);
// app.use('/comment', commentRoutes);

const PORT = keys.PORT;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
