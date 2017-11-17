import React, { Component } from "react";
import { connect } from "react-redux";
import request from "superagent";
import {
  Container,
  Grid,
  Button,
  Header,
  Image,
  Menu,
  Responsive
} from "semantic-ui-react";
import { APIManager } from "../../utils";
import { EditModal } from "../unit";
import actions from "../../actions";

const CLOUDINARY_UPLOAD_PRESET = "mcbgaoxt";
const CLOUDINARY_UPLOAD_URL =
  "https://api.cloudinary.com/v1_1/dspcivept/upload";
const imageLink =
  "https://res.cloudinary.com/dspcivept/image/upload/w_150,h_150,c_fill,g_auto/";

class MainHeader extends Component {
  constructor() {
    super();
    this.state = {
      modal: false
    };
  }

  logout() {
    // check for logged in user
    APIManager.get("/users/logout", null, (err, response) => {
      if (err) {
        alert(err);
        return;
      }
      // user is logged out
      this.props.currentUserReceived(null);
    });
  }
  update(account) {
    APIManager.put("/api/user/" + account.id, account, (err, response) => {
      if (err) {
        let msg = err.message || err;
        alert(msg);
        return;
      }
      alert("Profile has been updated.");
      this.props.userUpdated(response.results);
      this.setState({
        modal: false
      });
    });
  }
  uploadImage(imageFile, currentUser) {
    let upload = request
      .post(CLOUDINARY_UPLOAD_URL)
      .field("upload_preset", CLOUDINARY_UPLOAD_PRESET)
      .field("file", imageFile);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }
      currentUser["image"] =
        response.body.public_id + "." + response.body.format;
      this.update(currentUser);
    });
  }
  openModal() {
    this.setState({
      modal: true
    });
  }
  closeModal() {
    this.setState({
      modal: false
    });
  }
  render() {
    let imgSource = null;
    if (this.props.currentUser.image) {
      imgSource = imageLink + this.props.currentUser.image;
    } else {
      imgSource = "./images/default.png";
    }
    return (
      <div>
        <Menu fixed="top" inverted borderless>
          <Container>
            <Menu.Item header>
              <Image
                size="mini"
                src="./images/icon.png"
                style={{ marginRight: "1.5em" }}
              />
              <h2 style={{ margin: 0 }}>
                Welcome {this.props.currentUser.firstName}!
              </h2>
            </Menu.Item>
            <Menu.Menu position="right">
              <Menu.Item>
                <Responsive
                  as={Button}
                  {...Responsive.onlyMobile}
                  color="orange"
                  inverted
                  onClick={this.openModal.bind(this)}
                  icon="edit"
                />

                <Responsive
                  as={Button}
                  {...Responsive.onlyTablet}
                  color="orange"
                  inverted
                  onClick={this.openModal.bind(this)}
                  icon="edit"
                />
                <Responsive
                  as={Button}
                  {...Responsive.onlyComputer}
                  color="orange"
                  inverted
                  onClick={this.openModal.bind(this)}
                  content="Edit Profile"
                />
              </Menu.Item>
              <Menu.Item>
                <Responsive
                  as={Button}
                  {...Responsive.onlyMobile}
                  inverted
                  onClick={this.logout.bind(this)}
                  icon="sign out"
                />
                <Responsive
                  as={Button}
                  {...Responsive.onlyTablet}
                  inverted
                  onClick={this.logout.bind(this)}
                  icon="sign out"
                />
                <Responsive
                  as={Button}
                  {...Responsive.onlyComputer}
                  inverted
                  onClick={this.logout.bind(this)}
                  content="Log Out"
                />
              </Menu.Item>
            </Menu.Menu>
          </Container>
        </Menu>
        <EditModal
          open={this.state.modal}
          onUpdate={this.update.bind(this)}
          onUpload={this.uploadImage.bind(this)}
          onClose={this.closeModal.bind(this)}
          user={this.props.currentUser}
          image={imgSource}
        />
      </div>
    );
  }
}

const stateToProps = state => {
  return {
    currentUser: state.user.currentUser
  };
};

const dispatchToProps = dispatch => {
  return {
    userCreated: user => dispatch(actions.userCreated(user)),
    userUpdated: user => dispatch(actions.userUpdated(user)),
    currentUserReceived: user => dispatch(actions.currentUserReceived(user))
  };
};

export default connect(stateToProps, dispatchToProps)(MainHeader);
