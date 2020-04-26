import React, { Component, Fragment } from "react";
import he from "he";
import _ from "lodash";
import { withRouter } from "react-router";
import TextInput from "../common/forms/TextInput";
import PasswordInput from "../common/forms/PasswordInput";
import SubmitWithCancel from "../common/forms/SubmitWithCancel";

class UserForm extends Component {
  constructor(props) {
    super(props);

    const user = props.user ? props.user : { 
      email: "", 
      username: "", 
      password: "", 
      password_confirm: "" 
    };

    this.state = {
      user,
      errors: props.errors
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (!_.isEqual(props.errors, state.errors)) {
      return { ...state, user: props.user, errors: props.errors };
    }

    return null;
  }

  handleChange = e => {
    this.setState({
      user: {
        ...this.state.user,
        [e.target.name]: e.target.value,
      }
    });
  };

  handleCancelClick = e => {
    e.preventDefault();
    this.props.history.goBack();
  };

  render() {
    const user = this.state.user;

    return (
      <form onSubmit={this.props.onSubmit} className="form user-form">
        <div className="columns">
          <div className="column is-half-tablet is-one-quarter-desktop">
            <TextInput
              label="Email"
              value={he.decode(user.email)}
              onChange={this.handleChange}
              error={
                this.state.errors && this.state.errors.email
                  ? this.state.errors.email
                  : undefined
              }
            />
          </div>
          {this.props.create && (
            <Fragment>
              <div className="column is-half-tablet is-one-quarter-desktop">
                <TextInput
                  label="Username"
                  value={he.decode(user.username)}
                  onChange={this.handleChange}
                  error={
                    this.state.errors && this.state.errors.username
                      ? this.state.errors.username
                      : undefined
                  }
                />
              </div>
              <div className="column is-half-tablet is-one-quarter-desktop">
                <PasswordInput
                  label="Password"
                  value={he.decode(user.password)}
                  onChange={this.handleChange}
                  error={
                    this.state.errors && this.state.errors.password
                      ? this.state.errors.password
                      : undefined
                  }
                />
              </div>
              <div className="column is-half-tablet is-one-quarter-desktop">
                <PasswordInput
                  label="Password Confirm"
                  value={he.decode(user.password_confirm)}
                  onChange={this.handleChange}
                />
              </div>
            </Fragment>
          )}
        </div>

        <SubmitWithCancel onClick={this.handleCancelClick} />
      </form>
    );
  }
}

export default withRouter(UserForm);
