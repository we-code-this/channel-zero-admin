import React, { Component } from "react";
import { Modal, Section, Button } from 'react-bulma-components';
import IconDeleteButton from "./IconDeleteButton";

class DeleteModalButton extends Component {
  constructor(props) {
    super(props);

    const small = props.small ? 'is-small' : '';

    this.state = {
      small,
      show: false
    };
  }

  open = e => {
    e.preventDefault();
    this.setState({ show: true })
  };
  close = () => this.setState({ show: false });
  closeAndSubmit = e => {
    e.preventDefault();
    this.close();
    this.props.onSubmit(e);
  };

  render() {
    return (
      <div>
        <IconDeleteButton
          className={`is-danger ${this.state.small}`}
          icon="minus-circle"
          label="Delete"
          onSubmit={this.open}
        />
        <Modal show={this.state.show} onClose={this.close} closeOnEsc={false}>
          <Modal.Content>
            <Section style={{ backgroundColor: 'white' }} className="has-text-centered">
              <p className="is-size-4">Are you absolutely sure you want to delete this?</p>
              <form onSubmit={this.closeAndSubmit}>
                <Button type="submit" className="is-danger">Yes</Button>
                <Button onClick={this.close}>No</Button>
              </form>
            </Section>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

export default DeleteModalButton;
