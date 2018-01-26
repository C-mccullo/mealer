import React, { Component } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";

class MealPlanForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allUserRecipes: [],
      recipeArray: [],
      dropDownOpen: false
    }
    this.resetForm = this.resetForm.bind(this);
    this.mapRecipes = this.mapRecipes.bind(this);
    this.mapRecipesArray = this.mapRecipesArray.bind(this);
    this.submitMeal = this.submitMeal.bind(this);

    this.updateRecipeArray = this.updateRecipeArray.bind(this);
  }

  componentWillMount() {
    const allUserRecipes = this.props.recipes.map(userRecipe => {
      return {
        label: userRecipe.name,
        value: userRecipe
      }
    });

    const recipeArray = this.props.prevRecipes.map(recipe => {
      return {
        label: recipe.name,
        value: recipe
      }
    });
    console.log(recipeArray, allUserRecipes);
    this.setState({ recipeArray, allUserRecipes });
  }

  // componentWillReceiveProps() {
  //   const allUserRecipes = this.props.recipes.map(userRecipe => {
  //     return {
  //       label: userRecipe.name,
  //       value: userRecipe
  //     }
  //   });

  //   const recipeArray = this.props.prevRecipes.map(recipe => {
  //     return {
  //       label: recipe.name,
  //       value: recipe
  //     }
  //   });
  //   console.log("in componentWillReceiveProps", recipeArray, allUserRecipes);
  //   this.setState({ recipeArray, allUserRecipes });
  // }

  updateRecipeArray(selection) {
    console.log("recipe array from multi-select", selection);
    this.setState({ recipeArray: selection });
  }

  resetForm() {
    this.setState({
      allUserRecipes: [],
      recipeArray: [],
      dropDownOpen: false
    });
  }

  mapRecipes() {
    const usedRecipeIDs = this.state.recipeArray.map(usedRecipe => {
      return usedRecipe._id;
    })
    return this.props.recipes.map((recipe) => {
      if (!usedRecipeIDs.includes(recipe._id)) {
        return (
          <li key={recipe._id}
            onClick={() => this.toggleRecipe(recipe)}
            className="ingredient">
            {recipe.name}
          </li>
        )
      } else {
        return (
          <li key={recipe._id}
            onClick={() => this.toggleRecipe(recipe)}
            className="ingredient ingredient-selected">
            {recipe.name}
          </li>
        )
      }
    })
  }

  mapRecipesArray() {
    // Map over the selected recipes and add them to the form view
    if (this.state.recipeArray.length) {
      return (
        this.state.recipeArray.map((recipe) => { 
          return ( 
            <li key={`meal-${recipe._id}`}>{recipe.name}</li>
          )
        })
      )
    } 
    return
  }

  // SUBMITS THE MEAL PLAN FOR CERTAIN DAY TO BACKEND
  submitMeal(e) {
    e.preventDefault();
    const day = this.props.day;
    const recipeArray = this.state.recipeArray;
    if ( day !== "" || recipeArray.length !== 0 ) {
      const formattedArray = recipeArray.map(recipe => {
        console.log(recipe.value);
        return recipe.value
      });
      console.log("formattedArray", formattedArray);
      this.props.postMealPlan(day, formattedArray);
      // this.resetForm();
    } // TODO: ensure you handle error to tell user to update fields
  }

  render() {
    return (
      <div>
        <form className="form" onSubmit={e => this.submitMeal(e)}>
          <Link role="button" to="/mealplanner" className="form-close" >X</Link>
          <div className="form-row">
            <h2>MealPlanForm</h2>
            <h3>Add Recipes for { this.props.day }</h3>
            <Select name="recipe-name"
              multi={ true }
              placeholder="Add premade recipes to meal plan" 
              clearable={ false }
              closeOnSelect={ false }
              onChange={ this.updateRecipeArray }
              value={ this.state.recipeArray }
              options={ this.state.allUserRecipes }
            />
          </div>
          <div className="form-row">
            <button className="button button-green" type="submit">Add to Meal Plan</button>
          </div>
        </form>
      </div>
    )
  }
}

export default MealPlanForm;

