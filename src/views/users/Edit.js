import React, { Component } from "reactn";
import { Redirect } from "react-router";
import Helmet from "react-helmet";
import UserBreadcrumbs from "../../components/users/UserBreadcrumbs";
import Breadcrumb from "../../components/common/Breadcrumb";
import UserForm from "../../components/users/UserForm";
import { findById, update, editPath } from "../../models/users";
import authUser from "../../components/auth/authUser";
import isAdmin from "../../components/auth/isAdmin";

class Edit extends Component {
  constructor(props) {
    super(props);

    this._isMounted = false;

    const user = props.user ? props.user : undefined;

    this.state = {
      redirectToUsers: false,
      user,
      errors: {
        email: undefined,
      }
    };
  }

  async componentDidMount() {
    this._isMounted = true;
    const user = await findById(this.props.match.params.id);

    if (this._isMounted) {
      this.setState({ ...this.state, user });
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

    const newEmail = e.target.email.value;

    const result = await update(this.state.user.id, {
      email: newEmail,
    });

    if (result.errors && result.errors.length) {
      const resultErrors = {};

      this.setGlobal({
        ...this.global,
        uploading: false
      });

      result.errors.map(error => {
        resultErrors[error.field] = error.message;
        return error;
      });

      this.setState({
        ...this.state,
        user: {
          ...this.state.user,
          email: newEmail,
        },
        errors: {
          ...this.state.errors,
          ...resultErrors
        }
      });
    } else {
      this.setGlobal({
        ...this.global,
        uploading: false
      });

      this.setState({
        ...this.state,
        redirectToUsers: true
      });
    }
  };

  redirect() {
    return (
      this.state.redirectToUsers && (
        <Redirect
          to={{
            pathname: "/users",
            updated: true
          }}
        />
      )
    );
  }

  breadcrumbs() {
    return (
      <UserBreadcrumbs>
        <Breadcrumb to={editPath(this.state.user.id)} active>
          Edit User
        </Breadcrumb>
      </UserBreadcrumbs>
    );
  }

  render() {
    const user = this.state.user;

    return user ? (
      <div>
        <Helmet>
          <title>Edit User</title>
        </Helmet>
        {this.redirect()}
        {this.breadcrumbs()}
        <UserForm
          user={user}
          onSubmit={this.handleSubmit}
          errors={this.state.errors}
        />
      </div>
    ) : (
      ""
    );
  }
}

export default authUser(isAdmin(Edit));
