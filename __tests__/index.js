const db = require('../database/data')
const request = require('supertest')
const server = require('../server.js')

// a global jest hook to run before each individual test
beforeEach(async () => {
	// re-run the seeds and start with a fresh database for each test
	await db.seed.run()
})

// a global jest hook to run after all the tests are done
afterAll(async () => {
	// closes the database connection so the jest command doesn't stall
	await db.destroy()
})

// TEST route
describe('test route', () => {
    it('should return a 200 status code', async () => {
        const expected = 200
        const response = await request(server).get('/')
        expect(response.status).toEqual(expected)
    })
})