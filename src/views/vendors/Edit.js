import React, { Component } from "react";
import he from "he";
import { Redirect } from "react-router";
import Helmet from "react-helmet";
import VendorBreadcrumbs from "../../components/vendors/VendorBreadcrumbs";
import Breadcrumb from "../../components/common/Breadcrumb";
import VendorForm from "../../components/vendors/VendorForm";
import { findById, update, editPath } from "../../models/vendors";

class Edit extends Component {
  constructor(props) {
    super(props);

    this._isMounted = false;

    this.state = {
      redirectToVendors: false,
      vendor: undefined,
      errors: {
        name: undefined,
        icon_class: undefined
      }
    };
  }

  async componentDidMount() {
    this._isMounted = true;
    const vendor = await findById(this.props.match.params.id);

    if (this._isMounted) {
      this.setState({ ...this.state, vendor });
    }
  }

  async componentWillUnmount() {
    this._isMounted = false;
  }

  handleSubmit = async e => {
    e.preventDefault();

    const newName = e.target.name.value;
    const newIconClass = e.target.icon_class.value;

    const result = await update(this.state.vendor.id, {
      name: newName,
      icon_class: newIconClass
    });

    if (result.errors && result.errors.length) {
      const resultErrors = {};

      result.errors.map(error => {
        resultErrors[error.field] = error.message;
        return error;
      });

      this.setState({
        ...this.state,
        vendor: {
          ...this.state.vendor,
          name: newName,
          icon_class: newIconClass
        },
        errors: {
          ...this.state.errors,
          ...resultErrors
        }
      });
    } else {
      this.setState({
        ...this.state,
        redirectToVendors: true
      });
    }
  };

  redirect() {
    return (
      this.state.redirectToVendors && (
        <Redirect
          to={{
            pathname: "/vendors",
            updated: true
          }}
        />
      )
    );
  }

  breadcrumbs() {
    return (
      <VendorBreadcrumbs>
        <Breadcrumb to={editPath(this.state.vendor.id)} active>
          Edit “{he.decode(this.state.vendor.name)}”
        </Breadcrumb>
      </VendorBreadcrumbs>
    );
  }

  render() {
    const vendor = this.state.vendor;

    return vendor ? (
      <div>
        <Helmet>
          <title>{`Edit “${he.decode(vendor.name)}”`}</title>
        </Helmet>
        {this.redirect()}
        {this.breadcrumbs()}
        <VendorForm
          vendor={vendor}
          onSubmit={this.handleSubmit}
          errors={this.state.errors}
        />
      </div>
    ) : (
      ""
    );
  }
}

export default Edit;
