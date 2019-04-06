import React, { Component } from "react";
import { withRouter } from "react-router";
import TextInput from "../../components/common/forms/TextInput";
import SubmitWithCancel from "../../components/common/forms/SubmitWithCancel";

class LabelForm extends Component {
  constructor(props) {
    super(props);

    const label = props.label ? props.label : { name: "" };

    this.state = {
      label,
      errors: props.errors
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.errors.name !== state.errors.name) {
      return { ...state, label: props.label, errors: props.errors };
    }

    return null;
  }

  handleNameChange = e => {
    const label = { ...this.state.label, name: e.target.value };
    this.setState({ ...this.state, label });
  };

  handleCancelClick = e => {
    e.preventDefault();
    this.props.history.goBack();
  };

  render() {
    const label = this.state.label;

    return (
      <form onSubmit={this.props.onSubmit} className="form">
        <TextInput
          label="Name"
          value={label.name}
          onChange={this.handleNameChange}
          error={this.state.errors.name}
        />
        <SubmitWithCancel onClick={this.handleCancelClick} />
      </form>
    );
  }
}

export default withRouter(LabelForm);
