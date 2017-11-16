import React, { Component } from "react";
import { Divider } from "semantic-ui-react";
import { Login, Register } from "../views";
import { APIManager } from "../../utils";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: ""
    };
  }

  componentDidMount() {
    // check current user
    APIManager.get("/users/currentuser", null, (err, response) => {
      if (err) {
        alert(err);
        return;
      }
      if (response.profile == null) {
        // user is NOT logged in
        return;
      }
      // user is logged in
      console.log('current user: ' + JSON.stringify(response))
      // this.props.currentUserReceived(response.profile);
    });
  }

  register(visitor) {
    APIManager.post("/users/register", visitor, (err, response) => {
      if (err) {
        let msg = err.message || err;
        alert(msg);
        return;
      }
      console.log("REGISTERED: " + JSON.stringify(response));
      // this.props.profileCreated(response.profile);
    });
  }
  login(credentials) {
    APIManager.post("/users/login", credentials, (err, response) => {
      if (err) {
        let msg = err.message || err;
        alert(msg);
        return;
      }
      console.log("LOGGED IN: " + JSON.stringify(response));
      // this.props.currentUserReceived(response.profile);
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

export default Profile;
