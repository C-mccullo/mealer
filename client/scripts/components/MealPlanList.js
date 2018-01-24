import React from "react";
import { Link } from "react-router-dom";

const MealPlanList = (props) => {
  const mealPlan = props.mealPlan
  return(
    <div className="mealPlanList">
      { Object.keys(mealPlan).reverse().map((keyName, index) => {
        return (
          <div key={`day-${index}`} className="mealPlanDay">
            <h2>{keyName}</h2>
            <ul>
              { mealPlan[keyName].map((meal) => {
                if (meal) {
                  return (
                    <li key={`${keyName}-${index}-${meal._id}`}>{meal.name}</li>
                  )
                }
              }) 
              }
            </ul>
            <div className="mealPlanList-linkWrapper">
              <Link className="addFormLink-mealPlanList" to={`/mealPlanner/${keyName}`}>Add Recipes</Link>
              {/* <div className="mealListAddition-wrapper clearfix">
                <button className="mealListAddition"></button>
              </div> */}
            </div>
          </div>
        )
      }) }
    </div>
  )
}

export default MealPlanList;