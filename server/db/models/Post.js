const mongoose = require("mongoose");
const moment = require("moment");
const User = require("./User");

const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: { type: String, required: true },
  article: { type: String, required: true, trim: true },
  dateCreated: { type: Date, default: Date.now },
  author: {
    type: mongoose.Schema.Types.String,
    ref: "User",
  },
  authorID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}
);

postSchema.virtual('users', {
  ref: User,
  localField: 'author',
  foreignField: 'name'
});

postSchema.virtual('users', {
  ref: User,
  localField: '_id',
  foreignField: 'posts'
});

postSchema.methods.toJSON = function () {
  const post = this;
  const postObject = post.toObject();
  if (postObject.dateCreated) {
    postObject.dateCreated = moment(postObject.dateCreated).format(
      "YYYY-MM-DD"
    );
  }
  return postObject;
};

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
