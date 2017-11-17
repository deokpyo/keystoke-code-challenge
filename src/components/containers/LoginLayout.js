import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
  Label,
  Icon
} from "semantic-ui-react";
import { LoginForm, RegisterForm } from "../unit";
import { APIManager } from "../../utils";
import actions from "../../actions";

class LoginLayout extends Component {
  constructor() {
    super();
    this.state = {
      login: true
    };
  }

  login(credentials) {
    APIManager.post("/users/login", credentials, (err, response) => {
      if (err) {
        let msg = err.message || err;
        alert(msg);
        return;
      }
      this.props.currentUserReceived(response.profile);
    });
  }

  register(account) {
    APIManager.post("/users/register", account, (err, response) => {
      if (err) {
        let msg = err.message || err;
        alert(msg);
        return;
      }
      this.props.userCreated(response.user);
    });
  }

  showRegisterForm() {
    this.setState({
      login: false
    });
  }

  showLoginForm() {
    this.setState({
      login: true
    });
  }

  render() {
    return (
      <div className="login-form">
        <Grid
          textAlign="center"
          style={{ height: "100%" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Image src="./images/logo.png" size={"medium"} centered={true} />
            <br />

            {this.state.login ? (
              <div>
                <Header as="h2" color="orange" textAlign="center">
                  Login to your account
                </Header>
                <LoginForm onLogin={this.login.bind(this)} />
                <Message>
                  Don't have an account?{" "}
                  <Label
                    as="a"
                    onClick={this.showRegisterForm.bind(this)}
                    color="grey"
                  >
                    <Icon name="add user" />Create Account
                  </Label>
                </Message>
              </div>
            ) : (
              <div>
                <Header as="h2" color="orange" textAlign="center">
                  Create a New Account
                </Header>
                <RegisterForm onRegister={this.register.bind(this)} />
                <Message>
                  <Label
                    as="a"
                    onClick={this.showLoginForm.bind(this)}
                    color="grey"
                  >
                    <Icon name="arrow circle left" />Back to Login
                  </Label>
                </Message>
              </div>
            )}
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const stateToProps = state => {
  return {
    currentUser: state.user.currentUser
  };
};

const dispatchToProps = dispatch => {
  return {
    userCreated: user => dispatch(actions.userCreated(user)),
    currentUserReceived: user => dispatch(actions.currentUserReceived(user))
  };
};

export default connect(stateToProps, dispatchToProps)(LoginLayout);
