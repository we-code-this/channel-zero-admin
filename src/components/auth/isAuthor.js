import React from "reactn";
import NoAccess from "./NoAccess";
import { 
    isAuthor as userIsAuthor, 
    isEditor as userIsEditor,
    isAdmin as userIsAdmin,
} from "../../utilities/user";

function isAuthor(Component) {
    return class extends React.Component {
        render() {
            if (
                userIsAdmin(this.global.groups) || 
                userIsEditor(this.global.groups) || 
                userIsAuthor(this.global.groups)
            ) {
                return <Component {...this.props} />
            } else {
                return <NoAccess />;
            }
        }
    }
}

export default isAuthor;