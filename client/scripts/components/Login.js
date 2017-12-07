import React from "react";

const LoginModal = (props) => {
  return (
    <div className="login">
      <div className="loginModal">
        <h2>Log In</h2>
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