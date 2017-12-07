import React from "react";
import { Route } from "react-router-dom";

const SignUpRoute = (props) => {
  return (
    <Route { ...props } render={() => (
      <div>
        <div className="login">
          <div className="loginModal">
            <h2>Sign Up</h2>
            <form className="loginModal-form" action="">
              <label htmlFor="email">User Email:</label>
              <input className="loginModal-input" type="email" />
              <label htmlFor="password">User Password:</label>
              <input className="loginModal-input" type="password" />
              <input className="loginModal-submit" type="submit" value="Submit" />
            </form>
          </div>
        </div>
      </div>
    )}/>
  )
}

export default SignUpRoute