import React, { Component } from "react";
import { CurrentUsers, Profile, MainHeader } from "./";
import { Container, Grid, Icon, Header } from "semantic-ui-react";

class DashboardLayout extends Component {
  render() {
    return (
      <div>
        <MainHeader />
        <Container style={{ marginTop: "8em" }}>
          <Grid stackable>
            <Grid.Row>
              <Grid.Column width={16}>
                <Header as="h3">
                  <Icon name="users" />
                  <Header.Content>Current Users</Header.Content>
                </Header>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={16}>
                <CurrentUsers />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default DashboardLayout;
