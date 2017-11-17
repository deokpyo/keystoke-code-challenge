import React, { Component } from "react";
import Moment from "react-moment";
import { Card, Icon, Image, Message } from "semantic-ui-react";

const imageLink =
  "https://res.cloudinary.com/dspcivept/image/upload/w_150,h_150,c_fill,g_auto/";

const style = {
  height: "120px",
  overflow: "auto"
};

class UserCard extends Component {
  constructor() {
    super();
  }

  render() {
    let imgSource = "";
    if (this.props.user.image) {
      imgSource = imageLink + this.props.user.image;
    } else {
      imgSource = "./images/default.png";
    }
    return (
      <Card>
        <Card.Content>
          <Image circular floated="right" size="mini" src={imgSource} />
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
              <p>{this.props.user.description || "User has no description."}</p>
            </Message>
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

export default UserCard;
