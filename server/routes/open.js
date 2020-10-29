const router = require("express").Router();
let User = require("../db/models/User");

router.get("/api/users", async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(201).json(allUsers);
  } catch (error) {
    res.status(400).json({ error: error.toString() });
  }
});

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
    console.log(newUser)

    const token = await newUser.generateAuthToken();
    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "Strict",
      secure: process.env.NODE_ENV !== "production" ? false : true,
    });

    res.status(201).json("User added");
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
    res.status(400).json({ error: error.toString() });
  }
});

module.exports = router;
