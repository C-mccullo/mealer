import React, { Component } from "react";
import moment from "moment";
import DatePicker from "react-datepicker";
import { Switch } from "react-router-dom";

// Routes
import HomeRoute from "./react-routes/HomeRoute";
import LoginRoute from "./react-routes/LoginRoute";
import SignUpRoute from "./react-routes/SignUpRoute";
import AddIngredientRoute from "./react-routes/AddIngredientRoute";
import AddRecipeRoute from "./react-routes/AddRecipeRoute";
import MealPlanRoute from "./react-routes/MealPlanRoute";

// Components
import HeaderWithRouter from "./components/Header";
import Footer from "./components/Footer";
import InventoryList from "./components/InventoryList";
import AddFoodForm from "./components/AddFoodForm";
import AddRecipeForm from "./components/AddRecipeForm";
import RecipeList from "./components/RecipeList";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredientList: [
        // name: 
      ],
      inventory: [
        // name: String
        // quantity: Number
      ],
      recipes: [
        // name: String,
        // ingredients: [{ ingredient, portionSize }]
      ],
      weekMealPlan: {
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: []
      },
      users: [
        // Has Many Users
      ],
      currentUser: {
        // name: String
        // email: String
        // inventoryId: ID 
        // mealPlanId : ID
        // recipes: []
      },
      loggedIn: false
    }
    this.getMe = this.getMe.bind(this);
    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.fetchIngredients = this.fetchIngredients.bind(this);
    this.fetchFoods = this.fetchFoods.bind(this);
    this.deleteFood = this.deleteFood.bind(this);
    this.fetchRecipes = this.fetchRecipes.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
    this.fetchMealPlan = this.fetchMealPlan.bind(this);
  }

  appLoad() {
    // need to make a function with a callback to 
    // fetch state info after user has loggedIn Successfully
  }


  componentDidMount() {
    this.getMe();
    this.fetchIngredients();
    this.fetchFoods();
    this.fetchRecipes();
    this.fetchMealPlan();
  }

  getMe() {
    fetch("/api/getme", {
      method: "GET",
      credentials: "include"
    })
      .then((res) => res.json())
      .then((user) => {
        if (user._id) {
          console.log("gotchu: ", user);
          this.setState({ currentUser: user, loggedIn: true });
        }
      })
  };

  signup(newUser) {
    console.log(newUser);
    fetch("/api/signup", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser)
    })
      .then((res) => res.json())
      .then((user) => {
        if (user._id) {
          this.setState({ 
            currentUser: json, 
            loggedIn: true 
          });
        } else {
          alert(user.message);
        }
      })
    // history.push("/inventory");
  };

  login(user) {
    fetch("/api/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then(res => {
        if (res.status !== 401) {
          return res.json();
        } else {                        
          return console.error("Unauthorized");
        }
      })
      .then(json => {
        this.setState({ currentUser: json, loggedIn: true });        
      })
    // history.push("/inventory");
  };

  logout(history) {
    fetch("/api/logout", {
      method: "GET",
      credentials: "include",
    })
    this.setState({ currentUser: null, loggedIn: false});
    // history.push("/");
  };

  fetchIngredients() {
    fetch("/api/ingredientList")
      .then(res => res.json())
      .then(json => this.setState({ ingredientList: json }))
  };

  fetchFoods() {
    fetch("/api/foods")
      .then(res => res.json())
      .then(json => this.setState({ inventory: json }))
  };

  deleteFood(id) {
    // TODO: if food is deleted but is still in active recipes ingredients
    // do not delete from inventory, set to "need to buy"
    fetch(`/api/foods/${id}`, {
      method: "DELETE",
    })
      .then(() => this.fetchFoods());
  };

  fetchRecipes() {
    fetch("/api/recipes")
      .then(res => res.json())
      .then(json => this.setState({ recipes: json }))
  };

  deleteRecipe(id) {
    // If recipe is deleted but is still being used during the week, 
    // send alert that recipe is still in use
    fetch(`/api/recipes/${id}`, {
      method: "DELETE",
    })
      .then(() => this.fetchRecipes());
  };

  fetchMealPlan() {
    fetch("/api/mealPlan")
      .then(res => res.json())
      .then(json => { 
        this.setState({ weekMealPlan: json });
      })
  };

  postMealPlan(day, recipeList) {
    fetch(`/api/mealPlan/${day}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(recipeList)
    })
      .then(()=> this.fetchMealPlan());
  };

  render() {
    return(
      <div className="main">
        <HeaderWithRouter history={ this.props.history } login={ this.login } 
          logout={ this.logout } loggedIn={ this.state.loggedIn }
        />
        <div className="mainContainer">
          <Switch>
            <HomeRoute exact path="/" loggedIn={ this.state.loggedIn } logout={ this.logout } />
            
            <LoginRoute exact path="/login" login={ this.login } inventory={ this.state.inventory } />

            <SignUpRoute exact path="/signup" signup={ this.signup }/>

            <AddIngredientRoute exact path="/inventory" inventory={ this.state.inventory }
              fetchFoods={ this.fetchFoods } fetchIngredients={ this.fetchIngredients }
              deleteFood={ this.deleteFood } 
            />

            <AddRecipeRoute path="/recipes" ingredientList={ this.state.ingredientList }
              fetchIngredients={ this.fetchIngredients } fetchRecipes={ this.fetchRecipes } fetchFoods={ this.fetchFoods } recipes={ this.state.recipes } 
              deleteRecipe={ this.deleteRecipe }
            />

            <MealPlanRoute path="/mealplanner" inventory={this.state.inventory} 
              recipes={this.state.recipes}
              weekMealPlan={ this.state.weekMealPlan }
              fetchMealPlan={ this.fetchMealPlan }
              postMealPlan={ this.postMealPlan } 
            />
          </Switch>
        </div>
        <Footer/>
      </div>
    )
  }
}

export default Main;