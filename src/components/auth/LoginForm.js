import React, { Component } from "reactn";
import { Redirect } from "react-router";
import { Icon } from "react-bulma-components";
import TextInput from "../common/forms/TextInput";
import PasswordInput from "../common/forms/PasswordInput";

class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            errors: {
                email: undefined,
                password: undefined
            }
        };
    }

    handleEmailChange = (e) => {
        this.setState({...this.state, email: e.target.value});
    };

    handlePasswordChange = (e) => {
        this.setState({...this.state, password: e.target.value});
    };

    handleSubmit = (e) => {
        e.preventDefault();

        this.setGlobal({
            token: 'sometoken'
        });
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <Icon className="login-logo">
                    <svg className="svg-icon">
                    <use xlinkHref="#icon-cz" />
                    </svg>
                </Icon>
                <TextInput 
                    label="Email" 
                    error={this.state.errors.email} 
                    value={this.state.email} 
                    onChange={this.handleEmailChange}
                    placeholder
                />
                <PasswordInput 
                    label="Password" 
                    error={this.state.errors.password} 
                    value={this.state.password} 
                    onChange={this.handlePasswordChange}
                    placeholder
                />
                <input type="submit" value="Login" className="button" />
            </form>
        );
    }
}

export default LoginForm;