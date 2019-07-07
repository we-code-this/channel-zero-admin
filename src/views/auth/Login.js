import React, { Component } from "reactn";
import { Redirect } from "react-router";
import Helmet from "react-helmet";
import LoginForm from "../../components/auth/LoginForm";

class Login extends Component {
    render() {
        return this.global.token ? <Redirect to="/" /> : (
            <div>
                <Helmet>
                  <title>Login</title>
                </Helmet>
                <LoginForm />                
            </div>
        );
    }
}

export default Login;
