import React, { Component } from "reactn";
import Helmet from "react-helmet";
import ForgotForm from "../../components/auth/ForgotForm";
import isGuest from "../../components/auth/isGuest";

class Forgot extends Component {
  render() {
      return (
        <div className="Forgot">
          <Helmet>
            <title>Forgot Password</title>
          </Helmet>
          <ForgotForm />
        </div>
      );        
  }
}

export default isGuest(Forgot);
