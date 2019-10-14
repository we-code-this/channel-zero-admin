import React, { Component } from "reactn";
import Cookies from 'universal-cookie';
import jwtDecode from 'jwt-decode';
import { Icon } from "react-bulma-components";
import TextInput from "../common/forms/TextInput";
import PasswordInput from "../common/forms/PasswordInput";
const host = process.env.REACT_APP_DATA_API_HOST;

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

    handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`${host}/login`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        });

        const payload = await response.json();

        if (payload.token && this.state.email === payload.result) {
            const decoded = jwtDecode(payload.token);

            this.setGlobal({
                ...this.global,
                token: payload.token,
                groups: decoded.groups
            });

            const cookies = new Cookies();
            cookies.set(process.env.REACT_APP_COOKIE_NAME, payload.token, { path: '/' });
        }
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
