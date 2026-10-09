# Around The U.S. — Express

## About

This project is the backend development stage of **Around The U.S.**, previously built with React. It focuses on server-side development using **Node.js, Express, MongoDB, and Mongoose** to create and manage API routes for users and cards.

The project was developed as part of Tripleten's Web Development Bootcamp.

## Features

- REST API with Express
- MongoDB database integration with Mongoose
- User and card schemas and models
- Create, read, update, and delete operations
- Profile and avatar updates
- Card likes and dislikes
- Data validation with Mongoose
- Error handling for invalid data, IDs, and routes

## Technologies

- Node.js
- Express.js
- MongoDB
- Mongoose
- JavaScript
- ESLint
- Nodemon

## Running Locally

```bash
git clone https://github.com/coutomarcela/web_project_around_express.git
cd web_project_around_express
npm install
npm run dev
```

The server runs on `http://localhost:3000`.

MongoDB must be running locally for the application to connect to the database.

## API Routes

### Users

```text
GET    /users
GET    /users/:userId
POST   /users
PATCH  /users/me
PATCH  /users/me/avatar
```

### Cards

```text
GET     /cards
POST    /cards
DELETE  /cards/:cardId
PUT     /cards/:cardId/likes
DELETE  /cards/:cardId/likes
```
