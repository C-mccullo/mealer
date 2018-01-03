import React, { Component } from "react";
import RecipeModal from "./RecipeModal";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { Link } from "react-router-dom";

class AddRecipeFormTypeAhead extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      ingredients: [],
      isModalOpen: false,
      isLoading: false,
      options: []
    }
    this.searchIngredients = this.searchIngredients.bind(this);
    this.addIngredientToState = this.addIngredientToState.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.addIngredient = this.addIngredient.bind(this);
    this.removeIngredient = this.removeIngredient.bind(this);
    this.incrementPortion = this.incrementPortion.bind(this);
    this.decrementPortion = this.decrementPortion.bind(this);
    this.mapIngredients = this.mapIngredients.bind(this);
    this.packageRecipe = this.packageRecipe.bind(this);
    this.postRecipe = this.postRecipe.bind(this);
    this.submitRecipe = this.submitRecipe.bind(this);
    this.incrementPortion = this.incrementPortion.bind(this);
    this.decrementPortion = this.decrementPortion.bind(this);
    this.portionCount = this.portionCount.bind(this);
  }

  searchIngredients(query) {
    this.setState({ isLoading: true });
    fetch(`/api/search/ingredientList?ingredient=${query}`)
      .then(res => res.json())
      .then(json => {
        this.setState({ options: json, isLoading: false });
        // console.log(this.state.options);
      })
  }

  componentDidMount() {
    document.querySelector("#react-container").classList.add("modalOpen");
  }

  componentWillUnmount() {
    document.querySelector("#react-container").classList.remove("modalOpen");
  }

  addIngredientToState(name) {
    if (name.length) {
      const ingredient = Object.assign({}, name[0]);
      ingredient["portionSize"] = 1;
      console.log("ingredientWithPortion ", ingredient);
      const ingredientsArray = Object.assign([], this.state.ingredients);
      ingredientsArray.push(ingredient);
      this.setState({ingredients: ingredientsArray});
      this.refs.asyncTypeAhead.getInstance().clear();
    } else {
      return
    }
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

  incrementPortion(e, id) {
    e.preventDefault();
    // check ingredient State for ingredient with id, then add 1 to portionSize
    const ingredientArray = this.state.ingredients;
    const ingredientList = ingredientArray.map((item) => {
      if (item._id === id) {
        const updateItem = Object.assign({}, item);
        updateItem["portionSize"] += 1;
        return updateItem;
      }
      return item
    })
    this.setState({ ingredients: ingredientList });
  }

  decrementPortion(e, id) {
    e.preventDefault();
    // check ingredient State for ingredient with id, then add 1 to portionSize
    const ingredientArray = this.state.ingredients;
    const ingredientList = ingredientArray.map((item) => {
      if (item._id === id) {
        const updateItem = Object.assign({}, item);
        updateItem["portionSize"] -= 1;
        return updateItem;
      }
      return item
    })
    this.setState({ ingredients: ingredientList });
  }

  portionCount(id) {
    const ingredient = this.state.ingredients.filter(e => e._id === id)
    const portion = ingredient[0] ? ingredient[0].portionSize : 0
    return portion
  }

  mapIngredients() {
    // console.log("AddRecipeForm state: ", this.state.ingredients)
    return (
      this.state.ingredients.map((item) => {
        return (
          <div className="ingredient" key={`ingredient-${item._id}`}>
            <label htmlFor={`ingredient-${item._id}`}
              onClick={() => toggleIngredient(item)}
              className="">
              {item.name}
            </label>
            <div className="recipeIncrementer">
              {/* <input name={ `ingredient-${item._id}` } type="number" min="0" step="1" /> */}
              <button className="recipeIncrementer-button"
                onClick={(e) => this.decrementPortion(e, item._id)}
              >-</button>
              <div className="recipeIncrementer-counter">
                { this.portionCount(item._id) }
              </div>
              <button className="recipeIncrementer-button"
                onClick={(e) => this.incrementPortion(e, item._id)}
              >+</button>
            </div>
          </div>
        )
      })
    );
  }

  // function used in submitRecipe
  packageRecipe(recipe) {
    const { name, ingredients } = recipe //this.state
    const RecipeModel = {
      name: name,
      ingredients: ingredients,
    }
    return RecipeModel;
  }
  // function used in submitRecipe
  postRecipe(model) {
    fetch("/api/recipes", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(model),
      headers: {
        "Content-type": "application/json",
      }
    })
      // .then(() => this.props.fetchIngredients())
      .then(() => this.props.fetchRecipes())
      .then(() => this.resetForm())
    this.resetForm();
  }

  submitRecipe(e) {
    e.preventDefault();
    const recipe = this.state;
    const model = this.packageRecipe(recipe);
    console.log(model);
    this.postRecipe(model);
  }

  render() {
    return (
      // Should this be a form?
      <form className="form" onSubmit={e => this.submitRecipe(e)}>
        <Link role="button" to="/recipes" className="form-close" >X</Link>
        <div className="form-row">
          <h2>Make a New Recipe</h2>
          <label className="form-label" htmlFor="name">Recipe Name: </label>
          <input className="form-input" onChange={this.handleChange} name="name" required type="text" placeholder="Enter Recipe Name" value={this.state.name} />

          <label className="form-label" htmlFor="ingredient">Add Ingredients</label>
          <AsyncTypeahead className="form-input" labelKey={option => `${option.name}`}
            inputProps={{ name: "ingredient" }}
            placeholder="Enter an ingredients name"
            ref="asyncTypeAhead"
            bsSize="large"
            options={this.state.options}
            isLoading={this.state.isLoading}
            onSearch={(query) => this.searchIngredients(query)}
            onChange={(e) => this.addIngredientToState(e)}
          />

          <ul className="recipe-Ingredients">
            {this.state.ingredients ? this.mapIngredients().reverse() : null}
          </ul>
          <button className="button-blue" type="button" onClick={e => this.openModal(e)}>Add Ingredients</button>
        </div>
        <div className="form-row">
          <button className="button-green" type="submit">Finish Recipe</button>
        </div>
      </form>
    )
  }
}

export default AddRecipeFormTypeAhead;
