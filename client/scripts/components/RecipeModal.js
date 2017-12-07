import React from "react";
import InventoryList from "./InventoryList";
import RecipeIncrementer from "./RecipeIncrementer";

const RecipeModal = (props) => {
  const isModalOpen = props.isModalOpen;

  function close(e) {
    e.preventDefault();
    if (props.onClose) {
      props.closeModal();
    }
  }

  return (
    <div>
      {
      isModalOpen ? (
        <div className="modal-container">
          <div className="modal-backDrop" onClick={ props.closeModal }></div>
          <div className="modal">
            <button className="modal-close" onClick={ props.closeModal }>X</button>
            <header className="modal-header">
              <h2>Ingredient List</h2>
            </header>
            <div className="modal-inner">
              <div className="ingredientList">
                {
                  props.ingredientList.map((item) => {
                    return (
                      <RecipeIncrementer key={`recipe-${item._id}`} 
                        recipeIngredients={ props.recipeIngredients }
                        item={item}
                        removeIngredient={ props.removeIngredient }
                        addIngredient={ props.addIngredient }
                        incrementPortion={ props.incrementPortion }
                        decrementPortion={ props.decrementPortion }
                      />
                    )
                  })
                }
              </div>
            </div>
          </div>
        </div>
      ) : ( null )
      }
    </div>
  )
}

export default RecipeModal;