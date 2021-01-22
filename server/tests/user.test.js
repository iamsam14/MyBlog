const request = require('supertest');
const moment = require('moment');
const app = require('../app');

const {userOne, userTwo, setUpDatabase,postOne} 
= require('./fixtures/db');

beforeAll(setUpDatabase);

describe('open user routes', () => {

    xit('should sign up a new user', async () => {
        const response = await request(app)
        .post('/api/users')
        .send({
            name: userOne.name,
            email: userOne.email,
            password: userOne.password
        })
        .expect(201);
              
        expect(response.body).not.toBeNull();
        expect(response.body.name).toBe(userOne.name);
        expect(response.body.email).toBe(userOne.email);
        expect(response.body.password).not.toBe(userOne.password);
    });

    xit('should return signup error', async () => {
        const response = await request(app)
        .post('/api/users')
        .send({
            name: 'some_new_name',
            email: 'notvalidemail',
            password: 'secretcode123'
        })
        .expect(400);
    });
        
    xit('should log in a user', async () => {
        const response = await request(app)
        .post('/api/users/login')
        .send({email: userTwo.email, password: userTwo.password })
        .expect(200);

        expect(response.body).not.toBeNull();
        expect(response.body.name).toBe(userTwo.name);
        expect(response.body.email).toBe(userTwo.email);
        expect(response.body.password).not.toBe(userTwo.password);
        expect(JSON.stringify(response.body._id)).toStrictEqual(JSON.stringify(userTwo._id));
    });

    xit('should not login unauthenticated user/nonexistant user', async () => {
        await request(app)
        .post('/api/users/login')
        .send({email: 'totallyrealemail@trustme.com', password: 'letmeinLETMEIN!!!!!!!!'})
        .expect(401);
    });

});

describe('authenticated user routes', () => {
    xit('should get profile for authenticated user', async () => {
        const response = await request(app)
        .get('/api/users/me')
        .set('Authorization', `jwt ${userTwo.tokens[0].token}`)
        .send()
        .expect(200);

        expect(response.body).not.toBeNull();
        expect(response.body.name).toBe(userTwo.name);
        expect(response.body.email).toBe(userTwo.email);
        expect(response.body.password).not.toBe(userTwo.password);
        expect(response.body.password).not.toBe(userTwo.password);
    });

    xit('should not get profile for authenticated user', async () => {
        await request(app)
        .get('/api/users/me')
        .set('Authorization', `jwt totally_real_token`)
        .send()
        .expect(401);
    });

    xit('should update name and email fields', async () => {
        const response = await request(app)
        .patch('/api/users/me')
        .set('Authorization', `jwt ${userTwo.tokens[0].token}`)
        .send({name: 'My_new_name', email: 'My_new_email@new.com'})
        .expect(200);

        expect(response.body.name).toBe('My_new_name');
        expect(response.body.email).toBe('my_new_email@new.com');
    });

    xit('should not update invalid field', async () => {
        const response = await request(app)
        .patch('/api/users/me')
        .set('Authorization', `jwt ${userTwo.tokens[0].token}`)
        .send({_id: 'totally_not_hacking', admin: true})
        .expect(400);

        expect(response.body.error).toBe('invalid update!');
    });

    xit('should log out a user', async () => {
        const response = await request(app)
        .post('/api/users/logout')
        .set('Authorization', `jwt ${userTwo.tokens[0].token}`)
        .expect(200);

        expect(response.body.message).toBe('logged out');
    });

    xit('should return unauthorized', async () => {
        await request(app)
        .post('/api/users/logout')
        .set('Authorization', `jwt fakejwttoken`)
        .expect(401);
    });

    xit('should delete a user', async () => {
        const response = await request(app)
        .delete('/api/users/me')
        .set('Authorization', `jwt ${userTwo.tokens[0].token}`)
        .expect(200);

        expect(response.body.name).toBe(undefined);
        expect(response.body.email).toBe(undefined);
        expect(response.body.tokens).toBe(undefined);
    });

    xit('should return unauthorized', async () => {
        await request(app)
        .delete('/api/users/me')
        .set('Authorization', `jwt realjwttoken`)
        .expect(401);
    });
});

describe('authenticated post routes', () => {
    it('should retrieve all posts from database', async () => {
        await request(app)
        .get('/api/posts')
        .set('Authorization', `jwt ${userTwo.tokens[0].token}`)
        .send()
        .expect(201);
    });

    xit('should return unauthorized', async () => {
        await request(app)
        .get('/api/posts')
        .set('Authorization', `jwt fakejwttoken`)
        .expect(401);
    });

    it('should create a new post', async () => {
        const testDate = moment(new Date().toISOString()).format("YYYY-MM-DD");

        const response = await request(app)
        .post('/api/posts/add')
        .set('Authorization', `jwt ${userTwo.tokens[0].token}`)
        .send({
            title: "title",
            article: "article",
            dateCreated: testDate,
            author: userTwo.name,
            authorId: userTwo._id
        })
        .expect(201);

        expect(response.body.title).toBe('title');
        expect(response.body.article).toBe('article');
        expect(response.body.dateCreated).toBe(testDate);
        expect(response.body.author).toBe(userTwo.name);
        expect(JSON.stringify(response.body.authorId)).toStrictEqual(JSON.stringify(userTwo._id));
    });

    xit('should not create a new post', async () => {
        const response = await request(app)
        .post('/api/posts/add')
        .set('Authorization', `jwt faketoken`)
        .send({
            title: "title",
            article: "article",
            author: userTwo.name,
            authorId: userTwo._id
        })
        .expect(401);

        expect(response.body).toStrictEqual({});
    });

    /**
     * Get to /api/post/:id
     * should return post object
     */
    it('should return a specific post', async () => {
        const response = await request(app)
        .get(`/api/post/${userTwo.posts[0]._id}`)
        .set('Authorization', `jwt ${userTwo.tokens[0].token}`)
        .send()
        .expect(200)

        expect(response.body.title).toBe(postOne.title);
        expect(response.body.article).toBe(postOne.article);
        expect(response.body.author).toBe(postOne.author);
        expect(response.body.authorId).toBe(postOne.authorId);
        expect(JSON.stringify(response.body._id)).toStrictEqual(JSON.stringify(postOne._id));
    });
});