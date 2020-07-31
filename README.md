# Water My Plants

Ensuring that all your plants are consistently watered is actually pretty difficult. Water My Plants is an app that helps to solve those problems. 

With an easy to use interface for creating a plant watering schedule tailored to each individual plant, WaterMyPlants will remind users when it's time to feed that foliage and quench your plants' thirst.

This repo is for the back end. Written in Node.js and using JWT and cookies for auth.

## Deployed link

The deployed server can be found [here](https://water-my-plants-server.herokuapp.com/).

## Endpoints


### User Endpoints

| POST   | /auth/register          | Register a user. Required fields: {username, password, phoneNumber} 

| POST   | /auth/login             | Login a user. Authentication uses cookies and tokens. Required fields: {username, password}

| GET    | /auth/logout            | Removes the Authentication cookie. ( but not the token produced by frontend)

| GET    | /users/:userID/plants   | get a users' plants.

| GET    | /users                  | Returns an array of all users.

| GET    | /users/:id              | gets a specific user by ID

| PUT    | /users/:id              | Edit a user. request must contain phoneNumber and password. username cannot be changed

### Plant Endpoints

| GET    | /:userID/plants              | Returns plants by user ID

| GET    | /:userID/plants/:plantID     | Returns a plant by plant ID

| POST   | /:userID/plants              | Create a new plant. required fields: nickname(str), species(str), h2oFrequency(int) optional:image(url)

| PUT    | /:userID/plants/:plantID     | Update a plant. required fields: nickname(str), species(str), h2oFrequency(int) optional:image(url)

| DELETE | /:userID/plants/:plantID     | DELETE a plant


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)