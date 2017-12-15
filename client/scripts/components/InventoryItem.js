import React from "react";
import moment from "moment";

// 👇 or should it live outside? 
function formatUnix(expiry) {
  const date = moment.unix(expiry).format("MM/DD/YYYY");
  return date
}

const InventoryItem = (props) => {
  // TODO: structure and style Inventory Item to be different when negative quantity or when expired
  return (
    <div className="inventoryItem" key={`recipe-${props.item._id}`}>
      <h3 className="inventoryItem-name">{props.item.ingredient.name}</h3>
      <p className="inventoryItem-expiry"> { props.item.expiry ? "Expires: " + props.item.expiry : "" }</p>
      <span>{ props.item.quantity }</span>
      <span className="deleteItem" onClick={() => props.deleteFood(props.item._id)}> X </span>
    </div>
  )
}

export default InventoryItem;