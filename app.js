const cardsRouter = require("./routes/cards");

const usersRouter = require("./routes/users");

const express = require("express");

const fs = require("fs");

const { PORT = 3000 } = process.env;

const app = express();

app.use("/cards", cardsRouter);

app.use("/users", usersRouter);

//rota coringa caso nenhuma rota seja encontrada na requisição
app.use("", (req, res) => {
  res.status(404).send({ message: "A solicitação não foi encontrada" });
});

app.listen(PORT, () => {
  console.log(`App is listening at port ${PORT}`);
});
