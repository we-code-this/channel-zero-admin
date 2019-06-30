import React, { Component } from "react";
import Helmet from "react-helmet";
import LoginForm from "../../components/auth/LoginForm";

class Login extends Component {
    render() {
        return (
            <React.Fragment>
                <Helmet>
                  <title>Login</title>
                </Helmet>
                <LoginForm />
            </React.Fragment>
        );
    }
}

export default Login;
