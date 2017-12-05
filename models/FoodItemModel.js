const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const FoodItemSchema = new mongoose.Schema({
  ingredient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ingredient"
  },
  expiry: String,
  quantity: {
    type: Number,
    required: "Please add a quantity for your food items"
  },
  portions: {
    type: Number,
    required: "Please add portion sizes for your food items"
  }
});

// Will need to remove indexes before moving to production for performance
FoodItemSchema.index({
  expiry: 1,
  ingredient: 1
});

// ***** expiry and portions will eventually be moved to FoodItem

module.exports = mongoose.model("FoodItem", FoodItemSchema);