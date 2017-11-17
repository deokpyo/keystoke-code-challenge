import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Divider, Segment } from "semantic-ui-react";
import { APIManager } from "../utils";
import { LoginForm } from "./containers";
import actions from "../actions";

class Home extends Component {
  constructor() {
    super();
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
      console.log(response);
      this.props.currentUserReceived(response.user);
    });
  }
  render() {
    return (
      <div>
        {this.props.currentUser == null ? (
          <LoginForm />
        ) : (
          <h1>User is Logged In</h1>
        )}
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
    currentUserReceived: user => dispatch(actions.currentUserReceived(user))
  };
};

export default connect(stateToProps, dispatchToProps)(Home);
