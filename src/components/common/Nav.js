import React, { Component } from "react";
import { Link } from "react-router-dom";

class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
  }

  render() {
    return (
      <nav className="admin-menu">
        <ul className="is-unstyled">
          <li>
            <Link to="/artists" className="navbar-item">
              Artists
            </Link>
          </li>

          <li>
            <Link to="/labels" className="navbar-item">
              Labels
            </Link>
          </li>

          <li>
            <Link to="/releases" className="navbar-item">
              Releases
            </Link>
          </li>

          <li>
            <Link to="/vendors" className="navbar-item">
              Vendors
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Nav;
