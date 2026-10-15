const Card = require("../models/card");

//rota retornar todos os cards
module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => {
      next(err);
    });
};

//rota criar novo card
module.exports.newCard = (req, res, next) => {
  const { name, link } = req.body;
  const { _id } = req.user;
  Card.create({ name, link, owner: _id })
    .then((card) => {
      res.status(201).send(card);
    })
    .catch((err) => {
      next(err);
    });
};

//rota deletar card por id
module.exports.deleteCard = (req, res, next) => {
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
      next(err);
    });
};

//rota curtir card
module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // adicione _id ao array se ele não estiver lá
    { new: true },
  )
    .orFail(() => {
      const error = new Error("Nenhum card foi encontrado");
      error.statusCode = 404;
      throw error;
    })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      next(err);
    });
};

//rota descurtir card
module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // remove _id do array
    { new: true },
  )
    .orFail(() => {
      const error = new Error("Nenhum card foi encontrado");
      error.statusCode = 404;
      throw error;
    })
    .then((card) => {
      res.send(card);
    })
    //se der algum erro no dislikeCard, o erro é jogado pro próximo middleware
    .catch((err) => {
      next(err);
    });
};
