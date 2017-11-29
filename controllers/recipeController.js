const mongoose = require("mongoose");
const Recipe = require("../models/RecipesModel");

exports.getRecipes = (req, res) => {
  Recipe.find().populate("ingredients").exec().then((docs) => {
    res.status(200).send(docs);
  })
    .catch((err) => {
      res.status(400).send(err);
    })
}

exports.postRecipe = (req, res) => {
  const recipeModel = new Recipe();
  const recipe = Object.assign(recipeModel, req.body);
  recipe.save()
    .then((doc) => {
      res.status(200).send(doc);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
}

exports.deleteRecipe = (req, res) => {
  const recipeId = req.params.id;
  Recipe.remove({ _id: recipeId }).then((doc) => {
    res.status(200).send(doc);
  })
    .catch((err) => {
      res.status(400).send(err);
    })
}