import React from "reactn";
import { Redirect } from "react-router-dom";

function authUser(Component) {
    return class extends React.Component {
        render() {
            return this.global.token ? <Component {...this.props} /> : <Redirect to="/login" />;
        }
    }
}

export default authUser;