import React, { Component } from "react";

class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.login(user);
  }

  handleChange(e) {
    console.log(e.target.value);
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    return (
      <div className="login">
          <form className="form" onSubmit={this.handleSubmit}>
            <div className="form-row">
              <h1>Log In</h1>
              {/* <label htmlFor="name">User Name:</label>
              <input name="name" className="loginModal-input" type="text" required
                onChange={this.handleChange} /> */}
              <label className="form-label" htmlFor="email">User Email:</label>
              <input name="email" className="form-input" type="email" required
                onChange={this.handleChange} />
              <label className="form-label" htmlFor="password">Password:</label>
              <input name="password" className="form-input" type="password" required
                onChange={this.handleChange} />
              <input className="button button-blue" type="submit" value="Submit" />
            </div>
          </form>
      </div>
    )
  }
}

export default LoginModal;