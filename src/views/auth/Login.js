import React, { Component } from "react";
import Helmet from "react-helmet";
import LoginForm from "../../components/auth/LoginForm";

class Login extends Component {
    render() {
        return (
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
