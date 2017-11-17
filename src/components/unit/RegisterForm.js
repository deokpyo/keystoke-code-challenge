import React, { Component } from "react";
import { Button, Form, Segment, Message, Label, Icon } from "semantic-ui-react";
import { GoogleLoginButton } from "./";

class RegisterForm extends Component {
  constructor() {
    super();
    this.state = {
      account: {
        firstName: "",
        lastName: "",
        email: "",
        isGoogle: false
      }
    };
  }

  updateAccount(attr, event) {
    let updated = Object.assign({}, this.state.account);
    updated[attr] = event.target.value;
    this.setState({
      account: updated
    });
  }

  createAccount(event) {
    event.preventDefault();
    if (
      !this.state.account.firstName ||
      !this.state.account.lastName ||
      !this.state.account.email ||
      !this.state.account.password
    ) {
      alert("Please fill out all required fields.");
      return;
    }
    if (!this.checkEmail(this.state.account.email)) {
      alert("Please enter a valid email address.");
      return;
    }
    this.props.onRegister(this.state.account);
  }

  checkEmail(email) {
    let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!filter.test(email)) {
      return false;
    }
    return true;
  }

  onGoogleSignUp(profile) {
    const googleProfile = {
      firstName: profile.givenName,
      lastName: profile.familyName,
      email: profile.email,
      isGoogle: true
    };
    this.setState({
      account: googleProfile
    });
  }

  showLogin() {
    this.props.onShowLogin();
  }

  resetFields() {
    const reset = {
      firstName: "",
      lastName: "",
      email: "",
      isGoogle: false
    };
    this.setState({
      account: reset
    });
  }

  render() {
    return (
      <div>
        <Form size="large">
          <Segment stacked>
            <GoogleLoginButton
              onResponse={this.onGoogleSignUp.bind(this)}
              buttonName="Sign up with Google"
            />
            <br />
            <Form.Input
              fluid
              placeholder="First Name (required)"
              type="text"
              value={this.state.account.firstName}
              onChange={this.updateAccount.bind(this, "firstName")}
            />
            <Form.Input
              fluid
              placeholder="Last Name (required)"
              type="text"
              value={this.state.account.lastName}
              onChange={this.updateAccount.bind(this, "lastName")}
            />
            <Form.Input
              fluid
              disabled={this.state.account.isGoogle}
              placeholder="Email (required)"
              type="email"
              value={this.state.account.email}
              onChange={this.updateAccount.bind(this, "email")}
            />
            <Form.Input
              fluid
              placeholder="Password (required)"
              type="password"
              onChange={this.updateAccount.bind(this, "password")}
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
        <Message>
          <Label as="a" onClick={this.showLogin.bind(this)} color="grey">
            <Icon name="arrow circle left" />Back to Login
          </Label>
          <Label as="a" onClick={this.resetFields.bind(this)} color="black">
            <Icon name="refresh" />Reset all fields
          </Label>
        </Message>
      </div>
    );
  }
}

export default RegisterForm;
