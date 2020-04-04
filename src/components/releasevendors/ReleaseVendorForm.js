import _ from "lodash";
import React, { Component } from "react";
import { withRouter } from "react-router";
import TextInput from "../common/forms/TextInput";
import SubmitWithCancel from "../common/forms/SubmitWithCancel";
import VendorSelect from "../vendors/VendorSelect";

class ReleaseVendorForm extends Component {
  constructor(props) {
    super(props);

    const vendor = props.vendor
      ? props.vendor
      : {
        release_id: props.release.id,
        vendor_id: '',
        url: '',
      };

    this.state = {
      vendor: vendor,
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

  handleVendorChange = e => {
    const vendor = { ...this.state.vendor, vendor_id: e.target.value };
    this.setState({ ...this.state, vendor });
  };

  handleUrlChange = e => {
    const vendor = { ...this.state.vendor, url: e.target.value };

    this.setState({ ...this.state, vendor });
  };

  render() {
    return (
      <form
        onSubmit={this.props.onSubmit}
        className="form credit-form"
      >
        <input type="hidden" name="release_id" value={this.state.vendor.release_id} />

        <div className="columns">
          <div className="column is-quarter">
            <VendorSelect
              onChange={this.handleVendorChange}
              value={this.state.vendor.vendor_id}
            />
          </div>
          <div className="column is-three-quarters">
            <TextInput
              label="URL"
              onChange={this.handleUrlChange}
              value={this.state.vendor.url}
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

export default withRouter(ReleaseVendorForm);
