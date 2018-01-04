const express = require("express");
const router = express.Router();
const passport = require("passport");
// controllers
const userController = require("../controllers/userController");
const ingredientController = require("../controllers/ingredientController");
const foodItemController = require("../controllers/foodItemController");
const recipeController = require("../controllers/recipeController");
const mealPlanController = require("../controllers/mealPlanController");

// models
const User = require("../models/UserModel");

// USERS
router.get("/api/getme", userController.checkUser);

router.get('/api/users', (req, res) => {
  User.find()
    .then((docs) => res.send(docs));
});

router.post("/api/signup",
  userController.sanitizeUser,
  userController.registerUser,
  passport.authenticate("local"),
  mealPlanController.newUserMealPlan,
  userController.sendUser
);

router.post("/api/login",
  passport.authenticate("local"),
  userController.sendUser
);

router.get("/api/logout", userController.logoutUser);

// INGREDIENTS LIST 
router.get("/api/ingredientList", ingredientController.getIngredients);

router.get("/api/search/ingredientList", ingredientController.searchIngredients);

router.post("/api/ingredientList",
  userController.isAuthorized,
  ingredientController.postIngredient
);

// INVENTORY
router.get("/api/foods",
  userController.isAuthorized,
  foodItemController.getFoods
);

router.post("/api/foods/",
  userController.isAuthorized,
  foodItemController.checkIngredientExist,
  foodItemController.checkByExpiry
);

router.delete("/api/foods/:id",
  userController.isAuthorized,
  foodItemController.deleteFood
);

// RECIPES
router.get("/api/recipes",
  userController.isAuthorized,
  recipeController.getRecipes
);

router.post("/api/recipes",
  userController.isAuthorized,
  recipeController.postRecipe
);

router.delete("/api/recipes/:id",
  userController.isAuthorized,
  recipeController.deleteRecipe
);

// MEAL PLAN
router.get("/api/mealPlan",
  userController.isAuthorized,
  mealPlanController.getMealPlan
);

router.put("/api/mealPlan/:day",
  userController.isAuthorized,
  mealPlanController.restoreUnusedFoodItems,
  mealPlanController.updateFoodItems,
  mealPlanController.updateMealPlan
);

module.exports = router;

