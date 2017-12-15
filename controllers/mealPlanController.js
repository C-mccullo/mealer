
const mongoose = require("mongoose");
const _ = require("lodash");

const MealPlan = require("../models/MealPlanModel");
const Recipe = require("../models/RecipesModel");
const FoodItem = require("../models/FoodItemModel");

exports.newUserMealPlan = (req, res, next) => {
  console.log("new User MealPlan: ", req.user);
  const userID = mongoose.Types.ObjectId(req.user._id); 
  const mealPlanModel = new MealPlan();
  const mealPlan = Object.assign(mealPlanModel, {
    user: userID,
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: []
  })
  mealPlan.save()
    .then(()=> {
      next();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
}

exports.getMealPlan = (req, res) => {
  const userID = req.user._id;
  console.log("meal Controller; ", userID);
  // excluding _id, __v and user from the response object
  MealPlan.findOne({user: userID }, {_id: 0, __v: 0, user: 0})
    .populate("monday tuesday wednesday thursday friday saturday sunday")
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).send(doc);        
      } else {
        res.status(200).send({});
      }
    })
    .catch((err) => {
      res.status(400).send(err);
    })
}
// will need to remove recipes from meal plan and restore foodItems quantities
exports.restoreUnusedFoodItems = (req, res, next) => {
  const day = req.params.day;
  const userID = req.user._id;
  let mealPlanRecipes;
  MealPlan.findOne({ user: userID })
    .then((doc)=> {
      const recipes = doc[day]
      const recipeIds = recipes.map(id => {
        return mongoose.Types.ObjectId(id)
      })
      console.log("restore recipeIds: ", recipeIds)
      // then find the recipes used on that day and get recipes ingredients
      Recipe.find({
        _id: {
          $in: recipeIds
        }
      })
      .then((docs) => {
        console.log("recipes found: ", docs);
        const ingredients = _.flatten(docs.map((doc) => {
          return doc.ingredients.map((i) => {
            const ingredient = { id: i.ingredient, portionSize: i.portionSize };
            return ingredient;
          })
        }))
        console.log("restore ingredients: ", ingredients);
        function restoreItem(i) {
          return new Promise((resolve, reject) => {
            FoodItem.findOneAndUpdate({
              ingredient: i.id
            }, {
                $inc: {
                  quantity: +i.portionSize
                }
              }).then(() => resolve("updated item :)"))
              .catch(() => reject("issue with updating item :("))
          })
        }
        let updateAll = [];
        // then with array of ingredients add back the portionSizes used in the recipe
        ingredients.forEach((i) => {
          updateAll.push(restoreItem(i));
        })
        // wait until all the food items used in the recipes have been updated
        Promise.all(updateAll)
          .then(() => console.log("foodItems have been restored!"))
          // trigger next to then move on and update the "meal plan" document
          .then(() => next())
      })
    })
      .catch(err=> { 
        console.log(err);
        res.status(500).send({message: "user mealplan not found"}) 
      })
}

exports.updateMealPlan = (req, res, next) => {
  const day = req.params.day;
  const meals = req.body;
  const userID = req.user._id;
  const mealArray = meals.map((meal) => {
    return meal._id;
  });

  MealPlan.findOne({user: userID}).then((doc) => {
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
  const userID = mongoose.Types.ObjectId(req.user._id);
  const day = req.params.day;
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
      return doc.ingredients.map(i => {
        const ingredient = { id: i.ingredient, portionSize: i.portionSize };
        // flattenedArray.push(ingredient);
        return ingredient;
      })
    }))

    // function to update the foodItems used the recipes or insert if non already exists
    function updateItem(i) {
      return new Promise((resolve, reject) => {
        FoodItem.findOneAndUpdate({
          ingredient: i.id,
          user: userID
        }, {
          $set: { ingredient: i.id, user: userID, expiry: null },
          $inc: {
            quantity: -i.portionSize
          }
        },
        {
          upsert: true
        }
      ).then(()=> resolve("updated item :)"))
          .catch(()=> reject("issue with updating item :("))
      })
    }

    let updateAll = []
    ingredients.forEach((i) => {
      updateAll.push(updateItem(i));
    })
    // wait until all the food items used in the recipes have been updated
    Promise.all(updateAll)
      .then(()=> console.log("they're all saved!"))
      // trigger next to then move on and update the "meal plan" document
      .then(()=> next())
  })
}
