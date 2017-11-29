const mongoose = require("mongoose");
const FoodItem = require("../models/FoodItemModel");

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
  const foodModel = new FoodItem();
  const foodItem = Object.assign(foodModel, req.body);
  foodItem.save()
    .then((doc) => {
      res.status(200).send(doc);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

exports.deleteFood = (req, res) => {

}