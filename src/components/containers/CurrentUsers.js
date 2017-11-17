import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Responsive } from "semantic-ui-react";
import { UserCard } from "../unit";
import { APIManager } from "../../utils";
import actions from "../../actions";

class CurrentUsers extends Component {
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
    return (
      <div>
        <Responsive as={Card.Group} {...Responsive.onlyMobile} stackable={true}>
          {userCard}
        </Responsive>
        <Responsive
          as={Card.Group}
          {...Responsive.onlyTablet}
          stackable={true}
          itemsPerRow={2}
        >
          {userCard}
        </Responsive>
        <Responsive
          as={Card.Group}
          {...Responsive.onlyComputer}
          stackable={true}
          itemsPerRow={4}
        >
          {userCard}
        </Responsive>
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

export default connect(stateToProps, dispatchToProps)(CurrentUsers);
