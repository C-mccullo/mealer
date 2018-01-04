import React, { Component } from "react";
import moment from "moment";
import DatePicker from "react-datepicker";
import { Switch, Redirect } from "react-router-dom";

// Routes
import HomeRoute from "./react-routes/HomeRoute";
import LoginRoute from "./react-routes/LoginRoute";
import SignUpRoute from "./react-routes/SignUpRoute";
import AddIngredientRoute from "./react-routes/AddIngredientRoute";
import AddIngredientFormRoute from "./react-routes/AddIngredientFormRoute";
import AddRecipeFormRoute from "./react-routes/AddRecipeFormRoute"
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
      // ingredientList: [],
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
      currentUser: {
        // name: String
        // email: String
        // inventoryId: ID 
        // mealPlanId : ID
        // recipes: []
      },
      loggedIn: false,
      modalOpen: false
    }
   
    this.loadData = this.loadData.bind(this);
    this.getUserDetails = this.getUserDetails.bind(this);
    this.fetchAllUserData = this.fetchAllUserData.bind(this);
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
  
  componentDidMount() {
    this.loadData(this.getUserDetails);
  }

  loadData(fetchUserPromise) {
    // getUser varaible stores the function argument that contains a promise
    const getUser = fetchUserPromise();
    getUser
      .then((res) => {
        if (res.status !== 401) {
          return res.json();
        } else {                        
          throw(new Error("Unauthorized"))
        }
      })
      .then((userData) => {
        const userId = userData._id;
        if (userId) {
          console.log("userData recieved: ", userData);
          // 🔥 output of promise.all is strictly ordered if the input
          // is strictly ordered. Each resolved promise has internal index slot 
          // which marks the index of the promise in the input 🔥
          const fetchArray = this.fetchAllUserData(); 
          // fetchArray order: ingredients, fooditems, recipes, mealPlan
          Promise.all(fetchArray.map(fetchRequest => {
            return fetchRequest.then(res => res.json()).then(json => json);
          }))
          .then(values => {
            console.log("user data: ", userData)
            this.setState({
              currentUser: userData,
              loggedIn: true,
              // ingredients: values[0],
              inventory: values[0],
              recipes: values[1],
              weekMealPlan: values[2]
            })
          })
          .then(() => this.props.history.push("/inventory"))
          
        } else {
          console.error("no valid user received")
        }
      })
        .catch((err) => console.log(err))
  }

  getUserDetails() {
    return fetch("/api/getme", {
      method: "GET",
      credentials: "include"
    });
  }

  fetchAllUserData() {
    // const ingredients = fetch("/api/ingredientList", {
    //   method: "GET",
    //   credentials: "include"
    // });
    const foods = fetch("/api/foods", {
      method: "GET",
      credentials: "include"
    });
    const recipes = fetch("/api/recipes", {
      method: "GET",
      credentials: "include"
    });
    const mealPlan = fetch("/api/mealPlan", {
      method: "GET",
      credentials: "include"
    });
    const allPromises = [ /* ingredients, */ foods, recipes, mealPlan];
    return allPromises;
  }

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
            currentUser: user, 
            loggedIn: true 
          });
          this.login(newUser);
          // this.props.history.push("/inventory");
        } else {
          alert(user.message);
        }
      })
    
  };

  login(user) {
    const fetchLogin = () => {
      return fetch("/api/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
      })
    }
    this.loadData(fetchLogin);
  }

  logout(history) {
    fetch("/api/logout", {
      method: "GET",
      credentials: "include",
    })
    .then(()=> {
      this.setState({ 
        currentUser: null, 
        loggedIn: false,
        ingredients: [], 
        inventory: [],
        recipes: [],
        weekMealPlan: {
          monday: [],
          tuesday: [],
          wednesday: [],
          thursday: [],
          friday: [],
          saturday: [],
          sunday: []
        }
      });
      this.props.history.push("/");
    })
  };

  fetchIngredients() {
    fetch("/api/ingredientList", {
      method: "GET",
      credentials: "include"
    })
      .then(res => res.json())
      .then(json => this.setState({ ingredientList: json }))
  };

  fetchFoods() {
    fetch("/api/foods", {
      method: "GET",
      credentials: "include"
    })
      .then(res => res.json())
      .then(json => this.setState({ inventory: json }))
  };

  deleteFood(id) {
    // TODO: if food is deleted but is still in active recipes ingredients
    // do not delete from inventory, set to "need to buy"
    const confirmed = confirm("are you sure you want to delete this food item?");

    if (confirmed) {
      fetch(`/api/foods/${id}`, {
        method: "DELETE",
        credentials: "include"
      })
        .then(() => this.fetchFoods());
    } else {
      return
    }
  };

  fetchRecipes() {
    fetch("/api/recipes", {
      method: "GET",
      credentials: "include"
    })
      .then(res => res.json())
      .then(json => this.setState({ recipes: json }))
  };

  deleteRecipe(id) {
    // If recipe is deleted but is still being used during the week, 
    // send alert that recipe is still in use
    const confirmed = confirm("are you sure you want to delete this recipe?");

    if (confirmed) {
      fetch(`/api/recipes/${id}`, {
        method: "DELETE",
        credentials: "include"
      })
        .then(() => this.fetchRecipes());
    } else {
      return
    }
  };

  fetchMealPlan() {
    fetch("/api/mealPlan", {
      method: "GET",
      credentials: "include"
    })
      .then(res => res.json())
      .then(json => { 
        this.setState({ weekMealPlan: json });
      })
      .then(() => {
        this.fetchFoods();
      })
  };

  postMealPlan(day, recipeList) {
    fetch(`/api/mealPlan/${day}`, {
      method: "PUT",
      credentials: "include",
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
          currentUser={this.state.currentUser}
        />
        <div className="mainContainer">
          <Switch>
            <HomeRoute exact path="/" loggedIn={ this.state.loggedIn } logout={ this.logout } />
            
            <LoginRoute exact path="/login" login={ this.login } inventory={ this.state.inventory } />

            <SignUpRoute exact path="/signup" signup={ this.signup }/>

            <AddIngredientRoute exact path="/inventory" inventory={ this.state.inventory }
              fetchFoods={ this.fetchFoods } fetchIngredients={ this.fetchIngredients }
              deleteFood={ this.deleteFood } isLoggedIn={ this.state.loggedIn }
            />

            <AddIngredientFormRoute exact path="/inventory/addfood" inventory={this.state.inventory}
              fetchFoods={this.fetchFoods} fetchIngredients={this.fetchIngredients}
              deleteFood={this.deleteFood} isLoggedIn={this.state.loggedIn}
              modalIsOpen={this.modalOpen}
            />

            <AddRecipeFormRoute exact path="/recipes/addrecipe" 
              fetchIngredients={this.fetchIngredients} fetchRecipes={this.fetchRecipes} fetchFoods={this.fetchFoods} recipes={this.state.recipes}
              deleteRecipe={this.deleteRecipe} isLoggedIn={this.state.loggedIn}
              ingredientList={this.state.ingredients}
              modalIsOpen={this.modalOpen}
            />

            <AddRecipeRoute path="/recipes" ingredientList={ this.state.ingredients }
              fetchIngredients={ this.fetchIngredients } fetchRecipes={ this.fetchRecipes } fetchFoods={ this.fetchFoods } recipes={ this.state.recipes } 
              deleteRecipe={ this.deleteRecipe } isLoggedIn={ this.state.loggedIn }
            />

            <MealPlanRoute path="/mealplanner" inventory={this.state.inventory} 
              recipes={this.state.recipes} weekMealPlan={ this.state.weekMealPlan }
              fetchMealPlan={ this.fetchMealPlan } postMealPlan={ this.postMealPlan }
              isLoggedIn={ this.state.loggedIn } 
            />
            <Redirect from='*' to='/' />
          </Switch>
        </div>
        <Footer/>
      </div>
    )
  }
}

export default Main;