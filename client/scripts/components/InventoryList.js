import React from "react";
import InventoryItem from "./InventoryItem";


const InventoryList = (props) => {
  
  // add a onClick handler to Inventory Item
  // make a function that checks if has "select" function prop
  // then run function onClick
  return (
    <div className="inventoryList">
      { props.inventory ? (
        props.inventory.map((item) => {
          return (
            <InventoryItem key={item._id} item={item} deleteFood={ props.deleteFood }/>
          )
        })
      ) : (
        null
      )
      }
    </div>
  )
}

export default InventoryList;