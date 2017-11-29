import React from "react";
import { link } from "fs";

const RecipeList = (props) => {
  return (
    <div className="recipeList">
      {
        props.recipes.map((recipe, i) => {
          return (
            <div className="recipe" key={`recipe-${recipe._id}`}>
              <h3>{recipe.name}</h3>
              <ul>
                {
                  recipe.ingredients.map((ingredient, index) => {
                    return <li key={ingredient._id}> {ingredient.name}</li>
                  }) 
                }
              </ul>
              <span onClick={ () => props.deleteRecipe(recipe._id) }>DELETE RECIPE</span>
            </div>
          )
        })
      }
    </div>
  )
}

export default RecipeList