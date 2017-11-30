const mongoose = require("mongoose");
const Ingredient = require("../models/IngredientModel");


exports.getIngredients = (req, res) => {
  Ingredient.find().then((docs) => {
    res.status(200).send(docs);
  })
    .catch((err) => {
      res.status(400).send(err);
    })
}

exports.searchIngredients = (req, res) => {
  const ingredient = req.query.ingredient;
  const RegExpIngredient = new RegExp(`(?=${ingredient}*)+\\w+`, "gi");
  console.log(RegExpIngredient);
  Ingredient.find({
    name: {
      $regex: RegExpIngredient,
      $options: "gi"
    }
  })
  .then((docs) => {
    res.status(200).send(docs);
  })
    .catch((err) => {
      res.status(400).send(err);
    })
}

exports.postIngredient = (req, res) => {
  // post foodItems, if Ingredient with name is not found, create a new ingredient then add the ingredientID.
  // const IngredientModel = new Ingredient();
  // const ingredient = Object.assign(IngredientModel, req.body);
  // ingredient.save()
  //   .then((doc) => {
  //     res.status(200).send(doc);
  //   })
  //   .catch((err) => {
  //     res.status(500).send(err);
  //   });
}

// add Middleware to check ingredient being posted

exports.deleteIngredient = (req, res) => {
  const foodId = req.params.id;
  Ingredient.remove({ _id: foodId }).then((doc) => {
    res.status(200).send(doc);
  })
    .catch((err) => {
      res.status(400).send(err);
    })
}
