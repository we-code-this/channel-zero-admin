import React, { Component } from "reactn";
import Helmet from "react-helmet";
import { Link } from 'react-router-dom';
import LoginForm from "../../components/auth/LoginForm";
import isGuest from "../../components/auth/isGuest";

class Login extends Component {
  constructor(props) {
    super(props);

    const reset = props.location && props.location.reset ? props.location.reset : false;

    this.state = {
      reset: reset,
    };
  }

  render() {
    return (
      <div>
          <Helmet>
            <title>Login</title>
          </Helmet>
          <LoginForm reset={this.state.reset} />
          <p className="forgot-password-link"><Link to="/forgot">Forgot Password</Link></p>
      </div>
    );        
  }
}

export default isGuest(Login);
