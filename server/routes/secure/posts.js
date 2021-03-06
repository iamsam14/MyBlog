const router = require("express").Router(),
passport = require('../../middleware/authentication/index')
let Post = require("../../db/models/Post");
let User = require("../../db/models/User");

router.get("/api/posts",  
async (req, res) => {
  try {
    const allPosts = await Post.find();
    res.status(201).json(allPosts);
  } catch (error) {
    res.status(401).json({ error: error.toSting() });
  }
});

router.post("/api/posts/add",  
async (req, res) => {
  try {
    const {
      title,
      article,
      dateCreated,
      author,
      authorID
    } = req.body;

    const newDate = new Date().toISOString();

    const newPost = new Post({
      title,
      article,
      dateCreated: newDate,
      author: req.user.name,
      authorID: req.user._id
    });

    await newPost.save();

    const user = await User.findById(req.user._id);

    user.posts.push(newPost._id);

    await user.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(401).json({ error: error.toString() });
  }
});

router.get('/api/post/:id',  
async (req, res) => {
  try {
    const findPost = await Post.findById(req.params.id);
    res.json(findPost);
  } catch (error) {
    res.status(400).json({error: error.toString()});
  }
});

router.post("/search/api/posts/", async (req, res) => {
  const  title  = req.body.title;
  const regex = /title/g
  try {
    const recipeTitle = await Post.find({title: {$regex: title, $options: '<gi>'}});
    res.json(recipeTitle);
  } catch (error) {
    res.status(401).json({error: error.toString()})
  }
})

router.delete('/api/post/delete/:id',  
async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    post.remove();
    res.send(req.post);
  } catch (error) {
    res.status(500).send();
  }
});

router.patch('/api/post/:id',  
async (req, res) => {
  const {id} = req.params;
  const updates = Object.keys(req.body);
  const allowedUpdates = {
    title: true, 
    article: true,
  };

  // const validOperation = updates.every(update => 
  //   allowedUpdates[update];
  // );
  // if(!validOperation) {
  //   return res.status(400).send({error: "invalid update!"})
  // }

  try {
    const post = await Post.findById(req.params.id)
    updates.forEach(update => (post[update] = req.body[update]));
    await post.save();
    res.json(req.post);
  } catch (error) {
    res.status(400).json({error: error.toString()});
  }
});

module.exports = router;
