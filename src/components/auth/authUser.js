import React, { setGlobal } from "reactn";
import Cookies from 'universal-cookie';
import Login from "../../views/auth/Login";

function authUser(Component) {
    return class extends React.Component {
        componentDidMount() {
            if (!this.global.token) {
                const cookies = new Cookies();
                const token = cookies.get(process.env.REACT_APP_COOKIE_NAME);

                if (token) {
                    setGlobal({
                        token
                    });
                }
            }
        }

        render() {
            return this.global.token ? <Component {...this.props} /> : <Login />;
        }
    }
}

export default authUser;