const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  EmailAddress: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  dateOfCreation: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("user", userSchema);