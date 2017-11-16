import React, { Component } from "react";
import { connect } from "react-redux";
import { Divider } from "semantic-ui-react";
import { Login, Register } from "../views";
import { APIManager } from "../../utils";
import actions from "../../actions";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: ""
    };
  }

  componentDidMount() {
    // check for logged in user
    APIManager.get("/users/currentuser", null, (err, response) => {
      if (err) {
        alert(err);
        return;
      }
      if (response.user == null) {
        // user is NOT logged in
        return;
      }
      // user is logged in
      this.props.currentUserReceived(response.user);
    });
  }

  register(visitor) {
    APIManager.post("/users/register", visitor, (err, response) => {
      if (err) {
        let msg = err.message || err;
        alert(msg);
        return;
      }
      this.props.userCreated(response.user);
    });
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

  render() {
    return (
      <div>
        <Login onLogin={this.login.bind(this)} />
        <Divider />
        <Register onRegister={this.register.bind(this)} />
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

export default connect(stateToProps, dispatchToProps)(Profile);
