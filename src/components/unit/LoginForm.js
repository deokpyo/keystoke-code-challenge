import React, { Component } from "react";
import {
  Button,
  Form,
  Divider,
  Segment,
  Message,
  Label,
  Icon
} from "semantic-ui-react";
import { GoogleLoginButton } from "./";

const CLIENT_ID =
  "898994729966-9j1svqlm4rosi7uiu0p6tidhsatkeerq.apps.googleusercontent.com";

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      account: {}
    };
  }

  updateAccount(attr, event) {
    let updated = Object.assign({}, this.state.account);
    updated[attr] = event.target.value;
    this.setState({
      account: updated
    });
  }

  submitLogin(event) {
    event.preventDefault();
    if (!this.state.account.email) {
      alert("Please enter your account email.");
      return;
    }
    if (!this.state.account.password) {
      alert("Please enter your account password.");
      return;
    }
    if(!this.checkEmail(this.state.account.email)){
      alert("Please enter a valid email address.");
      return;
    };
    this.props.onLogin(this.state.account);
  }

  checkEmail(email) {
    let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!filter.test(email)) {
      return false;
    }
    return true;
  }

  submitGoogleLogin(profile) {
    const account = {
      email: profile.email.toLowerCase()
    };
    this.props.onGoogleLogin(account);
  }

  showRegister() {
    this.props.onShowRegister();
  }

  render() {
    return (
      <div>
        <Form size="large">
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Email"
              type="email"
              onChange={this.updateAccount.bind(this, "email")}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              onChange={this.updateAccount.bind(this, "password")}
              type="password"
            />
            <Button
              color="orange"
              fluid
              size="large"
              icon="sign in"
              onClick={this.submitLogin.bind(this)}
              content="Login"
            />
            <Divider horizontal>Or</Divider>
            <GoogleLoginButton
              onResponse={this.submitGoogleLogin.bind(this)}
              buttonName="Login with Google"
            />
          </Segment>
        </Form>
        <Message>
          Don't have an account?{"  "}
          <Label as="a" onClick={this.showRegister.bind(this)} color="grey">
            <Icon name="add user" />Create Account
          </Label>
        </Message>
      </div>
    );
  }
}

export default LoginForm;
