const mongoose = require('mongoose');
const MealPlan = require('./models/MealPlanModel');

mongoose.connect('mongodb://localhost/meal-planner');

const mealPlans = [
  {
    user: "Me",
    monday:[],
    tuesday: [],
    wednesday: [],
    thursday:[],
    friday:[],
    saturday: [],
    sunday: []

  }
]

// Drop any existing data inside of the movies table
MealPlan.remove({}, () => {
  console.log('All foods removed');
});

mealPlans.forEach((plan) => {
  const model = new MealPlan();
  Object.assign(model, plan);
  model.save((err, doc) => {
    if (err) {
      console.log(err);
    }
    console.log(doc);
  });
  return;
});