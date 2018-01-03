import React from "react";

const RecipeListIngredient = (props) => {
  return (
    <li className="recipeIngredient"> 
      <span className="recipeIngredient-name">{props.ingredient.ingredient.name}</span>
      <span className="recipeIngredient-portion">{props.ingredient.portionSize}</span>
    </li>
  )
}

export default RecipeListIngredient;