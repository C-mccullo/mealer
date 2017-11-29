const mongoose = require("mongoose");
const MealPlan = require("../models/MealPlanModel");

exports.getMealPlan = (req, res) => {
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

exports.updateMealPlan = (req, res) => {
  const day = req.params.day;
  const meals = req.body;
  const mealArray = meals.map((meal) => {
    return meal._id;
  });
  MealPlan.findOne({user: "Me"}).then((doc) => {
    doc[day] = mealArray;
    doc.save().then((saved) => {
      // console.log(saved);
      res.status(200).send(saved)
    })
      .catch((err) => {
        res.status(500).send(err);
      })
  })
    .catch((err) => {
      res.status(400).send(err);
    })
}