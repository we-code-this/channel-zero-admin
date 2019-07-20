import React from "reactn";
import NoAccess from "./NoAccess";
import { isAdmin as userIsAdmin } from "../../utilities/user";

function isAdmin(Component) {
    return class extends React.Component {
        render() {
            if (userIsAdmin(this.global.groups)) {
                return <Component {...this.props} />
            } else {
                return <NoAccess />;
            }
        }
    }
}

export default isAdmin;