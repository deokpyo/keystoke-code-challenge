import React, { Component } from "react";
import {
  Button,
  Modal,
  Image,
  Form,
  Grid,
  Divider
} from "semantic-ui-react";
import Dropzone from "react-dropzone";

const style = {
  width: "100%",
  textAlign: "center",
  borderWidth: "2px",
  borderColor: "rgb(102, 102, 102)",
  borderStyle: "dashed",
  borderRadius: "5px"
};

class EditModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      image: props.image,
      file: null
    };
  }

  updateInput(attr, event) {
    let updated = Object.assign({}, this.state.user);
    updated[attr] = event.target.value;
    this.setState({
      user: updated
    });
  }

  updateUser() {
    // check for new image file
    if (this.state.file !== null) {
      this.props.onUpload(this.state.file, this.state.user);
    } else {
      this.props.onUpdate(this.state.user);
    }
  }

  closeModal() {
    this.setState({
      image: this.props.image,
      file: null
    });
    this.props.onClose();
  }

  onImageDrop(file) {
    this.setState({
      image: file[0].preview,
      file: file[0]
    });
  }

  render() {
    return (
      <Modal
        dimmer="blurring"
        open={this.props.open}
        onClose={this.closeModal.bind(this)}
        style={{ height: "auto" }}
      >
        <Modal.Header>Edit Profile</Modal.Header>
        <Modal.Content>
          <Grid stackable>
            <Grid.Row>
              <Grid.Column width={6}>
                <Image
                  size="small"
                  src={this.state.image}
                  circular
                  centered={true}
                />
                <Divider />
                <Dropzone
                  multiple={false}
                  accept="image/*"
                  style={style}
                  onDrop={this.onImageDrop.bind(this)}
                >
                  <p style={{ margin: "10px 15px" }}>
                    Drop an image here or click to select a file.
                  </p>
                </Dropzone>
              </Grid.Column>

              <Grid.Column width={10}>
                <Form>
                  <Form.Field>
                    <label>First Name</label>
                    <input
                      type="text"
                      value={this.state.user.firstName}
                      onChange={this.updateInput.bind(this, "firstName")}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Last Name</label>
                    <input
                      type="text"
                      value={this.state.user.lastName}
                      onChange={this.updateInput.bind(this, "lastName")}
                    />
                  </Form.Field>
                  <Form.TextArea
                    label="Description"
                    value={
                      this.state.user.description || "User has no description."
                    }
                    placeholder="Description"
                    onChange={this.updateInput.bind(this, "description")}
                  />
                </Form>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Modal.Content>
        <Modal.Actions>
          <Button.Group>
            <Button
              negative
              content="Cancel"
              icon="cancel"
              labelPosition="left"
              onClick={this.closeModal.bind(this)}
            />
            <Button.Or />
            <Button
              positive
              icon="checkmark"
              labelPosition="right"
              content="Update"
              onClick={this.updateUser.bind(this)}
            />
          </Button.Group>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default EditModal;
