const router = require("express").Router();

const {
  getUsers,
  getUserById,
  newUser,
  editProfile,
  editAvatar
} = require("../controllers/users");

//rota all users
router.get("", getUsers);

//rota user by id
router.get("/:userId", getUserById);

//rota new user
router.post("", newUser);

//rota atualizar perfil
router.patch("/me", editProfile);

//rota atualizar avatar
router.patch("/me/avatar", editAvatar);

module.exports = router;
