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
  const foodItem = new FoodItem({ expiry: req.body.expiry, quantity: req.body.quantity, portions: req.body.portions, ingredient: req.body.ingredientID });
  foodItem.save()
    .then((doc) => {
      res.status(200).send(doc);
    })
    .catch((err) => {
      res.status(500).send(err);
    })
}

// Add middleware to check the Ingredient for the FoodItem being posted exists
exports.checkIngredientExist = (req, res, next) => {
  const foodItem = req.body;
  const foodItemName = foodItem.name.trim().toLowerCase();
  Ingredient.findOneAndUpdate({
    name: foodItemName
  }, { name: foodItemName },
  {
    upsert: true, 
    new: true
  })
  .then(doc => {
    console.log("new Ingredient", doc );
    req.body.ingredientID = doc._id;
    next();
  })
    .catch(next);
}

// a middleware to check to see if foodItem with expiry already exists, if so update quantity or make new foodItem 
exports.checkByExpiry = ( req, res ) => {
  const ingredientID = req.body.ingredientID;
  let expiry = req.body.expiry;
  if (typeof(expiry) === "string" && expiry.length === 0) { expiry = null; }
  FoodItem.findOneAndUpdate({
    ingredient: ingredientID,
    expiry: expiry
  }, 
  {
    expiry: req.body.expiry, 
    portions: req.body.portions, 
    $inc: { quantity: req.body.quantity }, 
    ingredient: req.body.ingredientID
  }, 
  {
    upsert: true,
    new: true
  })
  .then((doc) => {
    console.log("foodItem: ", doc);
    res.status(200).send(doc);
    doc.save();
  })
    .catch((err) => { 
      res.status(500).send(err);
    })
}

exports.deleteFood = (req, res) => {
  const foodItemId = req.params.id;
  FoodItem.remove({ _id: foodItemId }).then((doc) => {
    res.status(200).send(doc);
  })
    .catch((err) => {
      res.status(400).send(err);
    })
}