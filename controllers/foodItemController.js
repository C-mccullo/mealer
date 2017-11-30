const mongoose = require("mongoose");
const FoodItem = require("../models/FoodItemModel");
const Ingredient = require("../models/IngredientModel");

exports.getFoods = (req, res) => {
  FoodItem.find().populate('ingredient').then((docs) => {
    res.status(200).send(docs);
  })
    .catch((err) => {
      res.status(400).send(err);
    })
  // turn to reference "foodItem model" then populate with Ingredient
}

exports.postFoods = (req, res) => {
  // post foodItems, if Ingredient with name is not found, create a new ingredient then add the ingredientID.
  console.log("postfoods", req.body);
  const foodItem = new FoodItem({ expiry: req.bodyexpiry, quantity: req.body.quantity, portions: req.body.portions, ingredient: req.body.ingredientID });
  foodItem.save()
    .then((doc) => {
      res.status(200).send(doc);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

// Add middleware to check foodItems being posted
exports.checkFoods = (req, res, next) => {
  const foodItem = req.body;
  console.log(foodItem);
  Ingredient.findOneAndUpdate({
    name: foodItem.name.toLowerCase()
  }, { name: foodItem.name.toLowerCase() },
  {
    upsert: true, 
    new: true
  })
  .then(doc => {
    req.body.ingredientID = doc._id;
    next();
  })
    .catch(next);
}

exports.deleteFood = (req, res) => {
// TODO MAKE DELETE FOOD CONTROLLER
}