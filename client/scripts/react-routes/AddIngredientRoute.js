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
        <AddFoodForm fetchFoods={ props.fetchFoods }/>
        <InventoryList inventory={ props.inventory } fetchFoods={ props.fetchFoods }/>
      </div>
    )} 
    />

  )
}

export default AddIngredientRoute;