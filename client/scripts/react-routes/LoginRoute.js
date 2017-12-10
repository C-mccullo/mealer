import React from "react";
import { Route } from "react-router-dom";
import Login from "../components/Login";


const LoginRoute = (props) => {
  return (
    <Route { ...props } render={() => (
      <div>
        <Login login={ props.login }/>
      </div>
    )}
    />
  )
}

export default LoginRoute