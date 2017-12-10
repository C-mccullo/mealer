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

// Controllers
const userController = require("./controllers/userController");
const ingredientController = require("./controllers/ingredientController");
const foodItemController = require("./controllers/foodItemController");
const recipeController = require("./controllers/recipeController");
const mealPlanController = require("./controllers/mealPlanController");

// Models
const User = require("./models/UserModel");

mongoose.connect("mongodb://localhost/meal-planner");

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

// USERS
app.get("/api/getme", (req, res) => {
  console.log(req);
  if (req.user) {
    res.status(200).send(req.user)
  } else {
    res.status(401).json({ message: "Unauthorized." });
  }
});

app.get('/api/users', (req, res) => {
  User.find()
    .then((docs) => res.send(docs));
});

app.post("/api/signup", 
  userController.sanitizeUser,
  userController.registerUser,
  passport.authenticate("local"), 
  userController.sendUser
);

app.post("/api/login", 
  passport.authenticate("local"),
  userController.sendUser
);

app.get("/api/logout", userController.logoutUser);

// INGREDIENTS LIST 
app.get("/api/ingredientList", ingredientController.getIngredients);

app.get("/api/search/ingredientList", ingredientController.searchIngredients);

app.post("/api/ingredientList", ingredientController.postIngredient);

// INVENTORY
app.get("/api/foods", foodItemController.getFoods);

app.post("/api/foods/", 
  foodItemController.checkIngredientExist, 
  foodItemController.checkByExpiry
);

app.delete("/api/foods/:id", foodItemController.deleteFood);

// RECIPES
app.get("/api/recipes", recipeController.getRecipes);

app.post("/api/recipes", recipeController.postRecipe);

app.delete("/api/recipes/:id", recipeController.deleteRecipe);

// MEAL PLAN
app.get("/api/mealPlan", mealPlanController.getMealPlan);

app.put("/api/mealPlan/:day", 
  mealPlanController.updateFoodItems,
  mealPlanController.updateMealPlan
);

// This wildcard route serves your index.html file (which
// initializes React)
app.get('*', function(req, res, next) {
  res.sendFile(path.join(__dirname,'index.html'));
});

// Start your server, and listen on port 8080.
app.listen(8080, function() {
  console.log("App is now listening on port 8080!");
})
