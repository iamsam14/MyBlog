const router = require("express").Router(),
passport = require('../../middleware/authentication/index')
let Post = require("../../db/models/Post");
let User = require("../../db/models/User");

router.get("/posts",  router.use(
  passport.authenticate('jwt', {
    session: false
  })
),
async (req, res) => {
  try {
    const allPosts = await Post.find();
    res.status(201).json(allPosts);
  } catch (error) {
    res.status(400).json({ error: error.toSting() });
  }
});

router.post("/api/posts/add",  router.use(
  passport.authenticate('jwt', {
    session: false
  })
),
async (req, res) => {
  try {
    const {
      title,
      article,
      dateCreated,
      author
    } = req.body;

    const newDate = new Date().toISOString();

    const newPost = new Post({
      title,
      article,
      dateCreated: newDate,
      author: req.user.name
    });

    const savedPost = await newPost.save();

    const user = User.findById(req.user._id);

    res.status(201).json(savedPost);
  } catch (error) {
    res.status(401).json({ error: error.toString() });
  }
});

router.get('/api/post/:id',  router.use(
  passport.authenticate('jwt', {
    session: false
  })
),
async (req, res) => {
  try {
    const findPost = await Post.findById(req.params.id);
    res.json(findPost);
  } catch (error) {
    res.status(400).json({error: error.toString()});
  }
});

router.delete('/api/post/delete/:id',  router.use(
  passport.authenticate('jwt', {
    session: false
  })
),
async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    post.remove();
    res.send(req.post);
  } catch (error) {
    res.status(500).send();
  }
});

router.patch('/api/post/:id',  router.use(
  passport.authenticate('jwt', {
    session: false
  })
),
async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    'title', 'article'
  ];

  // const validOperation = updates.every(update => 
  //   allowedUpdates.includes(update)
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
