import React, { Component } from "react";
import { Button, Form, Divider } from "semantic-ui-react";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      account: {
        email: "",
        password: ""
      }
    };
  }

  updateAccount(event) {
    let updated = Object.assign({}, this.state.account);
    updated[event.target.id] = event.target.value;
    this.setState({
      account: updated
    });
  }

  login(event) {
    event.preventDefault();
    this.props.onLogin(this.state.account);
  }

  render() {
    return (
      <Form>
        <h3>Login</h3>
        <Form.Field>
          <label>Email</label>
          <input
            type="text"
            placeholder="Email"
            onChange={this.updateAccount.bind(this)}
            id="email"
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            onChange={this.updateAccount.bind(this)}
            id="password"
          />
        </Form.Field>
        <Button onClick={this.login.bind(this)}>Login</Button>
      </Form>
    );
  }
}

export default Login;
