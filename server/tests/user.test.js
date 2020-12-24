const request = require('supertest');
const moment = require('moment');
const app = require('../app');
const User = require('../db/models/User');

const {userOne, userTwo, setUpDatabase} = require('./fixtures/db');

beforeAll(setUpDatabase);

describe('open user routes', () => {

    /**
     * Post to /api/users
     * Signs up a new user
     */
     xit('should sign up a new user', async () => {
        //  Post API call test
         const response = await request(app)
         .post('/api/users')
         .send({
             name: userOne.name,
             email: userOne.email,
             password: userOne.password
         })
         //  Checks for status 201
         .expect(201);
         
         expect(response.body).not.toBeNull();
         
         expect(response.body).not.toBeNull();
         expect(response.body.name).toBe(userOne.name);
         expect(response.body.email).toBe(userOne.email);
         expect(response.body.password).not.toBe(userOne.password)
        });

    /**
     * Post to /api/users
     * email not valid
     */
        xit('should return signup error', async () => {
        //  Post API call test
            const response = await request(app)
            .post('/api/users')
            .send({
                name: 'some_new_name',
                email: 'notvalidemail',
                password: 'secretcode123'
            })
            //  Checks for status 201
            .expect(400);
        });
        
        /**
         * Post to /api/users/login
         * Checks user information
      */
     xit('should log in a user', async () => {
         const response = await request(app)
         .post('/api/users/login')
         .send({email: userTwo.email, password: userTwo.password })
         .expect(200)

        const user = response.body;

         expect(user.name).toBe(userTwo.name);
         expect(user.email).toBe(userTwo.email);
         expect(user.password).not.toBe(userTwo.password);
     });

     /**
      * Post to /api/users/login
      * Credentials invalid
      */
     xit('should not login unauthenticated user/nonexistant user', async () => {
         const response = await request(app)
         .post('/api/users/login')
         .send({email: 'totallyrealemail@trustme.com', password: 'letmeinLETMEIN!!!!!!!!'})
         .expect(401)
     });

});

describe('authenticated user routes', () => {
    // requests to secure routes

    /**
     * Post to /api/users/me
     * Auth token valid
     */
    xit('should get profile for authenticated user', async () => {
        const response = await request(app)
        .get('/api/users/me')
        .set('Authorization', `jwt ${userTwo.tokens[0].token}`)
        .send()
        .expect(200)
    });

    /**
     * Post to /api/users/me
     * Request unauthorized
     */
    xit('should not get profile for authenticated user', async () => {
        const response = await request(app)
        .get('/api/users/me')
        .set('Authorization', `jwt totally_real_token`)
        .send()
        .expect(401)
    });

    /**
     * Patch to /api/users/me
     * Auth token valid
     */
   xit('should update name and email fields', async () => {
        const response = await request(app)
        .patch('/api/users/me')
        .set('Authorization', `jwt ${userTwo.tokens[0].token}`)
        .send({name: 'My_new_name', email: 'My_new_email@new.com'})
        .expect(200)

        expect(response.body.name).toBe('My_new_name');
        expect(response.body.email).toBe('my_new_email@new.com');
    });

    /**
     * Patch to /api/users/me
     * Invalid updates
     */
    xit('should not update invalid field', async () => {
        const response = await request(app)
        .patch('/api/users/me')
        .set('Authorization', `jwt ${userTwo.tokens[0].token}`)
        .send({_id: 'totally_not_hacking', admin: true})
        .expect(400)
    });

    /**
     * Post to /api/users/logout
     * logs a user out
     */
    xit('should log out a user', async () => {
        const response = await request(app)
        .post('/api/users/logout')
        .set('Authorization', `jwt ${userTwo.tokens[0].token}`)
        .expect(200);

        expect(response.body.message).toBe('logged out');
    });

    /**
     * Post to /api/users/logout
     * Unauthorized request
     */
    xit('should return unauthorized', async () => {
        const response = await request(app)
        .post('/api/users/logout')
        .set('Authorization', `jwt fakejwttoken`)
        .expect(400);
    });

    /**
     * Delete to /api/users/me
     * deletes a user
     */
    xit('should delete a user', async () => {
        const response = await request(app)
        .delete('/api/users/me')
        .set('Authorization', `jwt ${userTwo.tokens[0].token}`)
        .expect(200)

        expect(response.body.name).toBe(undefined);
        expect(response.body.email).toBe(undefined);
        expect(response.body.tokens).toBe(undefined);
    });

    /**
     * Delete to /api/users/me
     * request unauthorized
     */
    xit('should return unauthorized', async () => {
        const response = await request(app)
        .delete('/api/users/me')
        .set('Authorization', `jwt realjwttoken`)
        .expect(401)
    });
});

describe('authenticated post routes', () => {
    // requests to secure routes

    /**
     * Get to /api/posts
     * retrieve all posts
     */
    xit('should retrieve all posts from database', async () => {
        const response = await request(app)
        .get('/api/posts')
        .set('Authorization', `jwt ${userTwo.tokens[0].token}`)
        .expect(201)
    });

    /**
     * Get to /api/posts
     * request fails
     */
    xit('should return unauthorized', async () => {
        const response = await request(app)
        .get('/api/posts')
        .set('Authorization', `jwt fakejwttoken`)
        .expect(401)
    });

    /**
     * Post to /api/posts/add
     * create a new post
     */
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
            authorID: userTwo._id
        })
        .expect(201)

        expect(response.body.title).toBe('title');
        expect(response.body.article).toBe('article');
        expect(response.body.dateCreated).toBe(testDate);
        expect(response.body.author).toBe(userTwo.name);
        expect(response.body.authorID).toBe((userTwo._id));
    })
});