const request = require('supertest')
const app = require('../app');
const User = require('../db/models/User');

const {userOne, userTwo, setUpDatabase} = require('./fixtures/db');
  
beforeEach(setUpDatabase);

// Must comment out required: true on token in User schema for tests to run
// Do not forget to uncomment out required: true in User schema when testing is done
describe('users', () => {
    /**
     * Post to /api/users
     * No auth needed
     * 201 on success
     * 401 on fail
     */

     it('should sign up a new user', async () => {
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
      * 200 on success
      * 401 on fail
      */
     it('should log in a user', async () => {
         const response = await request(app)
         .post('/api/users/login')
         .send({email: userTwo.email, password: userTwo.password })
         .expect(200)
     })

     /**
      * Post to /api/users/login
      * post should fail
      */
     it('should not login unauthenticated user/nonexistant user', async () => {
         const response = await request(app)
         .post('/api/users/login')
         .send({email: 'totallyrealemail@trustme.com', password: 'letmeinLETMEIN!!!!!!!!'})
         .expect(401)
     })
})