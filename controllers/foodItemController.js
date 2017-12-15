const mongoose = require("mongoose");
const FoodItem = require("../models/FoodItemModel");
const Ingredient = require("../models/IngredientModel");

exports.getFoods = (req, res) => {
  const userID = req.user._id;
  // TODO: If no FoodItems for current user, send 204 status
  FoodItem.find({ user: userID }).populate('ingredient').then((docs) => {
    res.status(200).send(docs);
  })
    .catch((err) => {
      res.status(400).send(err);
    })
}

exports.postFoods = (req, res) => {
  // post foodItem once checkIngredientExists middleware determines if Ingredient exists
  console.log("postfoods", req.body);
  const userID = mongoose.Types.ObjectId(req.user._id);
  const foodItem = new FoodItem({ expiry: req.body.expiry, quantity: req.body.quantity, portions: req.body.portions, ingredient: req.body.ingredientID, user: userID });
  foodItem.save()
    .then((doc) => {
      res.status(200).send(doc);
    })
    .catch((err) => {
      res.status(500).send(err);
    })
}

// Add middleware to check the for an Ingredient name for the FoodItem being posted exists
exports.checkIngredientExist = (req, res, next) => {
  const foodItem = req.body;
  const foodItemName = foodItem.name.trim().toLowerCase();
  // will create a new ingredient with the name of req.body.name if does not already exist
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
  const userID = mongoose.Types.ObjectId(req.user._id);
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
    ingredient: req.body.ingredientID, 
    user: userID
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