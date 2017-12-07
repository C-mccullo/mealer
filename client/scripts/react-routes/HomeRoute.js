
import React from "react";
import { Route } from "react-router-dom";
import Login from "../components/Login";
import MealerSVG from "../svgs/rice";

const HomeRoute = (props) => {
  return (
    <Route { ...props } render={() => (
      <div className="homeContainer">
        <div className="home">
          <MealerSVG className="homeImage"/> 
          <h1 className="homeHeader">Welcome to Mealer!</h1>
          <h3 className="homeSubHeader">keep track of all your food and make meal plans quickly ;)</h3>
        </div>
        { props.loggedIn ? (
          <div className="homeButtonsContainer">
            <button className="button-blue">Go to your inventory</button>
            <button className="button-red">Log Out</button> 
          </div> 
        ) : (
          <div className="homeButtonsContainer">
            <button className="button-blue">Log In</button>
            <button className="button-green">Sign Up</button>  
          </div>
        )}
      </div>
    )}/>
  )
}

export default HomeRoute