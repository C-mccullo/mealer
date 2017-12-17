import React from "react";
import { Route, Redirect, Link } from "react-router-dom";
// import AddRecipeFormTypeAhead from "../components/AddRecipeFormTypeAhead";
import AddRecipeForm from "../components/AddRecipeForm";
import RecipeList from "../components/RecipeList";

const AddRecipeRoute = (props) => {
  return (
    <Route { ...props } render={() => (
      props.isLoggedIn ? (
        <div>
          <Link className="addFormLink" to="/recipes/addrecipe">Make a New Recipe</Link>
          {/* <AddRecipeForm ingredientList={props.ingredientList}
            fetchRecipes={props.fetchRecipes} fetchFoods={props.fetchFoods}
            fetchIngredients={props.fetchIngredients}
          /> */}
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