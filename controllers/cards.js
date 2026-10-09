const Card = require("../models/card");

//rota retornar todos os cards
module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => res.status(500).send({ message: "Erro no servidor" }));
};

//rota criar novo card
module.exports.newCard = (req, res) => {
  const { name, link } = req.body;
  const { _id } = req.user;
  Card.create({ name, link, owner: _id })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: "Dados inválidos" });
      }
      res.status(500).send({
        message: "Erro no Servidor",
      });
    });
};

//rota deletar card por id
module.exports.deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .orFail(() => {
      const error = new Error("Nenhum card foi encontrado");
      error.statusCode = 404;
      throw error;
    })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.statusCode === 404) {
        res.status(404).send({ message: "Card não encontrado" });
        return;
      }
      if (err.name === "CastError") {
        res.status(400).send({ message: "Formato de id inválido" });
        return;
      }
      res.status(500).send({ message: "Erro no Servidor" });
    });
};

//rota curtir card
module.exports.likeCard = (req, res) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // adicione _id ao array se ele não estiver lá
    { new: true },
  );

//rota descurtir card
module.exports.dislikeCard = (req, res) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // remove _id do array
    { new: true },
  );
