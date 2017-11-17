import React, { Component } from "react";
import { Button, Form, Divider, Segment } from "semantic-ui-react";

class LoginForm extends Component {
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

  login(event) {
    event.preventDefault();
    this.props.onLogin(this.state.account);
  }

  render() {
    return (
      <Form size="large">
        <Segment stacked>
          <Form.Input
            fluid
            id="email"
            icon="user"
            iconPosition="left"
            placeholder="Email"
            onChange={this.updateAccount.bind(this)}
          />
          <Form.Input
            fluid
            id="password"
            icon="lock"
            iconPosition="left"
            placeholder="Password"
            onChange={this.updateAccount.bind(this)}
            type="password"
          />

          <Button
            color="orange"
            fluid
            size="large"
            onClick={this.login.bind(this)}
            content="Login"
          />
        </Segment>
      </Form>
    );
  }
}

export default LoginForm;
