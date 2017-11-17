import React, { Component } from "react";
import { Button, Modal, Header, Image, Form } from "semantic-ui-react";

class EditModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user
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
    this.props.onUpdate(this.state.user);
  }

  closeModal() {
    this.props.onClose();
  }

  render() {
    return (
      <Modal
        dimmer="blurring"
        open={this.props.open}
        onClose={this.closeModal.bind(this)}
      >
        <Modal.Header>Edit Profile</Modal.Header>
        <Modal.Content image>
          <Image
            wrapped
            size="medium"
            src={this.state.user.image || "./images/default.png"}
          />
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
                value={this.state.user.description || "Description"}
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
