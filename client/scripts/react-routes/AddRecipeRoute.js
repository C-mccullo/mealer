import React from "react";
import { Route } from "react-router-dom";
import AddRecipeForm from "../components/AddRecipeForm";
import RecipeList from "../components/RecipeList";

// 👉 NOT IN USE YET
const AddRecipeRoute = (props) => {
  return (
    <Route { ...props } render={() => (
      <div>
        <AddRecipeForm ingredientList={props.ingredientList} 
          fetchRecipes={props.fetchRecipes} fetchFoods={props.fetchFoods} 
          fetchIngredients={props.fetchIngredients}
        />
        <RecipeList deleteRecipe={props.deleteRecipe} recipes={props.recipes} />
      </div>
    )}
    />

  )
}

export default AddRecipeRoute;