const express = require("express");

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/arounddb");

const cardsRouter = require("./routes/cards");

const usersRouter = require("./routes/users");

const { PORT = 3000 } = process.env;

const app = express();

//permite que o express leia json e permite armazenar um objeto json no corpo da requisição - req.body
app.use(express.json());

//middleware
app.use((req, res, next) => {
  req.user = {
    _id: "6ac4f463b4d0361bb544fcba",
  };

  next();
});

app.use("/cards", cardsRouter);

app.use("/users", usersRouter);

//rota coringa caso nenhuma rota seja encontrada na requisição
app.use("", (req, res) => {
  res.status(404).send({ message: "A solicitação não foi encontrada" });
});

app.listen(PORT, () => {
  console.log(`App is listening at port ${PORT}`);
});
