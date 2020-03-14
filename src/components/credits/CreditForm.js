import _ from "lodash";
import React, { Component } from "react";
import { withRouter } from "react-router";
import TextInput from "../common/forms/TextInput";
import SubmitWithCancel from "../common/forms/SubmitWithCancel";

class CreditForm extends Component {
  constructor(props) {
    super(props);

    const credit = props.credit
      ? props.credit
      : {
        release_id: props.release.id,
        label: '',
        value: '',
        url: '',
      };

    this.state = {
      credit: credit,
      errors: props.errors
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (!_.isEqual(props.errors, state.errors)) {
      return { ...state, errors: props.errors };
    }

    return null;
  }

  handleCancelClick = e => {
    e.preventDefault();
    this.props.history.goBack();
  };

  handleLabelChange = e => {
    const credit = { ...this.state.credit, label: e.target.value };

    this.setState({ ...this.state, credit });
  };

  handleValueChange = e => {
    const credit = { ...this.state.credit, value: e.target.value };

    this.setState({ ...this.state, credit });
  };

  handleUrlChange = e => {
    const credit = { ...this.state.credit, url: e.target.value };

    this.setState({ ...this.state, credit });
  };

  render() {
    return (
      <form
        onSubmit={this.props.onSubmit}
        className="form credit-form"
      >
        <input type="hidden" name="release_id" value={this.state.credit.release_id} />

        <div className="columns">
          <div className="column is-quarter">
            <TextInput
              label="Label"
              onChange={this.handleLabelChange}
              value={this.state.credit.label}
              error={
                this.state.errors && this.state.errors.label
                  ? this.state.errors.label
                  : undefined
              }
            />
          </div>
          <div className="column is-quarter">
            <TextInput
              label="Value"
              onChange={this.handleValueChange}
              value={this.state.credit.value}
              error={
                this.state.errors && this.state.errors.value
                  ? this.state.errors.value
                  : undefined
              }
            />
          </div>
          <div className="column is-half">
            <TextInput
              label="URL"
              onChange={this.handleUrlChange}
              value={this.state.credit.url}
              error={
                this.state.errors && this.state.errors.url
                  ? this.state.errors.url
                  : undefined
              }
            />
          </div>
        </div>
        
        <SubmitWithCancel onClick={this.handleCancelClick} />
      </form>
    );
  }
}

export default withRouter(CreditForm);
