import React, { Component } from "react";
import { Link } from "react-router-dom";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import DatePicker from "react-datepicker";
import moment from "moment";

class AddFoodForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name: "",
        quantity: "",
        portions:  "",
        pickerExpiry: moment(),
        expiry: null,
        isLoading: false,
        options: []
    }
    this.baseState = this.state; // preserve InitialState
    this.searchIngredients = this.searchIngredients.bind(this);
    this.addToNameState = this.addToNameState.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleExpiry = this.handleExpiry.bind(this);
    this.postFoodItem = this.postFoodItem.bind(this);
    this.postNewIngredient = this.postNewIngredient.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  componentDidMount() {
    document.querySelector("#react-container").classList.add("modalOpen");
  }

  componentWillUnmount() {
    document.querySelector("#react-container").classList.remove("modalOpen");
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

  addToNameState(name) {
    console.log(name);
    this.setState({ name: name });
    this.searchIngredients(name);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleExpiry(date) {
    // const formattedDate = moment(date).unix();
    const formattedDate = moment(date).format("MMM Do, YY");
    this.setState({
      expiry: formattedDate,
      pickerExpiry: date
    });
  }

  resetForm() {
    this.setState(this.baseState)
  }
  // if name is not present in the options, than need to make different request to add ingredient
  postNewIngredient() {
    console.log("will post new ingredient");
  }

  postFoodItem() {
    const foodItem = Object.assign({}, this.state);
    delete foodItem.pickerExpiry;
    delete foodItem.options;
    delete foodItem.isLoading;
    console.log(foodItem);
    fetch("/api/foods", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(foodItem),
      headers: {
        "Content-type": "application/json",
      }
    })
      .then(() => this.props.fetchIngredients())
      .then(() => this.props.fetchFoods())
      .then(() => this.resetForm())
  }

  handleSubmit(e) {
    e.preventDefault();
    this.postFoodItem();
  }

  render() {
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <Link role="button" to="/inventory" className="form-close" >X</Link>
        <div className="form-row">
          <h2>Add food to your inventory</h2>
          <label className="form-label" htmlFor="ingredient">Ingredient</label>
          <AsyncTypeahead className="form-input" labelKey={ option => `${option.name}` }
            inputProps={{name: "ingredient" , required: true}} 
            placeholder="Enter Ingredient Name"
            options={ this.state.options } 
            bsSize="lg"
            isLoading={ this.state.isLoading } 
            onSearch={ (query) => this.searchIngredients(query) }
            onInputChange={ (e) => this.addToNameState(e) }
          />
          <label className="form-label" htmlFor="quantity">Quantity</label>
          <input className="form-input" onChange={this.handleChange} name="quantity" required type="number" min="1" placeholder="Enter the quantity" value={this.state.quantity} />
          <label className="form-label" htmlFor="portions">Portions Per Item</label>
          <input className="form-input" onChange={this.handleChange} name="portions" required type="number" min="1" placeholder="Enter the portion size for your food" value={this.state.portions} />
        </div>
        <div className="form-row">
          <label className="form-label" htmlFor="expiry">Expiry Date (optional)</label>
          <DatePicker className="form-input" name="expiry" 
            onChange={ (value) => this.handleExpiry(value)} 
            value={this.state.expiry}
            placeholderText="add an expiry date"
          />
        </div>
        <div className="form-row">
          <button className="button-blue">Add Food Item</button>
        </div>
      </form>
    )
  }
}

export default AddFoodForm;