import React from "react";
import { Route, Redirect } from "react-router-dom";
import MealPlanForm from "../components/MealPlanForm";
import MealPlanList from "../components/MealPlanList";

const MealPlanFormRoute = (props) => {
  return (
    <Route { ...props } render={() => (
      props.isLoggedIn ? (
        <div>
          <MealPlanForm day={props.computedMatch.params.day} 
            mealPlan={props.weekMealPlan}
            recipes={props.recipes}
            prevRecipes={props.weekMealPlan[props.computedMatch.params.day]}
            fetchMealPlan={props.fetchMealPlan}
            postMealPlan={props.postMealPlan} />
        </div>
      ) : (
          <Redirect to={{ pathname: '/login' }} />
        )
    )}
    />

  )
}

export default MealPlanFormRoute;