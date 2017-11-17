import React, { Component } from "react";
import { Button, Form, Segment } from "semantic-ui-react";

class RegisterForm extends Component {
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
      <Form size="large">
        <Segment stacked>
          <Form.Input
            fluid
            id="firstName"
            placeholder="First Name"
            onChange={this.updateAccount.bind(this)}
          />
          <Form.Input
            fluid
            id="lastName"
            placeholder="Last Name"
            onChange={this.updateAccount.bind(this)}
          />
          <Form.Input
            fluid
            id="email"
            placeholder="Email"
            onChange={this.updateAccount.bind(this)}
          />
          <Form.Input
            fluid
            id="password"
            placeholder="Password"
            type="password"
            onChange={this.updateAccount.bind(this)}
          />

          <Button
            color="orange"
            fluid
            size="large"
            onClick={this.createAccount.bind(this)}
            content="Create Account"
          />
        </Segment>
      </Form>
    );
  }
}

export default RegisterForm;
