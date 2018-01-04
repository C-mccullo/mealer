import React, { Component } from "react";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: ""
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const newUser = Object.assign({}, this.state);
    this.props.signup(newUser);
  }

  handleChange(e) {
    console.log(e.target.value);
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    return (
      <div>
        <div className="login">
          <form className="form" onSubmit={this.handleSubmit}>
            <div className="form-row">
              <h1>Sign Up</h1>
              <label htmlFor="name">User Name:</label>
              <input name="name" className="form-input" type="text" required
                onChange={this.handleChange} />
              <label htmlFor="email">User Email:</label>
              <input name="email" className="form-input" type="email" required
                onChange={this.handleChange} />
              <label htmlFor="password">Password:</label>
              <input name="password" className="form-input" type="password" required
                onChange={this.handleChange} />
              <input className="button button-green" type="submit" value="Submit" />
            </div>
          </form>
        </div>
      </div>
    )
  }
}


export default SignUp