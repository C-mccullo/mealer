import React, { Component } from "react";
import RecipeModal from "./RecipeModal";

class MealPlanForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentSelectValue: "",
      recipeArray: [],
      isModalOpen: false
    }
    this.baseState = this.state;
    this.resetForm = this.resetForm.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.mapRecipes = this.mapRecipes.bind(this);
    this.addRecipe = this.addRecipe.bind(this);
    this.removeRecipe = this.removeRecipe.bind(this);
    this.changeDaySelected = this.changeDaySelected.bind(this);
    this.submitMeal = this.submitMeal.bind(this);
  }

  resetForm() {
    this.setState(this.baseState);
  }

  openModal() {
    this.setState({ isModalOpen: true })
  }

  closeModal() {
    this.setState({ isModalOpen: false })
  }

  mapRecipes() {
    // Map over the selected recipes and add them to the form view
    return (
      this.state.recipeArray.map((recipe) => <li key={`meal-${recipe._id}`}>{recipe.name}</li>)
    );
  }

  addRecipe(recipe) {
    // then add the recipe to the corresponding day
    const mealPlan = this.state.recipeArray.concat(recipe);
    this.setState({ recipeArray: mealPlan });
  }

  removeRecipe(recipe) {
    const recipeArray = this.state.recipeArray;
    let newRecipeList = [];
    if (recipe) {
      newRecipeList = recipeArray.filter(item => {
        return item._id !== recipe._id
      });
    }
    this.setState({ recipeArray: newRecipeList });
    console.log(newRecipeList);
  }

  changeDaySelected(e) {
    // const prevState = this.state.currentSelectValue;
    // console.log(prevState);
    const day = e.target.value;
    this.setState({ currentSelectValue: e.target.value });
    const currentPlan = this.props.mealPlan[day]
    // maybe take the "meal plan" props and populate the recipeArray with the corresponding meals from that day that day has meals.
  }

  submitMeal(e) {
    e.preventDefault();
    const day = this.state.currentSelectValue;
    const recipeArray = this.state.recipeArray;
    if ( day !== "" || recipeArray.length !== 0 ) {
      this.props.postMealPlan(day, recipeArray);
      this.resetForm();
    } // TODO: ensure you handle error to tell user to update fields
  }

  render() {
    return (
      <div>
        <form onSubmit={e => this.submitMeal(e)}>
          <h2>MealPlanForm</h2>
          <select name="day" value={ this.state.currentSelectValue } onChange={ e => this.changeDaySelected(e) }>
            <option value="" defaultValue disabled hidden>Choose a day</option>
            <option value="monday">Monday</option>
            <option value="tuesday">Tuesday</option>
            <option value="wednesday">Wednesday</option>
            <option value="thursday">Thursday</option>
            <option value="friday">Friday</option>
            <option value="saturday">Saturday</option>
            <option value="sunday">Sunday</option>
          </select>
          <ul className="recipe-Ingredients">
            {this.state.recipeArray ? this.mapRecipes() : null}
          </ul>
          <RecipeModal isModalOpen={ this.state.isModalOpen } 
            closeModal={this.closeModal} 
            recipes={ this.props.recipes }
            recipeArray = { this.state.recipeArray } 
            addRecipe={ this.addRecipe }
            removeRecipe={ this.removeRecipe }
          />
          <button type="button" onClick={ this.openModal }>Add Recipes</button>
          <button type="submit">Add to Meal Plan</button>
        </form>
      </div>
    )
  }
}

export default MealPlanForm;

