require("./db/config");
if (process.env.NODE_ENV !== "production") require("dotenv").config();
const express = require("express"),
  mongoose = require("mongoose"),
  app = express(),
  cors = require("cors"),
  bodyParser = require("body-parser"),
  passport = require("./middleware/authentication");

app.use(cors());
app.use(bodyParser.json());

app.use(express.json());
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

const openRouter = require("./routes/open"),
  postRouter = require("./routes/secure/posts"),
  userRouter = require("./routes/secure/users");
cookieParser = require("cookie-parser");

app.use("/", openRouter);
app.use(cookieParser());
app.use(
  passport.authenticate("jwt", {
    session: false,
  })
);
app.use("/", postRouter);
app.use("/users", userRouter);

if (process.env.NODE_ENV === "production") {
  // Handle React routing, return all requests to React app
  app.get("*", (request, response) => {
    response.sendFile(path.join(__dirname, "../client/build", "index.html"));
  });
}

module.exports = app;
