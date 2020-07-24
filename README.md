## back-end

routes are populated with seed data.

POST to '/auth/register' will register a user. Required fields: {username, password, phoneNumber} POST to '/auth/login' will login a user. Authentication uses cookies and tokens. Required fields: {username, password} GET to '/users/:userID/plants' will get a users' plants. preset seed data has users 1-3 and they all have plants so you can test that. GET to '/users' gets an array of all users (protected route) GET to '/users/:id' gets a specific user by id (protected route) DELETE to '/users/:id' will DELETE a user (protected route) PUT to '/users/:id' will EDIT a user (protected route) POST to '/auth/register' will CREATE a user, as mentioned in first paragraph

test1, test2, and test3 are registered users. password is password.

this will only work on your react project if it is running from http://localhost:3000

plants data structure: { user_id: integer nickname: 'str', species: 'str', h2oFrequency: integer, image: 'str' },

image optional all other fields required h2o frequency will be a number representing number of days between plant watering.

this project utilizes JWT and cookies. axios calls for protected routes will need {withCredentials: true} and login route will need to set a token in localstorage. you will need a privateroute to check for the token.

GET to /auth/logout will remove the cookie, but not the token. You will need to implement something to remove the token. I don't think its required for MVP but its really easy to do and it will make testing easier for you also if you're able to logout.