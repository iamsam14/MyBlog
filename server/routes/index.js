const router = require("express").Router(),
jwt = require('jsonwebtoken');
let User = require("../db/models/User"),
Post = require('../db/models/Post');

router.post("/api/users", async (req, res) => {
  const { name, email, password } = req.body;
  let user = await User.findOne({ email });
  if (user) {
    throw new Error("Use a different email!");
  }
  try {
    const newUser = new User({
      name,
      email,
      password,
    });
    // await newUser.save();
    const token = await newUser.generateAuthToken();

    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "Strict",
      secure: process.env.NODE_ENV !== "production" ? false : true,
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.toString() });
  }
});

router.post("/api/users/login", async (req, res) => {
  const { email, password } = req.body;
  try {

    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();

    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "production" ? false : true,
    });
    res.json(user);
  } catch (error) {
    res.status(401).json({ error: error.toString() });
  }
});

module.exports = router;
