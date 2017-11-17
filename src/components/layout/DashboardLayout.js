import React, { Component } from "react";
import { Users, Profile, MainHeader } from "../containers";
import { Grid, Divider, Segment } from "semantic-ui-react";

class DashboardLayout extends Component {
  render() {
    return (
      <Grid stackable>
        <Grid.Row>
          <Grid.Column width={16}>
            <MainHeader />
            <Profile />
          </Grid.Column>
        </Grid.Row>
        <Divider />
        <Grid.Row>
          <Grid.Column width={16}>
            <Users />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default DashboardLayout;
