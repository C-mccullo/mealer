import React from "react";
import moment from "moment";

// 👇 or should it live outside? 
function formatUnix(expiry) {
  const date = moment.unix(expiry).format("MM/DD/YYYY");
  return date
}

const InventoryItem = (props) => {
  if (props.item.quantity > 0) {
    return (
      <div className="inventoryItem" key={`recipe-${props.item._id}`}>
        <div className="inventoryItem-header">
          <h3 className="inventoryItem-name">{props.item.ingredient.name}</h3>
          <span className="inventoryItem-quantity">{props.item.quantity}</span>
        </div>
        <p className="inventoryItem-expiry"> { props.item.expiry ? "Expires: " + props.item.expiry : "" }</p>
        <span className="deleteItem" onClick={() => props.deleteFood(props.item._id)}> X </span>
      </div>
    )
  } else if (props.item.quantity === 0) {
    return (
      <div className="inventoryItem inventoryItem-used" key={`recipe-${props.item._id}`}>
        <span className="inventoryItem-banner">items in use</span>
        <div className="inventoryItem-header inventoryItem-header-used">
          <h3 className="inventoryItem-name">{props.item.ingredient.name}</h3>
          <span className="inventoryItem-quantity">{props.item.quantity}</span>
        </div>
        <p className="inventoryItem-expiry"> {props.item.expiry ? "Expires: " + props.item.expiry : ""}</p>
        {/* TODO: find out if it makes sense for delete option to be removed for items in use */}
        <span className="deleteItem" onClick={() => props.deleteFood(props.item._id)}> X </span>
      </div>
    )
  } else if (props.item.quantity < 0) {
    return (
      <div className="inventoryItem inventoryItem-toBuy" key={`recipe-${props.item._id}`}>
        <span className="inventoryItem-banner">you need to buy</span>
        <div className="inventoryItem-header inventoryItem-header-toBuy">
          <h3 className="inventoryItem-name">{props.item.ingredient.name}</h3>
          <span className="inventoryItem-quantity">{props.item.quantity}</span>
        </div>
        <p className="inventoryItem-expiry"> {props.item.expiry ? "Expires: " + props.item.expiry : ""}</p>
      </div>
    )
  }
}

export default InventoryItem;