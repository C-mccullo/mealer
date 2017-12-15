const mongoose = require("mongoose");
const User = require("../models/UserModel");
const passport = require("passport");

exports.sanitizeUser = (req, res, next) => {
  req.sanitizeBody("name");
  req.checkBody("email", "the email supplied is not valid").isEmail();
  req.sanitizeBody("email").normalizeEmail({
    remove_dots: false, 
    remove_extension: false,
    gmail_remove_subaddress: false
  });
  const errors = req.validationErrors();
  if (errors) {
    errors.map(err => console.log("validation errors", err.msg))
  } else {
    next();
  }
}

exports.registerUser = (req, res, next) => {
  const email = req.body.email;
  const name = req.body.name
  const user = new User({ email: email, name: name });
  User.register(user, req.body.password, (err, user) => {
    if (err) {
      res.send(err);
    } else {
      // console.log("registeration successful! ", user);
      next();
    }
  })
}

exports.sendUser = (req, res) => {
  res.send(req.user);
}

exports.checkUser = (req, res, next) => {
  if (req.user) {
    res.status(200).send(req.user)
    next();
  } else {
    res.status(401).json({ message: "Unauthorized." });
  }
}

exports.logoutUser = (req, res) => {
  req.logout();
  res.json("User is logged out");
}

exports.isAuthorized = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
    return;
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
}
