//importação do roteador do express
const router = require("express").Router();

const fs = require("fs");

const path = require("path");

const cardsPath = path.join(__dirname, "../data/cards.json");

//rota cards
router.get("", (req, res) => {
  fs.readFile(cardsPath, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ message: "Ocorreu um erro no servidor" });
    }
    const cards = JSON.parse(data.toString("utf-8"));
    res.send(cards);
  });
});

module.exports = router;
