const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const IngredientSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    lowercase: true,
    required: "Please enter a name for your food items"
  }
});

IngredientSchema.index({
  name: "text",
});

// ***** expiry and portions will eventually be moved to FoodItem

module.exports = mongoose.model("Ingredient", IngredientSchema);