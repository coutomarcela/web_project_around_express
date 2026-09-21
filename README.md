# Around The U.S. — Express

## About

This project is the backend development stage of **Around The U.S.**, previously built with React. It introduces server-side development using **Node.js and Express**, creating API routes to provide user and card data.

The project was developed as part of a Web Development Bootcamp.

Frontend project:
https://github.com/coutomarcela/web_project_around_react

## Features

* Express server with Node.js
* API routes for users and cards
* User search by ID
* Local JSON data
* Error handling for invalid routes and IDs

## Technologies

* Node.js
* Express.js
* JavaScript
* JSON
* ESLint
* Nodemon

## Running Locally

```bash
git clone https://github.com/coutomarcela/web_project_around_express.git
cd web_project_around_express
npm install
npm run dev
```

The server runs on `http://localhost:3000`.

## API Routes

```text
GET /users
GET /users/:id
GET /cards
```
