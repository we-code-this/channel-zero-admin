import React, { setGlobal } from "reactn";
import Cookies from 'universal-cookie';
import jwtDecode from 'jwt-decode';
import Login from "../../views/auth/Login";

function authUser(Component) {
    return class extends React.Component {
        componentDidMount() {
            if (!this.global.token) {
                const cookies = new Cookies();
                const token = cookies.get(process.env.REACT_APP_COOKIE_NAME);

                if (token) {
                    const decoded = jwtDecode(token);

                    let currentTime = new Date().getTime() / 1000;
                    if (currentTime < decoded.exp) {
                      setGlobal({
                        token,
                        groups: decoded.groups
                      }); 
                    }
                }
            }
        }

        render() {
            if (this.global.token) {
                return <Component {...this.props} />
            } else {
                return <Login />;
            }
        }
    }
}

export default authUser;
