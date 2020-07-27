## back-end

routes are populated with seed data.

POST to '/auth/register' will register a user. 
Required fields: {username, password, phoneNumber} 

POST to '/auth/login' will login a user. Authentication uses cookies and tokens. Required fields: {username, password} 

GET to /auth/logout will remove the cookie, but not the token. You will need to implement something to remove the token. I don't think its required for MVP but its really easy to do and it will make testing easier for you also if you're able to logout.

GET to '/users/:userID/plants' will get a users' plants. preset seed data has users 1-3 and they all have plants so you can test that. (protected route)

GET to '/users' gets an array of all users (protected route) 

GET to '/users/:id' gets a specific user by id (protected route) 

DELETE to '/users/:id' will DELETE a user (protected route) 

PUT to '/users/:id' will EDIT a user (protected route). must send a phoneNumber and password in request. username cannot be changed.

POST to '/auth/register' will CREATE a user, as mentioned in first paragraph

users can be CREATED, READ, and DELETED. PUT has not been implemented for users.

test1, test2, and test3 are registered users. password is password.

this will only work on your react project if it is running from http://localhost:3000

plants data structure: 
{ user_id: integer nickname: 'str', species: 'str', h2oFrequency: integer, image: 'str' },

image optional all other fields required 

h2o frequency will be a number representing number of days between plant watering.

GET to '/:userID/plants' will display that users' plants

GET to '/:userID/plants/:plantID' will display a specific plant

POST to '/:userID/plants' will create a new plant for that user (note: as it currently stands, any authenticated user can update anyones plants. If I have time I might fix that but it is not required for MVP)
required fields: {nickname, species, h2oFrequency} image optional

PUT to '/:userID/plants/:plantID/' will UPDATE a users plant. same note as above POST
required fields: {nickname, species, h2oFrequency} image optional

DELETE to '/:userID/plants/:plantID/' will DELETE a users plant.

this project utilizes JWT and cookies. axios calls for protected routes will need {withCredentials: true} and login route will need to set a token in localstorage. you will need a privateroute to check for the token.
