import React, { Component } from "reactn";
import he from "he";
import { Redirect } from "react-router";
import Helmet from "react-helmet";
import VendorBreadcrumbs from "../../components/vendors/VendorBreadcrumbs";
import Breadcrumb from "../../components/common/Breadcrumb";
import VendorForm from "../../components/vendors/VendorForm";
import { findById, update, editPath } from "../../models/vendors";
import authUser from "../../components/auth/authUser";
import isEditor from "../../components/auth/isEditor";

class Edit extends Component {
  constructor(props) {
    super(props);

    this._isMounted = false;

    const vendor = props.vendor ? props.vendor : undefined;

    this.state = {
      redirectToVendors: false,
      vendor,
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

    this.setGlobal({
      ...this.global,
      uploading: true
    });

    const newName = e.target.name.value;
    const newIconClass = e.target.icon_class.value;

    const result = await update(this.state.vendor.id, {
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

export default authUser(isEditor(Edit));
