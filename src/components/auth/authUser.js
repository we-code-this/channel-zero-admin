import React, { setGlobal } from "reactn";
import { Redirect } from "react-router-dom";
import Cookies from 'universal-cookie';

function authUser(Component) {
    return class extends React.Component {
        render() {
            if (!this.global.token) {
                const cookies = new Cookies();
                const token = cookies.get('channelzero');

                if (token) {
                    setGlobal({
                        token
                    });
                }
            }

            return this.global.token ? <Component {...this.props} /> : <Redirect to="/login" />;
        }
    }
}

export default authUser;