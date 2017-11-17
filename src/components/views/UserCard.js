import React, { Component } from "react";
import Moment from "react-moment";
import { Card, Icon, Image, Message } from "semantic-ui-react";

const imageLink =
  "https://res.cloudinary.com/dspcivept/image/upload/w_200,h_200,c_crop,g_face/";

const style = {
  height: "100px",
  overflow: "auto"
};

class UserCard extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Card>
        <Card.Content>
          <Image
            circular
            floated="right"
            size="mini"
            src={imageLink + this.props.user.image || "./images/default.svg"}
          />
          <Card.Header>
            {" "}
            {this.props.user.firstName} {this.props.user.lastName}
          </Card.Header>
          <Card.Meta>
            Joined on{" "}
            <Moment format="YYYY/MM/DD">{this.props.user.timestamp}</Moment>
          </Card.Meta>
          <Card.Description>
            <Message style={style}>
              <Message.Header>About Me</Message.Header>
              <p>{this.props.user.description || "User has no description."}</p>
            </Message>
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

export default UserCard;
