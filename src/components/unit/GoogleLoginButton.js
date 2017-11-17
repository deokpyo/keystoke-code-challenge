import React, { Component } from "react";
import GoogleLogin from "react-google-login";
import { Icon } from "semantic-ui-react";

const CLIENT_ID =
  "898994729966-9j1svqlm4rosi7uiu0p6tidhsatkeerq.apps.googleusercontent.com";

class GoogleLoginButton extends Component {
  constructor() {
    super();
  }

  responseSuccess(response) {
    const profile = response.profileObj;
    this.props.onResponse(profile);
  }

  responseFailure(response) {
    console.log("Error: " + JSON.stringify(response));
    return;
  }

  render() {
    return (
      <GoogleLogin
        className="ui red large fluid button"
        clientId={CLIENT_ID}
        onSuccess={this.responseSuccess.bind(this)}
        onFailure={this.responseFailure.bind(this)}
      >
        <Icon name="google" />
        <span>{this.props.buttonName}</span>
      </GoogleLogin>
    );
  }
}

export default GoogleLoginButton;
