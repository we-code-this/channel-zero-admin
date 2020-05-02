import React, { Component } from "reactn";
import Helmet from "react-helmet";
import ResetForm from "../../components/auth/ResetForm";
import isGuest from "../../components/auth/isGuest";

class Reset extends Component {
  render() {
      return (
        <div className="Reset">
          <Helmet>
            <title>Forgot Password</title>
          </Helmet>
          <ResetForm token={this.props.match.params.token} />
        </div>
      );        
  }
}

export default isGuest(Reset);
