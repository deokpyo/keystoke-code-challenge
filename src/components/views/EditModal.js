import React, { Component } from "react";
import { Button, Modal, Header, Image, Form, Grid } from "semantic-ui-react";
import Dropzone from "react-dropzone";

class EditModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      image: props.user.image,
      file: null
    };
  }

  updateInput(event) {
    let updated = Object.assign({}, this.state.user);
    updated[event.target.id] = event.target.value;
    this.setState({
      user: updated
    });
  }

  updateUser() {
    // check for updated profile image
    if (this.props.user.image !== this.state.image) {
      this.props.onUpload(this.state.file, this.state.user);
    } else {
      this.props.onUpdate(this.state.user);
    }
  }

  closeModal() {
    this.setState({
      image: this.props.user.image,
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
    const style = {
      marginRight: "3%",
      maxWidth: "300px",
      padding: "1%",
      textAlign: "center",
      borderWidth: "2px",
      borderColor: "rgb(102, 102, 102)",
      borderStyle: "dashed",
      borderRadius: "5px"
    };
    return (
      <Modal
        dimmer="blurring"
        open={this.props.open}
        onClose={this.closeModal.bind(this)}
      >
        <Modal.Header>Edit Profile</Modal.Header>
        <Modal.Content>
          <Image
            wrapped
            size="medium"
            src={this.state.image || "./images/default.svg"}
          />
          <Dropzone
            multiple={false}
            accept="image/*"
            style={style}
            onDrop={this.onImageDrop.bind(this)}
          >
            <p>Drop an image here or click to select a file.</p>
          </Dropzone>

          <Modal.Description>
            <Form>
              <Form.Field>
                <label>First Name</label>
                <input
                  type="text"
                  value={this.state.user.firstName}
                  onChange={this.updateInput.bind(this)}
                  id="firstName"
                />
              </Form.Field>
              <Form.Field>
                <label>Last Name</label>
                <input
                  type="text"
                  value={this.state.user.lastName}
                  onChange={this.updateInput.bind(this)}
                  id="lastName"
                />
              </Form.Field>
              <Form.TextArea
                id="description"
                value={
                  this.state.user.description || "User has no description."
                }
                placeholder="Description"
                onChange={this.updateInput.bind(this)}
              />
            </Form>
          </Modal.Description>
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
