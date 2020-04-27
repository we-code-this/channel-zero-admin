import React, { Component } from "reactn";
import { Icon } from "react-bulma-components";
import TextInput from "../common/forms/TextInput";
const host = process.env.REACT_APP_DATA_API_HOST;

class ForgotForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            errors: {
                email: undefined,
            },
            showForm: true,
        };
    }

    handleEmailChange = (e) => {
        this.setState({...this.state, email: e.target.value});
    };

    handleSubmit = async (e) => {
        e.preventDefault();

        this.setGlobal({
          ...this.global,
          uploading: true
        });

        await fetch(`${host}/password/forgot`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          method: "POST",
          body: JSON.stringify({
              email: this.state.email,
          })
        });

        this.setGlobal({
          ...this.global,
          uploading: false
        });


        this.setState({
          ...this.state,
          showForm: false,
        })
    };

    render() {
        return (
          <div className="forgot-form">
            <Icon className="login-logo">
                <svg className="svg-icon">
                <use xlinkHref="#icon-cz" />
                </svg>
            </Icon>
            {!this.state.showForm && (
              <p>If a matching account was found, an email was sent.</p>
            )}
            {this.state.showForm && (
              <form onSubmit={this.handleSubmit} className="forgot-form">
                <p>Fill out &amp; submit the form below if you’ve forgotten your password.</p>
                <TextInput 
                    label="Email" 
                    error={this.state.errors.email} 
                    value={this.state.email} 
                    onChange={this.handleEmailChange}
                    placeholder
                />
                <input type="submit" value="Submit" className="button" />
            </form>
            )}
          </div>
        );
    }
}

export default ForgotForm;
