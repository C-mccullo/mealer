import React, { Component } from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import DatePicker from "react-datepicker";
import moment from "moment";

class AddFoodForm extends Component {
  constructor(props) {
    super(props);
    // This will eventually be split into 2 different forms: One to add new Ingredient to Ingredients Collection and one to add FoodItem to existing Ingredient.
    this.state = {
        name: "",
        quantity: "",
        portions:  "",
        pickerExpiry: moment(),
        expiry: "",
        isLoading: false,
        options: []
    }
    this.baseState = this.state; // preserve InitialState
    this.searchIngredients = this.searchIngredients.bind(this);
    this.addToNameState = this.addToNameState.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleExpiry = this.handleExpiry.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  searchIngredients(query) {
    this.setState({ isLoading: true });
    fetch(`/api/search/ingredientList?ingredient=${query}`)
      .then(res => res.json())
      .then(json => { 
        this.setState({ options: json, isLoading: false }); 
        console.log(this.state.options);
      })
  }

  addToNameState(e) {
    console.log(e);
    this.setState({ name: e });
    this.searchIngredients(e);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleExpiry(date) {
    const formattedDate = moment(date).unix();
    this.setState({
      expiry: formattedDate,
      pickerExpiry: date
    });
  }

  resetForm() {
    this.setState(this.baseState)
  }
  // if name is not present in the options, than need to make different request to add ingredient
  handleSubmit(e) {
    e.preventDefault();
    const foodItem = Object.assign({}, this.state);
    delete foodItem.pickerExpiry;
    // console.log("body for post: ", foodItem);
    fetch("/api/foods", {
      method: "POST",
      body: JSON.stringify(foodItem),
      headers: {
        "Content-type": "application/json",
      }
    })
    .then(() => this.props.fetchFoods())
    .then(()=> this.resetForm())
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-row">
          <h2>Add food to your inventory</h2>
          <AsyncTypeahead labelKey={ option => `${option.name}` } 
            options={ this.state.options } 
            isLoading={ this.state.isLoading } 
            onSearch={ (query) => this.searchIngredients(query) }
            onInputChange={ (e) => this.addToNameState(e) }
          />
          {/* <input onChange={this.handleChange} name="name" required type="text" placeholder="Enter Food Name" value={this.state.name} /> */}
          <input onChange={this.handleChange} name="quantity" required type="number" min="1" placeholder="Enter the quantity" value={this.state.quantity} />
          <input onChange={this.handleChange} name="portions" required type="number" min="1" placeholder="Enter the portion size for your food" value={this.state.portions} />
        </div>
        <div className="form-row">
          <DatePicker selected={this.state.pickerExpiry} onChange={this.handleExpiry} />
        </div>
        <div className="form-row">
          <button>Add Food Item</button>
        </div>
      </form>
    )
  }
}

export default AddFoodForm;