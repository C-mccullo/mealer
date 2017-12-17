const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const FoodItemSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  ingredient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ingredient"
  },
  expiry: { 
    type: String,
    default: null,
  },
  quantity: {
    type: Number,
    default: 1,
    required: [true, "Please add a quantity for your food items"]
  },
  portions: {
    type: Number,
    default: 1,
    required: [true, "Please add portion sizes for your food items" ]  
  }
});

// Will need to remove indexes before moving to production for performance
FoodItemSchema.index({
  expiry: 1,
  ingredient: 1,
  user: 1
});

// ***** expiry and portions will eventually be moved to FoodItem

module.exports = mongoose.model("FoodItem", FoodItemSchema);