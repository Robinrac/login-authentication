const mongoose = require("mongoose");
const Bcrypt = require("bcrypt")

const userSchema = mongoose.Schema({
  emailAddress: {
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

//hash the passwords
userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    const salt = await Bcrypt.genSalt(10);
    this.password = await Bcrypt.hash(this.password, salt);
    next();
  } catch {
    return next(error)
  }
})

module.exports = mongoose.model("user", userSchema);