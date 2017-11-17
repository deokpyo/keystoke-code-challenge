import React, { Component } from "react";
import { Button, Form, Divider } from "semantic-ui-react";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      account: {}
    };
  }

  updateAccount(event) {
    let updated = Object.assign({}, this.state.account);
    updated[event.target.id] = event.target.value;
    this.setState({
      account: updated
    });
  }
  createAccount(event) {
    event.preventDefault();
    this.props.onRegister(this.state.account);
  }

  render() {
    return (
      <Form>
        <h3>Register</h3>
        <Form.Field>
          <label>First Name</label>
          <input
            type="text"
            placeholder="First Name"
            onChange={this.updateAccount.bind(this)}
            id="firstName"
          />
        </Form.Field>
        <Form.Field>
          <label>Last Name</label>
          <input
            type="text"
            placeholder="Last Name"
            onChange={this.updateAccount.bind(this)}
            id="lastName"
          />
        </Form.Field>
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
        <Button onClick={this.createAccount.bind(this)} secondary fluid>Create Account</Button>
      </Form>
    );
  }
}

export default Register;
