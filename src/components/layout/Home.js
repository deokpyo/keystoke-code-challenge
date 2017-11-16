import React, { Component } from "react";
import { Users, Profile } from "../containers";

class Home extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <h3>Keystoke Users</h3>
          <div className="col s12 m12 l4">
            <Profile />
          </div>
          <div className="col s12 m12 l8">
            <Users />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
