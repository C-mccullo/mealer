import React from "react";

const LoginModal = (props) => {
  return (
    <div className="login">
      <div className="loginModal">
        <h1>Welcome to Mealer!</h1>
        <h3>keep track of all your food and make meal plans quickly ;)</h3>
        <form className="loginModal-form" action="">
          <label htmlFor="email">User Email:</label>
          <input className="loginModal-input" type="email"/>
          <label htmlFor="password">User Password:</label>
          <input className="loginModal-input" type="password"/>
          <input className="loginModal-submit" type="submit" value="Submit"/>
        </form>
      </div>
    </div>
  )
}

export default LoginModal;