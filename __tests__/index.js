const db = require('../database/data')
const request = require('supertest')
const expect = require('chai').expect
const app = require('../server.js')

// require('dotenv').config()


before(function (done) {
    db.migrate.rollback()
        .then(() => {
            db.migrate.latest()
                .then(() => {
                    return db.seed.run()
                        .then(() => {
                            done()
                        })
                })
        })
})

after(function (done) {
    db.migrate.rollback()
        .then(() => {
            db.migrate.latest()
                .then(() => {
                    return db.seed.run()
                        .then(() => {
                            done()
                        })
                })
        })
})

// set up the data we need to pass to the login method
const userCredentials = {
    username: 'test1',
    password: 'password'
}
// login the user before it runs tests
const authenticatedUser = request.agent(app)
before(function (done) {
    authenticatedUser
        .post('/auth/login')
        .send(userCredentials)
        .end(function (err, response) {
            expect(response.statusCode).to.equal(200)
            done()
        })
})


describe('GET /users', function (done) {
    it('should return a 200 response if the user is logged in', function (done) {
        authenticatedUser.get('/users')
            .expect(200, done)
    })
    it('should return a 401 response if not logged in', function (done) {
        request(app).get('/users')
            .expect(401, done)
    })
})

describe('GET /users/:id/plants', function (done) {
    it('should return a 200 response if the user is logged in', function (done) {
        authenticatedUser.get('/users/1/plants')
            .expect(200, done)
    })
    it('should return a 401 response if not logged in', function (done) {
        request(app).get('/users/1/plants')
            .expect(401, done)
    })
})

describe('POST /users/:id/plants', function (done) {
    it('should return a 201 response if the user is logged in', function (done) {
        authenticatedUser.post('/users/1/plants')
            .send({
                "nickname": "TESTnickname",
                "species": "TESTspecies",
                "h2oFrequency": 10,
                "image": "TESTurl"
            })
            .expect(201, done)
    })
    it('should return a 401 response if not logged in', function (done) {
        request(app).post('/users/1/plants')
            .expect(401, done)
    })
})

describe('PUT /users/:id/plants/:plantID', function (done) {
    it('should return a 200 response', function (done) {
        authenticatedUser.put(`/users/1/plants/7`)
            .send({
                "nickname": "newTESTnickname",
                "species": "newTESTspecies",
                "h2oFrequency": 1,
                "image": "TESTurl2"
            })
            .expect(200, done)
    })
})

describe('DELETE /users/:id/plants/:plantID', function (done) {
    it('should return a 200 response', function (done) {
        authenticatedUser.delete(`/users/1/plants/8`)
            .expect(200, done)
    })
})

// set up the fake login data for the next
const fakeUserCredentials = {
    username: 'FAKEtest1',
    password: 'password'
}
// login the user before it runs tests
const unauthenticatedUser = request.agent(app)

before(function (done) {
    unauthenticatedUser
        .post('/auth/login')
        .send(fakeUserCredentials)
        .end(function (err, response) {
            expect(response.statusCode).to.equal(401)
            done()
        })
})


describe('GET /users with invalid credentials', function (done) {
    it('should return a 401 response if the user uses invalid credentials', function (done) {
        unauthenticatedUser.get('/users')
            .expect(401, done)
    })
})

describe('GET /users/:id/plants with invalid credentials', function (done) {
    it('should return a 401 response if the user uses invalid credentials', function (done) {
        unauthenticatedUser.get('/users/1/plants')
            .expect(401, done)
    })
})

describe('REGISTER a user', function (done) {
    it('should return a 201 response if the user registered sucessfully', function (done) {
        authenticatedUser
            .post('/auth/register')
            .send({
                "username": "TESTUSERNAME11",
                "password": "password",
                "phoneNumber": "555-111-555"
            })
            .expect(201, done)
    })
})
    it('should return a 401 response if missing fields', function (done) {
        authenticatedUser
            .post('/auth/register')
            .send({
                "username": "TESTUSERNAME12",
                "password": "password"
            })
            .expect(401, done)
    })