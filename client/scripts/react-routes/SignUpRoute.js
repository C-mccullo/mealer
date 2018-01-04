import React, { Component } from "react";
import { Route } from "react-router-dom";
import SignUp from "../components/SignUp";

const SignUpRoute = (props) => {
  
  return (
    <Route { ...props } render={() => (
      <div>
        <SignUp signup={props.signup} />
      </div>
    )}
    />
  )
}

export default SignUpRoute