import React, { Component } from "reactn";
import { Redirect } from "react-router";
import Helmet from "react-helmet";
import UserBreadcrumbs from "../../components/users/UserBreadcrumbs";
import Breadcrumb from "../../components/common/Breadcrumb";
import UserForm from "../../components/users/UserForm";
import { create, createPath } from "../../models/users";
import authUser from "../../components/auth/authUser";
import isAdmin from "../../components/auth/isAdmin";

class Create extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectToUsers: false,
      user: {
        email: "",
        username: "",
        password: "",
        password_confirm: "",
      },
      errors: {
        email: undefined,
        username: undefined,
        password: undefined,
      }
    };
  }

  handleSubmit = async e => {
    e.preventDefault();

    this.setGlobal({
      ...this.global,
      uploading: true
    });

    const newEmail = e.target.email.value;
    const newUsername = e.target.username.value;

    const result = await create({
      email: newEmail,
      username: newUsername,
      password: e.target.password.value,
      password_confirm: e.target.password_confirm.value,
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
          username: newUsername,
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
        user: {
          ...this.state.user
        },
        redirectToUsers: true
      });
    }
  };

  redirect() {
    return (
      this.state.redirectToUsers && (
        <Redirect
          to={{
            pathname: `/users`,
            created: true
          }}
        />
      )
    );
  }

  breadcrumbs() {
    return (
      <UserBreadcrumbs>
        <Breadcrumb to={createPath()} active>
          Create User
        </Breadcrumb>
      </UserBreadcrumbs>
    );
  }

  render() {
    const user = this.state.user;

    return (
      <div>
        <Helmet>
          <title>Create User</title>
        </Helmet>
        {this.redirect()}
        {this.breadcrumbs()}
        <UserForm
          user={user}
          onSubmit={this.handleSubmit}
          errors={this.state.errors}
          create
        />
      </div>
    );
  }
}

export default authUser(isAdmin(Create));
