
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");


// Controllers
const ingredientController = require("./controllers/ingredientController");
const foodItemController = require("./controllers/foodItemController");
const recipeController = require("./controllers/recipeController");
const mealPlanController = require("./controllers/mealPlanController");

mongoose.connect("mongodb://localhost/meal-planner");
// use bodyParser to let app know what forms of data to expect from server requests
app.use(bodyParser.json());

// This serves all files placed in the /public
// directory (where gulp will build all React code)
app.use(express.static('public'));

// Also serve everything from our assets directory (static
// assets that you want to manually include)
app.use(express.static('assets'));

// Include your own logic here (so it has precedence over the wildcard
// route below)

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
//foodItemController.postFoods

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
