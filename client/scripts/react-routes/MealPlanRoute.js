import React from "react";
import { Route, Redirect } from "react-router-dom";
import MealPlanForm from "../components/MealPlanForm";
import MealPlanList from "../components/MealPlanList";

const MealPlanRoute = (props) => {
  return (
    <Route { ...props } render={() => (
      props.isLoggedIn ? (
        <div>
          <MealPlanList mealPlan={props.weekMealPlan} />
        </div>
      ) : (
          <Redirect to={{ pathname: '/login' }} />
      )
    )}
    />

  )
}

export default MealPlanRoute;