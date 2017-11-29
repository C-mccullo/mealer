import React from "react";
import InventoryList from "./InventoryList";

const IngredientModal = (props) => {
  const isModalOpen = props.isModalOpen;

  function close(e) {
    e.preventDefault();
    if (props.onClose) {
      props.closeModal();
    }
  }

  function toggleIngredient(item) {
    const recipeIngredients = props.recipeIngredients;
    if (recipeIngredients.includes(item)) {
      props.removeIngredient(item);
    } else {
      props.addIngredient(item);
    }
  }

  function ingredientClass(item) {
    if (props.recipeIngredients.includes(item)) {
      return "ingredient ingredient-selected";
    }
    return "ingredient";
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
                      <div key={`recipe-${item._id}`}
                        onClick={() => toggleIngredient(item)}
                        className={ ingredientClass(item) }>
                        {item.name}
                      </div>
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

export default IngredientModal;