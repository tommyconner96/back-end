# back-end

routes are populated with seed data.

POST to '/auth/register' will register a user.
Required fields:
{username, password, phoneNumber}
POST to '/auth/login' will login a user. Authentication uses cookies and tokens.
GET to '/users/:userID/plants' will get a users' plants. preset seed data has users 1-3 and they all have plants so you can test that.

test1, test2, and test3 are registered users. password is password.

deploy coming soon but for now this should work on localhost