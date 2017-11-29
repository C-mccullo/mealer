const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const MealPlanSchema = new mongoose.Schema({
  user: String,
  monday: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recipe"
  }],
  tuesday: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recipe"
  }],
  wednesday: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recipe"
  }],
  thursday: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recipe"
  }],
  friday: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recipe"
  }],
  saturday: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recipe"
  }],
  sunday: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recipe"
  }]
});

module.exports = mongoose.model("MealPlan", MealPlanSchema);