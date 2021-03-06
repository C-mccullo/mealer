import React from "react";
import { Route, Redirect, Link } from "react-router-dom";
import AddFoodForm from "../components/AddFoodForm";
import InventoryList from "../components/InventoryList";
import FilterBar from "../components/FilterBar";
// 👉 NOT IN USE YET
const AddIngredientRoute = (props) => {
  return (
    <Route { ...props } render={ () => (
      props.isLoggedIn ? (
        <div>
          {/* ADD TYPEAHEAD */}
          <Link className="addFormLink" to="/inventory/addfood">Add Foods</Link>  
          {/* <AddFoodForm fetchFoods={ props.fetchFoods } 
            fetchIngredients={ props.fetchIngredients }
          /> */}
          <InventoryList inventory={ props.inventory } deleteFood ={ props.deleteFood } fetchFoods={ props.fetchFoods } fetchIngredients={ props.fetchIngredients }/>
        </div>
      ) : (
        <Redirect to={{ pathname: '/login' }} />
      )
    )} 
    />

  )
}

export default AddIngredientRoute;