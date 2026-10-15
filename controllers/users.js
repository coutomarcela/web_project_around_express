const User = require("../models/user");

//rota todos os users
module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => res.status(500).send({ message: "Erro no servidor" }));
};

//rota user por id
module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(() => {
      const error = new Error("Nenhum usuário foi encontrado");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
};

//rota criar user
module.exports.newUser = (req, res, next) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      next(err);
    });
};

//rota editar perfil
module.exports.editProfile = (req, res, next) => {
  User.findByIdAndUpdate(
    //usar req.user._id porque guarda o id do usuário atual
    req.user._id,
    { name: req.body.name, about: req.body.about },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => {
      const error = new Error("Nenhum usuário foi encontrado");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.editAvatar = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => {
      const error = new Error("Nenhum usuário foi encontrado");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
};
