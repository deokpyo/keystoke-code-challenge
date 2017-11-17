import React, { Component } from "react";
import Moment from "react-moment";
import { Card, Icon, Image } from "semantic-ui-react";

class UserCard extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Card>
        <Image src={this.props.user.image || "./images/default.png"} />
        <Card.Content>
          <Card.Header>
            {this.props.user.firstName} {this.props.user.lastName}
          </Card.Header>
          <Card.Meta>
            <span className="date">
              Joined on{" "}
              <Moment format="YYYY/MM/DD">{this.props.user.timestamp}</Moment>
            </span>
          </Card.Meta>
          <Card.Description>
            {this.props.user.description || "User has no description."}
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

export default UserCard;
