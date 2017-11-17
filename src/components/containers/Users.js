import React, { Component } from "react";
import { connect } from "react-redux";
import { Card } from "semantic-ui-react";
import { UserCard } from "../views";
import { APIManager } from "../../utils";
import actions from "../../actions";

class Users extends Component {
  constructor() {
    super();
    this.state = {
      users: []
    };
  }
  componentDidMount() {
    APIManager.get("/api/user", null, (err, response) => {
      const results = response.results;
      this.props.usersReceived(results);
    });
  }

  render() {
    const userCard = this.props.users.map((user, i) => {
      return <UserCard user={user} key={user.id} />;
    });
    return <Card.Group>{userCard}</Card.Group>;
  }
}

const stateToProps = state => {
  return {
    users: state.user.list
  };
};

const dispatchToProps = dispatch => {
  return {
    usersReceived: user => dispatch(actions.usersReceived(user))
  };
};

export default connect(stateToProps, dispatchToProps)(Users);
