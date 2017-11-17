import React, { Component } from "react";
import { connect } from "react-redux";
import { Segment, Divider, Button, Header } from "semantic-ui-react";
import { Login, Register, EditModal } from "../views";
import { APIManager } from "../../utils";
import actions from "../../actions";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: "",
      modal: false
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
  update(account) {
    APIManager.put("/api/user/" + account.id, account, (err, response) => {
      if (err) {
        let msg = err.message || err;
        alert(msg);
        return;
      }
      alert("Profile has been updated.");
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
  logout() {
    // check for logged in user
    APIManager.get("/users/logout", null, (err, response) => {
      if (err) {
        alert(err);
        return;
      }
      // user is logged out
      this.props.currentUserReceived(null);
    });
  }
  openModal() {
    this.setState({
      modal: true
    });
  }
  closeModal() {
    this.setState({
      modal: false
    });
  }

  render() {
    return (
      <Header floated="right">
        {this.props.currentUser == null ? (
          <Segment padded>
            <Login onLogin={this.login.bind(this)} />
            <Divider horizontal>Or</Divider>
            <Register onRegister={this.register.bind(this)} />
          </Segment>
        ) : (
          <Segment padded>
            <h2>Hello {this.props.currentUser.firstName}</h2>
            <Divider />
            <Button
              onClick={this.openModal.bind(this)}
              content="Edit Profile"
              icon="edit"
              color="teal"
              fluid
            />
            <br />
            <Button
              onClick={this.logout.bind(this)}
              content="Sign Out"
              icon="log out"
              color="black"
              fluid
            />
            <br />
            <EditModal
              open={this.state.modal}
              onUpdate={this.update.bind(this)}
              onClose={this.closeModal.bind(this)}
              user={this.props.currentUser}
            />
          </Segment>
        )}
      </Header>
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
