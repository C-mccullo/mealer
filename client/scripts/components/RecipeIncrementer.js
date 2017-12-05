import React from "react";

// Needs toggleIngredient, ingredientClass
const RecipeIncrementer = (props) => {
  // 👇 INVESTIGATE WHY includes() did not work
  const recipeIngredients = props.recipeIngredients;
  const item = props.item;

  function toggleIngredient(item) {
    const ingredient = Object.assign({}, item);
    ingredient.portionSize = 1;
    console.log(recipeIngredients);

    if (recipeIngredients.filter(e => e._id == ingredient._id).length > 0) {
      console.log("recipeList includes: ", ingredient);
      props.removeIngredient(ingredient);
    } else {
      console.log("recipeList doesn't include", ingredient);
      props.addIngredient(ingredient);
    }
  }

  function ingredientClass(ingredient) {
    if (props.recipeIngredients.filter(e => e._id == ingredient._id).length > 0) {
      return "ingredient ingredient-selected";
    }
    return "ingredient";
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
        <button className="recipeIncrementer-button">-</button>
        <div className="recipeIncrementer-counter">portion</div>
        <button className="recipeIncrementer-button">+</button>
      </div>
    </div>
  )
}

export default RecipeIncrementer;