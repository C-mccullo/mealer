
const mongoose = require("mongoose");
const _ = require("lodash");

const MealPlan = require("../models/MealPlanModel");
const Recipe = require("../models/RecipesModel");
const FoodItem = require("../models/FoodItemModel");

exports.getMealPlan = (req, res) => {
  // excluding _id, __v and user from the response object
  MealPlan.findOne({user: "Me"}, {_id: 0, __v: 0, user: 0})
    .populate("monday tuesday wednesday thursday friday saturday sunday")
    .exec()
    .then((doc) => {
      res.status(200).send(doc);
    })
    .catch((err) => {
      res.status(400).send(err);
    })
}
// will need to remove recipes from meal plan and restore foodItems quantities
exports.removeUnusedMeals = (req, res, next) => {
  res.status(200).send({test: "not set up yet, sorry!"})
}

exports.updateMealPlan = (req, res, next) => {
  const day = req.params.day;
  const meals = req.body;
  const mealArray = meals.map((meal) => {
    return meal._id;
  });

  MealPlan.findOne({user: "Me"}).then((doc) => {
    // adding the _id of the recipes to the key "day" of the document
    doc[day] = mealArray;
    doc.save().then((saved) => {
      // req.mealPlanDay = saved[day]
      console.log("the meal plan has been saved!");
      res.status(200).send(saved)
      next();
    })
      .catch((err) => {
        res.status(500).send(err);
      })
  })
    .catch((err) => {
      res.status(400).send(err);
    })
}

// 👇 This controller should probably be called before the save of the mealPlan document
exports.updateFoodItems = (req, res, next) => {
  const day = req.params.day;
  console.log(day);
  const recipes = req.body;
  const recipeIds = recipes.map(i => { return mongoose.Types.ObjectId(i._id)})
  Recipe.find({
    _id: {
      $in: recipeIds
    }
  })
  .then((docs) => {
    // take the ingredients and portionSizes from those days and 
    // push them into flattened array
    let flattenedArray = []

    // Why is _.flatten returning undefined values?
    const ingredients = _.flatten(docs.map(doc => {
      doc.ingredients.map(i => {
        const ingredient = { id: i.ingredient, portionSize: i.portionSize };
        flattenedArray.push(ingredient);
        return ingredient;
      })
    }))

    // function to update the foodItems used the recipes
    function updateItem(i) {
      return new Promise((resolve, reject) => {
        FoodItem.findOneAndUpdate({
          ingredient: i.id
        }, {
          $inc: {
            quantity: +i.portionSize
          }
        }).then(()=> resolve("updated item :)"))
          .catch(()=> reject("issue with updating item :("))
      })
    }

    let updateAll = []
    flattenedArray.forEach((i) => {
      updateAll.push(updateItem(i));
    })
    // wait until all the food items used in the recipes have been updated
    Promise.all(updateAll)
      .then(()=> console.log("they're all saved!"))
      // trigger next to then move on and update the "meal plan" document
      .then(()=> next())
  })
}

//var ingredientIds = _.flatten(docs.map(d => d.ingredients.map(i => i.ingredient)));
// ingredientIds.forEach(async function() {
//   await Inventory.update()
// })

// R1
//   ingredients:
//     I1 { ingredient: x1 }
//     I2 { ingredient: x2 }

// R2
//   ingredients:
//     I1 { ingredient: x1 }

// [x1, x2, x1]


// R1
//   ingredients:
//     I1 { ingredient: x1 }
//     I2 { ingredient: x2 }

// R2
//   ingredients:
//     I1 { ingredient: x1 }

// [{ ingredient: x1, quantity: 2 }, { ingredient: x2, quantity: 1 }, { ingredient: x1, quantity: 1 }]

// [{ ingredient: x1, quantity: 3 }, { ingredient: x2, quantity: 1 }]

// [x1, x2, x1]
