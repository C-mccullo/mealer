import React, { Component } from "react";
import IngredientModal from "./IngredientModal";


class AddRecipeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      ingredients: [],
      daysUsed: ["monday", "wednesday"],
      isModalOpen: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.addIngredient = this.addIngredient.bind(this);
    this.removeIngredient = this.removeIngredient.bind(this);
    this.mapIngredients = this.mapIngredients.bind(this);
    this.packageRecipe = this.packageRecipe.bind(this);
    this.postRecipe = this.postRecipe.bind(this);
    this.submitRecipe = this.submitRecipe.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  resetForm() {
    this.setState({
      name: "",
      ingredients: [],
      daysUsed: [],
      isModalOpen: false
    })
  }

  openModal(e) {
    e.preventDefault();
    this.setState({ isModalOpen: true })
  }
  
  closeModal() {
    this.setState({ isModalOpen: false })
  }

  addIngredient(ingredient) {
    const recipeIngredients = this.state.ingredients;
    if (ingredient) {
      recipeIngredients.push(ingredient)
    }
    this.setState({ ingredients: recipeIngredients });
  }

  removeIngredient(ingredient) {
    const ingredients = this.state.ingredients;
    let newIngredientList = []
    if (ingredient) {
      newIngredientList = ingredients.filter(item => { 
        return item._id !== ingredient._id 
      });
    }
    this.setState({ ingredients: newIngredientList });
  }

  mapIngredients() {
    console.log("AddRecipeForm state: ", this.state.ingredients)
    return (
      this.state.ingredients.map((ingredient) => {
        return <li key={`ingredient-${ingredient._id}`}>{ingredient.name}</li>
      })
    );
  }
  // function used in submitRecipe
  packageRecipe(recipe) {
    const { name, ingredients, daysUsed } = recipe // this.state
    const ingredientIDs = ingredients.map((ingredient) => {
      return ingredient._id
    });
    const RecipeModel = {
      name: name,
      ingredients: ingredientIDs,
      daysUsed: daysUsed
    }
    return RecipeModel;
  }
  // function used in submitRecipe
  postRecipe(model) {
    console.log(model);
    fetch("/api/recipes", {
      method: "POST",
      body: JSON.stringify(model),
      headers: {
        "Content-type": "application/json",
      }
    })
    .then(() => this.props.fetchRecipes())
    .then(() => this.resetForm())
    this.resetForm();
  }

  submitRecipe(e) {
    e.preventDefault();
    const recipe = this.state;
    const model = this.packageRecipe(recipe);
    this.postRecipe(model);
  }

  render() {
    console.log("rendering add recipe form");
    return (
      // Should this be a form?
      <form onSubmit={ e => this.submitRecipe(e) }>
        <h2>Recipe Form</h2>
        <div className="form-row">
          <input onChange={this.handleChange} name="name" required type="text" placeholder="Enter Recipe Name" value={this.state.name} />
          <ul className="recipe-Ingredients">
            { this.state.ingredients ? this.mapIngredients() : null }
          </ul>
          <IngredientModal 
            isModalOpen={ this.state.isModalOpen } 
            closeModal={ this.closeModal } 
            ingredientList={ this.props.ingredientList }
            recipeIngredients={ this.state.ingredients } 
            addIngredient={ this.addIngredient }
            removeIngredient={ this.removeIngredient }
          />
          <button type="button" onClick={ e => this.openModal(e) }>Add Ingredients</button>
        </div>
        <div className="form-row">
          <button type="submit">Finish Recipe</button>
        </div>
      </form>
    )
  }
}

export default AddRecipeForm;
