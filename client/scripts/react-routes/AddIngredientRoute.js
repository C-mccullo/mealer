import React from "react";
import { Route } from "react-router-dom";
import AddFoodForm from "../components/AddFoodForm";
import InventoryList from "../components/InventoryList";
import FilterBar from "../components/FilterBar";
// 👉 NOT IN USE YET
const AddIngredientRoute = (props) => {
  return (
    <Route { ...props } render={ () => (
      <div>
        {/* ADD TYPEAHEAD */}
        <FilterBar/>       
        <AddFoodForm fetchFoods={ props.fetchFoods } 
          fetchIngredients={ props.fetchIngredients }
        />
        <InventoryList inventory={ props.inventory } deleteFood ={ props.deleteFood } fetchFoods={ props.fetchFoods } fetchIngredients={ props.fetchIngredients }/>
      </div>
    )} 
    />

  )
}

export default AddIngredientRoute;