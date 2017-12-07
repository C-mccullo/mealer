import React from "react";

// Needs toggleIngredient, ingredientClass
const RecipeIncrementer = (props) => {
  // 👇 INVESTIGATE WHY includes() did not work
  const recipeIngredients = props.recipeIngredients;
  const item = props.item;

  function toggleIngredient(item) {
    const ingredient = Object.assign({}, item);
    ingredient.portionSize = 1;

    if (recipeIngredients.filter(e => e._id === ingredient._id).length > 0) {
      props.removeIngredient(ingredient);
    } else {
      props.addIngredient(ingredient);
    }
  }

  function ingredientClass(ingredient) {
    if (props.recipeIngredients.filter(e => e._id === ingredient._id).length > 0) {
      return "ingredient ingredient-selected";
    }
    return "ingredient";
  }

  function portionCount(id) {
    const ingredient = props.recipeIngredients.filter(e => e._id === id)
    const portion = ingredient[0] ? ingredient[0].portionSize : 0
    return portion
  }

  return(
    <div>
      <label htmlFor={ `ingredient-${item._id}` }
        onClick={ () => toggleIngredient(item) }
        className={ ingredientClass(item) }>
        {props.item.name}
      </label>
      <div className="recipeIncrementer">
        {/* <input name={ `ingredient-${item._id}` } type="number" min="0" step="1" /> */}
        <button className="recipeIncrementer-button" 
          onClick={ (e) => props.decrementPortion(e, item._id) }
        >-</button>
        <div className="recipeIncrementer-counter">
          { portionCount(item._id) }
        </div>
        <button className="recipeIncrementer-button"
          onClick={(e) => props.incrementPortion(e, item._id) }
        >+</button>
      </div>
    </div>
  )
}

export default RecipeIncrementer;