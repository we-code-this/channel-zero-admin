import React, { Component } from "react";
import he from "he";
import _ from "lodash";
import { withRouter } from "react-router";
import TextInput from "../common/forms/TextInput";
import SubmitWithCancel from "../common/forms/SubmitWithCancel";

class VendorForm extends Component {
  constructor(props) {
    super(props);

    const vendor = props.vendor ? props.vendor : { name: "", icon_class: "" };

    this.state = {
      vendor,
      errors: props.errors
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (!_.isEqual(props.errors, state.errors)) {
      return { ...state, vendor: props.vendor, errors: props.errors };
    }

    return null;
  }

  handleNameChange = e => {
    const vendor = { ...this.state.vendor, name: e.target.value };
    this.setState({ ...this.state, vendor });
  };

  handleIconClassChange = e => {
    const vendor = { ...this.state.vendor, icon_class: e.target.value };
    this.setState({ ...this.state, vendor });
  };

  handleCancelClick = e => {
    e.preventDefault();
    this.props.history.goBack();
  };

  render() {
    const vendor = this.state.vendor;

    return (
      <form onSubmit={this.props.onSubmit} className="form vendor-form">
        <div className="columns">
          <div className="column is-three-quarters">
            <TextInput
              label="Name"
              value={he.decode(vendor.name)}
              onChange={this.handleNameChange}
              error={
                this.state.errors && this.state.errors.name
                  ? this.state.errors.name
                  : undefined
              }
            />
          </div>
          <div className="column is-one-quarters">
            <TextInput
              label="Icon Class"
              value={he.decode(vendor.icon_class)}
              onChange={this.handleIconClassChange}
              error={
                this.state.errors && this.state.errors.icon_class
                  ? this.state.errors.icon_class
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

export default withRouter(VendorForm);
