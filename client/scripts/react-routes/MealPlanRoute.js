import React from "react";
import { Route } from "react-router-dom";
import MealPlanForm from "../components/MealPlanForm";
import MealPlanList from "../components/MealPlanList";

const MealPlanRoute = (props) => {
  return (
    <Route { ...props } render={() => (
      <div>
        <MealPlanForm mealPlan={props.weekMealPlan}
          recipes={props.recipes}
          fetchMealPlan={props.fetchMealPlan}
          postMealPlan={props.postMealPlan}
        />
        <MealPlanList mealPlan={props.weekMealPlan} />
      </div>
    )}
    />

  )
}

export default MealPlanRoute;