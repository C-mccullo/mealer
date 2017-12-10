const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, "Sorry, invalid email address"],
    required: "please add an email address"
  },
  name: {
    type: String,
    required: "Please add a name for login",
    trim: true
  }
});

UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });

module.exports = mongoose.model("User", UserSchema);

