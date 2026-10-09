const User = require("../models/user");

//rota todos os users
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => res.status(500).send({ message: "Erro no servidor" }));
};

//rota user por id
module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      const error = new Error("Nenhum usuário foi encontrado");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      console.log(error);
      //erro quando o id tem formato válido, mas não existe um usuário com esse id
      if (error.statusCode === 404) {
        res.status(404).send({ message: "Usuário não encontrado" });
        return;
      }
      //erro quado o id tem formato inválido
      if (error.name === "CastError") {
        res.status(400).send({ message: "Formato de id inválido" });
        return;
      }

      res.status(500).send({ message: "Erro no Servidor" });
    });
};

//rota criar user
module.exports.newUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      // caso algum dos dados enviados não passe pelas validações do Schema
      if (error.name === "ValidationError") {
        res.status(400).send({ message: "Dados inválidos" });
        return;
      }

      // qualquer outro erro inesperado
      res.status(500).send({
        message: "Erro no servidor",
      });
    });
};

//rota editar perfil
module.exports.editProfile = (req, res) => {
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
    .catch((error) => {
      if (error.name === "ValidationError") {
        res.status(400).send({ message: "Dados inválidos" });
        return;
      }
      if (error.statusCode === 404) {
        res.status(404).send({ message: "Usuário não encontrado" });
        return;
      }
      res.status(500).send({
        message: "Erro no servidor",
      });
    });
};

module.exports.editAvatar = (req, res) => {
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
    .catch((error) => {
      if (error.name === "ValidationError") {
        res.status(400).send({ message: "Dados inválidos" });
        return;
      }
      if (error.statusCode === 404) {
        res.status(404).send({ message: "Usuário não encontrado" });
        return;
      }
      res.status(500).send({
        message: "Erro no servidor",
      });
    });
};
