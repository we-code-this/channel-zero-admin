import React, { Component } from "react";
import { NavLink as Link } from "react-router-dom";
import { indexPath as artistIndex } from "../../models/artists";

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
            <Link
              exact
              to="/"
              className="navbar-item"
              activeClassName="is-active"
            >
              Dashboard
            </Link>
          </li>

          <li>
            <Link
              to={artistIndex()}
              className="navbar-item"
              activeClassName="is-active"
            >
              Artists
            </Link>
          </li>

          <li>
            <Link
              to="/labels"
              className="navbar-item"
              activeClassName="is-active"
            >
              Labels
            </Link>
          </li>

          <li>
            <Link
              to="/releases"
              className="navbar-item"
              activeClassName="is-active"
            >
              Releases
            </Link>
          </li>

          <li>
            <Link
              to="/vendors"
              className="navbar-item"
              activeClassName="is-active"
            >
              Vendors
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Nav;
