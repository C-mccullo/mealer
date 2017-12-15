import React from "react";
import { Route, Redirect } from "react-router-dom";
import AddRecipeForm from "../components/AddRecipeForm";
import RecipeList from "../components/RecipeList";

const AddRecipeRoute = (props) => {
  return (
    <Route { ...props } render={() => (
      props.isLoggedIn ? (
        <div>
          <AddRecipeForm ingredientList={props.ingredientList} 
            fetchRecipes={props.fetchRecipes} fetchFoods={props.fetchFoods} 
            fetchIngredients={props.fetchIngredients}
          />
          <RecipeList deleteRecipe={props.deleteRecipe} recipes={props.recipes} />
        </div>
      ) : (
          <Redirect to={{ pathname: '/login' }} />
      )
    )}
    />

  )
}

export default AddRecipeRoute;