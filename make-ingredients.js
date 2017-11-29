const mongoose = require('mongoose');
const Ingredient = require('./models/IngredientModel');

mongoose.connect('mongodb://localhost/meal-planner');

const foods = [
  {
    name: "Tomatoes"
  },
  {
    name: "Milk"
  },
  {
    name: "Pasta"
  },
  {
    name: "Thai Chicken Soup"
  },
  {
    name: "Sprouted Grain Bread"
  },
  {
    name: "Orange Juice"
  },
  {
    name: "Alfredo Sauce"
  },
  {
    name: "Eggs"
  },
  {
    name: "Mushrooms"
  },
  {
    name: "Parmesan cheese"
  },
  {
    name: "Chocolate Coconut Muffins"
  },
  {
    name: "Bananas"
  },
  {
    name: "gravy mix"
  },
  {
    name: "ground beef"
  },
  {
    name: "red peppers"
  },
  {
    name: "spinach"
  }
]

// Drop any existing data inside of the movies table
Ingredient.remove({}, () => {
  console.log('All foods removed');
});

foods.forEach((food) => {
  const model = new Ingredient();
  Object.assign(model, food);
  model.save((err, doc) => {
    if (err) {
      console.log(err);
    }
    console.log(doc);
  });
  return;
});