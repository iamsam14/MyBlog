const router = require("express").Router(),
  isAdmin = require("../../middleware/authorization/authorization"),
  passport = require('../../middleware/authentication/index');

  router.get('/api/users/me',   
 async (req, res) => res.json(req.user))

router.patch("/api/users/me", 
async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password"];
  const isValidOperation = updates.every((update) => {
    allowedUpdates.includes(update);
  });
  if (!isValidOperation)
    return res.status(400).send({ error: "invalid update!" });
  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.json(req.user);
  } catch (error) {
    res.status(400).json({ error: error.toString() });
  }
});

router.post("/api/users/logout",  
async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.clearCookie("jwt");
    res.json({ message: "logged out" });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

router.delete("/api/users/me",  
async (req, res) => {
  try {
    await req.user.remove();
    res.clearCookie("jwt");
    res.json({ message: "user deleted" });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

module.exports = router;
