import React from "react";
import InventoryList from "./InventoryList";
// import IngredientModalList from "./IngredientModalList";

const MealPlanModal = (props) => {
  const isModalOpen = props.isModalOpen;

  function close(e) {
    e.preventDefault();
    if (props.onClose) {
      props.closeModal();
    }
  }

  function toggleRecipe(recipe) {
    const recipeArray = props.recipeArray;
    if (recipeArray.includes(recipe)) {
      console.log("remove this recipe: ", recipe);
      props.removeRecipe(recipe);
    } else {
      props.addRecipe(recipe);
    }
  }

  function recipeClass(recipe) {
    if (props.recipeArray.includes(recipe)) {
      return "ingredient ingredient-selected";
    }
    return "ingredient";
  }

  return (
    <div>
      {
        isModalOpen ? (
          <div className="modal-container">
            <div className="paleBackground-wrapper" onClick={props.closeModal}></div>
            <div className="modal">
              <div className="modal-close" onClick={props.closeModal}>X</div>
              <header className="modal-header">
                <h2>Recipe List</h2>
              </header>
              <div className="modal-inner">
                <ul className="ingredientList">
                  {
                    props.recipes.map((recipe) => {
                      return (
                        <li key={`recipe-${recipe._id}`}
                          onClick={() => toggleRecipe(recipe)}
                          className={recipeClass(recipe)}>
                          {recipe.name}
                        </li>
                      )
                    })
                  }
                </ul>
              </div>
            </div>
          </div>
        ) : (null)
      }
    </div>
  )
}

export default MealPlanModal;