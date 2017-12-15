const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const RecipeIngredient = new mongoose.Schema({
  ingredient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ingredient",
    required: true,
  },
  portionSize: {
    type: Number,
    required: true
  }
})

const RecipeSchema = new mongoose.Schema({
  name: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  ingredients: [RecipeIngredient]
});


RecipeSchema.index({
  user: 1
});

module.exports = mongoose.model("Recipe", RecipeSchema);
