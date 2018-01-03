import React from "react";
import RecipeListIngredient from "./RecipeListIngredient";


const RecipeList = (props) => {
  return (
    <div className="recipeList">
      {
        props.recipes.map((recipe, i) => {
          return (
            <div className="recipe" key={`recipe-${recipe._id}`}>
              <div className="recipeItem-header">
                <h3>{recipe.name}</h3>
              </div>
              <ul>
                {
                  recipe.ingredients.map((ingredient, index) => {
                    return <RecipeListIngredient key={ingredient._id} ingredient={ingredient}/>
                  }) 
                }
              </ul>
              <span className="deleteRecipe" role="button" onClick={ () => props.deleteRecipe(recipe._id) }>Delete Recipe</span>
            </div>
          )
        })
      }
    </div>
  )
}

export default RecipeList