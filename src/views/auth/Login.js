import React, { Component } from "reactn";
import Helmet from "react-helmet";
import { Link } from 'react-router-dom';
import LoginForm from "../../components/auth/LoginForm";
import isGuest from "../../components/auth/isGuest";

class Login extends Component {
    render() {
        return (
          <div>
              <Helmet>
                <title>Login</title>
              </Helmet>
              <LoginForm />
              <p className="forgot-password-link"><Link to="/forgot">Forgot Password</Link></p>
          </div>
        );        
    }
}

export default isGuest(Login);
