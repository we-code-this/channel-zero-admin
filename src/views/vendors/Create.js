import React, { Component } from "reactn";
import { Redirect } from "react-router";
import VendorBreadcrumbs from "../../components/vendors/VendorBreadcrumbs";
import Breadcrumb from "../../components/common/Breadcrumb";
import VendorForm from "../../components/vendors/VendorForm";
import { create, createPath } from "../../models/vendors";
import authUser from "../../components/auth/authUser";
import isEditor from "../../components/auth/isEditor";

class Create extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectToVendors: false,
      vendor: {
        name: "",
        icon_class: ""
      },
      errors: {
        name: undefined,
        icon_class: undefined
      }
    };
  }

  handleSubmit = async e => {
    e.preventDefault();

    this.setGlobal({
      ...this.global,
      uploading: true
    });

    const newName = e.target.name.value;
    const newIconClass = e.target.icon_class.value;

    const result = await create({
      name: newName,
      icon_class: newIconClass
    });

    this.setGlobal({
      ...this.global,
      uploading: false
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
        vendor: {
          ...this.state.vendor
        },
        redirectToVendors: true
      });
    }
  };

  redirect() {
    return (
      this.state.redirectToVendors && (
        <Redirect
          to={{
            pathname: `/vendors`,
            created: true
          }}
        />
      )
    );
  }

  breadcrumbs() {
    return (
      <VendorBreadcrumbs>
        <Breadcrumb to={createPath()} active>
          Create Vendor
        </Breadcrumb>
      </VendorBreadcrumbs>
    );
  }

  render() {
    const vendor = this.state.vendor;

    return (
      <div>
        {this.redirect()}
        {this.breadcrumbs()}
        <VendorForm
          vendor={vendor}
          onSubmit={this.handleSubmit}
          errors={this.state.errors}
        />
      </div>
    );
  }
}

export default authUser(isEditor(Create));
