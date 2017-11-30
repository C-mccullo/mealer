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
  ingredients: [RecipeIngredient]
});

// RecipeSchema.pre("save", AddIngredients);

module.exports = mongoose.model("Recipe", RecipeSchema);

// for the recipe model this will take all the ingredients and populate the doc with the ingredients 👇
// Recipe.find().populate('ingredients').exec()
// .then()

// Before the save of MealPlan document 👇
// MealPlanSchema.pre('save', function(done) {
//   this.recipes.forEach(r => {
//     r.ingredients.each(i => {
//       i.quantity_available -= 1;
//       i.save();
//     })
//   })
// });