const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Post = require('../../db/models/Post');
const User = require('../../db/models/User');
require('dotenv').config();

afterAll(async () => {
    await mongoose.connection.close();
});

const userOneId = new mongoose.Types.ObjectId;
const userTwoId = new mongoose.Types.ObjectId;
const postOneId = new mongoose.Types.ObjectId;
const postTwoId = new mongoose.Types.ObjectId;
const postThreeId = new mongoose.Types.ObjectId;

const userOne = {
    _id: userOneId,
    name: 'Sam', 
    email: '8573t63677548@1email.com',
    password: 'strongerPass',
    admin: true,
    tokens: [
        {
            token: jwt.sign({_id: userOneId}, process.env.JWT_SECRET),
        },
    ],
};

const userTwo = {
    _id: userTwoId,
    name: 'Not Sam', 
    email: '56799i3857@email.com',
    password: 'patessst',
    admin: false,
    tokens: [
        {
            token: jwt.sign({_id: userTwoId}, process.env.JWT_SECRET),
        },
    ],
};

const postOne = {
    _id: postOneId,
    title: 'title',
    article: 'article text',
    author: userTwo.name,
    authorId: userTwoId,
}

const postTwo = {
    _id: postTwoId,
    title: 'title II',
    article: 'article II text',
    author: userTwo.name,
    authorId: userTwoId,
}

const postThree = {
    _id: postThreeId,
    title: 'title III',
    article: 'article part 3 text',
    author: userTwo.name,
    authorId: userTwoId,
};

const setUpDatabase = async () => {
    await User.deleteMany();
    await Post.deleteMany();
    await new User(userTwo).save();
    await new Post(postOne).save();
    await new Post(postTwo).save();
    await new Post(postThree).save();
    userTwo.posts = [postOne, postTwo, postThree]
}

module.exports = {
    userOne,
    userOneId,
    userTwo,
    userTwoId,
    setUpDatabase,
    postOne,
    postTwo,
    postThree,
}