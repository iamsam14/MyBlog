const request = require('supertest')
const app = require('../app');
const User = require('../db/models/User');

const {userOne, userOneId, setUpDatabase} = require('./fixtures/db');

function existingUser() {
    throw new Error("Use a different email!");
  }
  
beforeEach(setUpDatabase);

//  Must comment out required: true on token in User schema for tests to run
describe('users', () => {
    /**
     * Post to /api/users
     * No auth needed
     * 201 on success
     * 401 on fail
     */

    //  Needs to be debugged
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

        //  Check database for new user
        const user = await User.findById(response.body._id);
        //  Make sure user is populated with correct fields
        expect(user).not.toBeNull();
        expect(user.name).toBe(userOne.name);
        expect(user.email).toBe(userOne.email);
        expect(user.password).not.toBe(userOne.password)
     })

     /**
      * Post to /api/users/login
      * 
      */
     it('should log in a user', async () => {
         const response = await request(app)
         .post('/api/users/login')
         .send({email: userOne.email, password: userOne.password })
         .expect(200)
     })

    //  Needs to be corrected
     xit('should not login unauthenticated user/nonexistant user', async () => {
         const response = await request(app)
         .post('/api/users/login')
         .send({email: 'totallyrealemail@trustme.com', password: 'letmeinLETMEIN!!!!!!!!'})
         .expect(() =>  existingUser()).toThrow(Error)
     })
})