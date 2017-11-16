import React, { Component } from "react";
import { APIManager } from "../../utils";

class Users extends Component {
  constructor() {
    super();
    this.state = {
      profiles: []
    };
  }
  componentDidMount() {
    APIManager.get("/api/user", null, (err, response) => {
      const results = response.results;
      // this.props.profilesReceived(results);
      this.setState({
        profiles: results
      });
    });
  }

  render() {
    const list = this.state.profiles.map((profile, i) => {
      return <li key={profile.id}>{profile.email}</li>;
    });
    return (
      <div>
        <h3>Users</h3>
        <ul>{list}</ul>
      </div>
    );
  }
}

export default Users;
