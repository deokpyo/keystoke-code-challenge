import React, { Component } from "react";
import { Header, Icon } from "semantic-ui-react";

class MainHeader extends Component {
  render() {
    return (
      <Header as="h1" icon textAlign="center" floated="left">
        <Icon name="users" circular />
        <Header.Content>Keystoke Users</Header.Content>
      </Header>
    );
  }
}

export default MainHeader;
