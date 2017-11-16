import React, { Component } from "react";
import { connect } from "react-redux";
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
    const list = this.props.users.map((user, i) => {
      return <li key={user.id}>{user.email}</li>;
    });
    return (
      <div>
        <h3>Users</h3>
        <ul>{list}</ul>
      </div>
    );
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
