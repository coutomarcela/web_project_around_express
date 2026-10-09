const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    type: String,
    validate: {
      validator: function (v) {
        return /^https?:\/\/(www\.)?[a-zA-Z0-9.-]+(?:\/[a-zA-Z0-9._~:/?%#[\]@!$&'()*+,;=-]*)?$/.test(
          v,
        );
      },
      message: (props) => `${props.value} não é uma URL válida!`,
    },
    required: [true, "Insira URL do avatar"],
  },
});

const user = mongoose.model("user", userSchema);

module.exports = user;
