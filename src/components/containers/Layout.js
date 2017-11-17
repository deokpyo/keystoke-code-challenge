import React, { Component } from "react";
import { Users, Nav } from "./";
import { Container, Grid, Icon, Header } from "semantic-ui-react";

class Layout extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Nav />
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
                <Users />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default Layout;
