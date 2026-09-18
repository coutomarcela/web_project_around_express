const router = require("express").Router();

const fs = require("fs");

const path = require("path");

const usersPath = path.join(__dirname, "../data/users.json");

//rota users
router.get("", (req, res) => {
  fs.readFile(usersPath, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ message: "Ocorreu um erro no servidor" });
    }
    const users = JSON.parse(data.toString("utf-8"));
    res.send(users);
  });
});

//rota id
router.get("/:id", (req, res) => {
  fs.readFile(usersPath, "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ message: "Ocorreu um erro no servidor" });
    }
    const users = JSON.parse(data.toString("utf-8"));
    const user = users.find((user) => user._id === req.params.id);
    if (!user) {
      res.status(404).send({ message: "ID do usuário não encontrado" });
      return;
    }
    res.send(user);
  });
});

module.exports = router;
