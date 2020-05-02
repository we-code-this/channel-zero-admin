import React, { Component } from "reactn";
import { Redirect } from "react-router";
import { Icon } from "react-bulma-components";
import TextInput from "../common/forms/TextInput";
import PasswordInput from "../common/forms/PasswordInput";
const host = process.env.REACT_APP_DATA_API_HOST;

class ResetForm extends Component {
    constructor(props) {
      super(props);

      this.state = {
        token: this.props.token,
        email: "",
        password: "",
        password_confirm: "",
        errors: {
            email: undefined,
            password: undefined,
            password_confirm: undefined,
            other: undefined,
        },
        redirect: false,
      };
    }

    handleChange = (e) => {
      this.setState({...this.state, [e.target.name]: e.target.value});
    };

    handleSubmit = async (e) => {
      e.preventDefault();

      this.setGlobal({
        ...this.global,
        uploading: true
      });

      if (this.state.password_confirm !== this.state.password) {
        this.setState({ 
          ...this.state, 
          password: "",
          password_confirm: "",
          errors: { 
            ...this.state.errors, 
            password_confirm: 'Password confirmation does not match password' 
          }
        });

        this.setGlobal({
          ...this.global,
          uploading: false
        });
      } else {
        const response = await fetch(`${host}/password/reset`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          method: "POST",
          body: JSON.stringify({
            reset_token: this.state.token,
            email: this.state.email,
            password: this.state.password,
            password_confirm: this.state.password_confirm,
          })
        });

        this.setGlobal({
          ...this.global,
          uploading: false
        });

        const result = await response.json();

        if (result.errors && result.errors.length) {
          const resultErrors = {};

          result.errors.map(error => {
              resultErrors[error.field] = error.message;
              return error;
          });

          this.setState({
            ...this.state,
            errors: {
              ...this.state.errors,
              password_confirm: undefined,
              ...resultErrors
            }
          });
        } else {
          this.setState({
            ...this.state,
            redirect: true,
          });
        }
      }   
    };

    redirect() {
      return (
        this.state.redirect && (
          <Redirect
            to={{
              pathname: `/`,
              reset: true,
            }}
          />
        )
      );
    }

    render() {
        return (
          <div className="forgot-form">
            {this.redirect()}
            <Icon className="login-logo">
                <svg className="svg-icon">
                <use xlinkHref="#icon-cz" />
                </svg>
            </Icon>
            
            {this.state.errors.other && <p>Something went wrong.</p>}

            {!this.state.errors.other && (
              <form onSubmit={this.handleSubmit} className="reset-form">
                <p>Fill out &amp; submit the form below to reset your password.</p>
                <TextInput 
                  label="Email" 
                  error={this.state.errors.email} 
                  value={this.state.email} 
                  onChange={this.handleChange}
                  placeholder
                  onDark
                />
                <PasswordInput 
                  label="Password" 
                  error={this.state.errors.password} 
                  value={this.state.password} 
                  onChange={this.handleChange}
                  placeholder
                  onDark
                />
                <PasswordInput 
                  name="password_confirm"
                  label="Confirm Password" 
                  error={this.state.errors.password_confirm} 
                  value={this.state.password_confirm} 
                  onChange={this.handleChange}
                  placeholder
                  onDark
                />
                <input type="submit" value="Submit" className="button" />
              </form>
            )}
          </div>
        );
    }
}

export default ResetForm;
