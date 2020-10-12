const router = require("express").Router();
let Post = require("../../db/models/Post");
let User = require("../../db/models/User");

router.get("/posts", async (req, res) => {
  try {
    const allPosts = await Post.find();
    res.status(201).json(allPosts);
  } catch (error) {
    res.status(400).json({ error: error.toSting() });
  }
});

router.post("/api/posts/add", async (req, res) => {
  try {
    const {
      title,
      article,
      dateCreated,
      author,
      images,
      upVotes,
      downVotes,
    } = req.body;

    const newDate = new Date().toISOString();

    const newPost = new Post({
      title,
      article,
      dateCreated: newDate,
      author: req.user.name,
      images,
      upVotes,
      downVotes,
    });

    const savedPost = await newPost.save();

    const user = User.findById(req.user._id);

    // user.author.push(newPost._id);

    // await user.save();

    res.status(201).json(savedPost);
  } catch (error) {
    res.status(401).json({ error: error.toString() });
  }
});

module.exports = router;
