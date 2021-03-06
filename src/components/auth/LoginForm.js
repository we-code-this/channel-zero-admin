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

        const reset = props.reset ? props.reset : false;

        this.state = {
            email: "",
            password: "",
            errors: {
                email: undefined,
                password: undefined,
                other: false,
            },
            reset: reset,
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
        } else {
          this.setState({
            ...this.state,
            reset: false,
            errors: {
              ...this.state.errors,
              other: true,
            }
          });
        }
    };

    render() {
        return (
          <form onSubmit={this.handleSubmit} className="login-form">
            <Icon className="login-logo">
              <svg className="svg-icon">
              <use xlinkHref="#icon-cz" />
              </svg>
            </Icon>
            {this.state.errors.other && <p>Something went wrong, please try again.</p>}
            {this.state.reset && <p>Your password was reset, go ahead and login.</p>}
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
