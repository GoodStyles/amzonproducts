const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required to register"],
  },
  email: {
    type: String,
    required: [true, "A email is necessary for user"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  photo: String,
  role: {
    type: String,
    enum: ["user", "seller", "admin"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "You need to choose a password"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not match",
    },
  },
  passwordChangedAt: Date, //YEAR-MONTH-DATE
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

const user = mongoose.model("user", userSchema);

module.exports = user;
