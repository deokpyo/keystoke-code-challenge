import React, { Component } from "react";
import { Users, Profile } from "../containers";
import { Grid } from "semantic-ui-react";

class Home extends Component {
  render() {
    return (
      <Grid stackable>
        <Grid.Row>
          <h1>Keystoke Users</h1>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={6}>
            <Profile />
          </Grid.Column>
          <Grid.Column width={10}>
            <Users />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default Home;
