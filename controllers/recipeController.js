const mongoose = require("mongoose");
const Recipe = require("../models/RecipesModel");

exports.getRecipes = (req, res) => {
  const userID = mongoose.Types.ObjectId(req.user._id);
  Recipe.find({user: userID}).populate("ingredients.ingredient").exec().then((docs) => {
    res.status(200).send(docs);
  })
    .catch((err) => {
      res.status(400).send(err);
    })
}

exports.postRecipe = (req, res) => {
  console.log("post recipe: ", req.user);
  const user = mongoose.Types.ObjectId(req.user._id);
  const name = req.body.name.toLowerCase();
  const ingredients = req.body.ingredients;
  const formatIngredients = ingredients.map((ingredient) => {
    const ingredientModel = { 
      ingredient: ingredient._id, 
      portionSize: ingredient.portionSize 
    }
    return ingredientModel
  })

  const recipeModel = new Recipe();
  const recipe = Object.assign(recipeModel, { 
    user: user, 
    name: name, 
    ingredients:formatIngredients 
  });
  // console.log(recipe);
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