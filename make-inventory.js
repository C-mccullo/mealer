const moment = require("moment");
// DON'T USE!!
const mongoose = require('mongoose');
const Ingredient = require('./models/IngredientModel');
const FoodItem = require('./models/FoodItemModel');

mongoose.connect('mongodb://localhost/meal-planner');

async function removeDocs() {
  await Ingredient.remove({}, () => {
    console.log('All foods removed');
  });
  await FoodItem.remove({}, () => {
    console.log("All food Items removed");
  });
}

const ingredients = {
  milk: new Ingredient({ name: "Milk" }),
  tomatoes: new Ingredient({ name: "Tomatoes" }),
  pasta: new Ingredient({ name: "Pasta" }),
  thaiChickenSoup: new Ingredient({ name: "Thai Chicken Soup" }),
  sproutedGrainBread: new Ingredient({ name: "Sprouted Grain Bread" }),
  orangeJuice: new Ingredient({ name: "OrangeJuice" }),
  alfredoSauce: new Ingredient({ name: "Alfredo Sauce" }),
  eggs: new Ingredient({ name: "Eggs" }),
  mushrooms: new Ingredient({ name: "Mushrooms" }),
  parmesean: new Ingredient({ name: "Parmesean Cheese" }),
  chocoMuffin: new Ingredient({ name: "Chocolate Coconunt Muffins" }),
  bannanas: new Ingredient({ name: "Bannanas" }),
  gravy: new Ingredient({ name: "Gravy Mix" }),
  onions: new Ingredient({ name: "Onions" }),
  beef: new Ingredient({ name: "Ground Beef" }),
  peppers: new Ingredient({ name: "Red Peppers" }),
  spinach: new Ingredient({ name: "Spinach" })
}

async function populateIngredients() {
  await Object.values(ingredients).forEach(i => i.save());
}

const foods = [
  {
    ingredient: ingredients.tomatoes._id,
    quantity: 5,
    portions: 2,
    expiry: moment.unix(1514773072).format("MMM Do, YYYY")
  },
  {
    ingredient: ingredients.milk._id,
    quantity: 1,
    portions: 10,
    expiry: moment.unix(1514773072).format("MMM Do, YYYY")
  },
  {
    ingredient: ingredients.pasta._id,
    quantity: 3,
    portions: 6,
    expiry: null
  },
  {
    ingredient: ingredients.thaiChickenSoup._id,
    quantity: 1,
    portions: 1,
    expiry: null
  },
  {
    ingredient: ingredients.sproutedGrainBread._id,
    quantity: 1,
    portions: 12,
    expiry: moment.unix(1514773072).format("MMM Do, YYYY")
  },
  {
    ingredient: ingredients.orangeJuice._id,
    quantity: 1,
    portions: 10,
    expiry: moment.unix(1514773072).format("MMM Do, YYYY")
  },
  {
    ingredient: ingredients.chocoMuffin._id,
    quantity: 1,
    portions: 4,
    expiry: moment.unix(1514773072).format("MMM Do, YYYY")
  },
  {
    ingredient: ingredients.parmesean._id,
    quantity: 1,
    portions: 12,
    expiry: moment.unix(1514773072).format("MMM Do, YYYY")
  },
  {
    ingredient: ingredients.gravy._id,
    quantity: 1,
    portions: 3,
    expiry: moment.unix(1514773072).format("MMM Do, YYYY")
  },
  {
    ingredient: ingredients.spinach._id,
    quantity: 1,
    portions: 8,
    expiry: moment.unix(1514773072).format("MMM Do, YYYY")
  },
  {
    ingredient: ingredients.peppers._id,
    quantity: 1,
    portions: 4,
    expiry: moment.unix(1514773072).format("MMM Do, YYYY")
  },
  {
    ingredient: ingredients.tomatoes._id,
    quantity: 4,
    portions: 1,
    expiry: moment.unix(1514773072).format("MMM Do, YYYY")
  },
  {
    ingredient: ingredients.bannanas._id,
    expiry: null,
    portions: 3,
    quantity: 1
  },
  {
    ingredient: ingredients.beef._id,
    portions: 2,
    quantity: 1,
    expiry: moment.unix(1511849221).format("MMM Do, YYYY")
  }
]

function populateFoodItems() {
  foods.forEach((food) => {
    const model = new FoodItem();
    Object.assign(model, food);
    model.save((err, doc) => {
      if (err) {
        console.log(err);
      }
      console.log("foodItem: ", doc);
    });
    return;
  });
}

removeDocs()
  .then(()=> populateIngredients())
  .then(()=> populateFoodItems())
