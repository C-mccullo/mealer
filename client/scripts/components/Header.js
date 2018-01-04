import React from "react";
import { Link, NavLink, withRouter } from "react-router-dom"; 
const Header = (props) => {
  if (props.loggedIn) {
    return (
      <header className="header">
        <nav className="navBar">
          <Link to="/">
            <h2 className="app-logo">Mealer</h2>
          </Link>
          <ul className="navBar-list">
            <li className="navBar-link">
              <NavLink to="/inventory" activeClassName="activeLink">Inventory</NavLink>
            </li>
            <li className="navBar-link">
              <NavLink to="/mealplanner" activeClassName="activeLink">Meal Planner</NavLink>
            </li>
            <li className="navBar-link">
              <NavLink to="/recipes" activeClassName="activeLink">Recipes</NavLink>
            </li>
          </ul>
          <ul className="navBar-list navBar-list_right">
            <li className="navBar-link">
              <span>Welcome, {props.currentUser.name}</span>
            </li>
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
          <Link to="/">
            <h2 className="app-logo">Mealer</h2>
          </Link>
          <ul className="navBar-list navBar-list_right">
            <li className="navBar-link">
              <NavLink className="navBar-login" to="/login">Log In</NavLink>
            </li>
            <li className="navBar-link">
              <NavLink className="navBar-signup" to="/signup">Signup</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    )
  }
}

export default withRouter(Header);