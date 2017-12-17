import React from "react";
import { Route, Redirect } from "react-router-dom";
import AddRecipeFormTypeAhead from "../components/AddRecipeFormTypeAhead";
import RecipeList from "../components/RecipeList";

const AddRecipeFormRoute = (props) => {
  return (
    <Route { ...props } render={() => (
      props.isLoggedIn ? (
        <div>
          <div className="paleBackground-wrapper">
            <AddRecipeFormTypeAhead ingredientList={props.ingredientList}
              fetchRecipes={props.fetchRecipes} fetchFoods={props.fetchFoods}
              fetchIngredients={props.fetchIngredients}
            />
          </div>
          <RecipeList deleteRecipe={props.deleteRecipe} recipes={props.recipes} />
        </div>
      ) : (
        <Redirect to={{ pathname: '/login' }} />
      )
    )}
    />

  )
}

export default AddRecipeFormRoute;