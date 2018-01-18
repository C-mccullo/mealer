// Import variables from variables.env file
require('dotenv').config({ path: 'variables.env' });

const express = require('express');
const expressValidator = require("express-validator");
const app = express();
const path = require('path');
const mongoose = require("mongoose");
const passport = require("passport")
const bodyParser = require("body-parser");
const session = require("express-session");
const router = require("./routes/index");

// ErrorHandlers
const errorHandlers = require("./handlers/errorHandlers");
// Controllers
const userController = require("./controllers/userController");
const ingredientController = require("./controllers/ingredientController");
const foodItemController = require("./controllers/foodItemController");
const recipeController = require("./controllers/recipeController");
const mealPlanController = require("./controllers/mealPlanController");

// Models
const User = require("./models/UserModel");

if (process.NODE_ENV === "production") {
  mongoose.connect(process.env.DATABASE, {
    useMongoClient: true,
  });
}

mongoose.connect(process.env.LOCAL, {
  useMongoClient: true,
});

// tells passport which type of strategy to expect for the User authentication
passport.use(User.createStrategy());

// use bodyParser to let app know what forms of data to expect from server requests
app.use(bodyParser.json());

// applies additional methods to server requests which can be used
// to validate or sanitize information
app.use(expressValidator());

// tells pasport to expect information necessary to identify a user on subsequent requests.
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(session({ secret: process.env.SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// This serves all files placed in the /public
// directory (gulp will then build all React code)
app.use(express.static('public'));

// Also serve everything from our assets directory (static
// assets that you want to manually include)
app.use(express.static('assets'));

// API ROUTES that have precedence over the wildcard route below
app.use('/', router);

// This wildcard route serves your index.html file (which
// initializes React)
app.get('*', function(req, res, next) {
  res.sendFile(path.join(__dirname,'index.html'));
});

if (app.get('env') === 'development') {
  /* Development Error Handler - Prints stack trace */
  app.use(errorHandlers.developmentErrors);
}

// Start your server, and listen on port 8080.
app.listen(process.env.PORT, function() {
  console.log(`App is now listening on port ${process.env.PORT}!`);
})
