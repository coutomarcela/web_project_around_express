const express = require("express");

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/aroundb")
  .then(() => {
    console.log("Conectado ao MongoDB");
  })
  .catch((err) => {
    console.error("Erro ao conectar ao MongoDB:", err);
  });

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

//middleware global de tratamento de erro
app.use((error, req, res, next) => {
  //erro quando o id tem formato válido, mas não existe um usuário com esse id
  if (error.statusCode === 404) {
    res.status(404).send({ message: "Card não encontrado" });
    return;
  }
  //erro quado o id tem formato inválido
  if (error.name === "CastError") {
    res.status(400).send({ message: "Formato de id inválido" });
    return;
  }
  res.status(500).send({ message: "Erro no Servidor" });
});

app.listen(PORT, () => {
  console.log(`App is listening at port ${PORT}`);
});
