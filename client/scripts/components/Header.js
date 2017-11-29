import React from "react";
import { NavLink, withRouter } from "react-router-dom"; 
const Header = (props) => {
  if (props.loggedIn) {
    return (
      <header className="header">
        <nav className="navBar">
          <h2 className="app-logo">Mealer</h2>
          <ul className="navBar-list">
            <li className="navBar-link">
              <NavLink to="/inventory" activeClassName="activeLink">Inventory</NavLink>
            </li>
            <li className="navBar-link">
              <NavLink to="/mealPlanner" activeClassName="activeLink">Meal Planner</NavLink>
            </li>
            <li className="navBar-link">
              <NavLink to="/recipes" activeClassName="activeLink">Add a Recipe</NavLink>
            </li>
          </ul>
          <ul className="navBar-list navBar-list_right">
            <li className="navBar-link">
              <a role="button" className="navBar-logout"
                onClick={() => props.logout(props.history)}
              >Log Out</a>
            </li>
          </ul>
        </nav>
      </header>
    )
  } else {
    return (
      <header className="header">
        <nav className="navBar">
          <h2 className="app-logo">Mealer</h2>
          <ul className="navBar-list navBar-list_right">
            <li className="navBar-link">
              <a role="button" className="navBar-login" 
                onClick={ ()=> props.login(props.history) }
                >Log In</a>
            </li>
            <li className="navBar-link">
              <a role="button" className="navBar-logout" 
              onClick={ ()=> props.login(props.history) }
              >Sign up</a>
            </li>
          </ul>
        </nav>
      </header>
    )
  }
}

export default withRouter(Header);