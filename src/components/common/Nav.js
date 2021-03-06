import React, { Component } from "reactn";
import { NavLink as Link } from "react-router-dom";
import { Icon } from "react-bulma-components";
import { indexPath as articleIndex } from "../../models/articles";
import { indexPath as artistIndex } from "../../models/artists";
import { indexPath as featureIndex } from "../../models/features";
import { indexPath as promoIndex } from "../../models/promos";
import { 
  isAdmin as userIsAdmin,
  isAtLeastEditor as userIsAtLeastEditor,
} from "../../utilities/user";

class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
  }

  handleEscape = event => {
    if (event.keyCode === 27) {
      this.props.onCloseMenu(event);
    }
  };

  componentDidMount() {
    document.body.className = "no-scroll";
    document.addEventListener("keydown", this.handleEscape, false);
  }

  componentWillUnmount() {
    document.body.className = "";
    document.removeEventListener("keydown", this.handleEscape, false);
  }

  render() {
    return (
      <div className="admin-menu" onClick={this.props.onCloseMenu}>
        <nav>
          <div className="brand">
            <a
              href={process.env.REACT_APP_PUBLIC_HOST}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon>
                <svg className="svg-icon">
                  <use xlinkHref="#icon-cz-mini" />
                </svg>
              </Icon>
            </a>
          </div>
          <ul className="is-unstyled">
            <li>
              <Link
                exact
                to="/"
                className="navbar-item"
                activeClassName="is-active"
                onClick={this.props.onCloseMenu}
              >
                Dashboard
              </Link>
            </li>

            <li>
              <Link
                to={articleIndex()}
                className="navbar-item"
                activeClassName="is-active"
                onClick={this.props.onCloseMenu}
              >
                Articles
              </Link>
            </li>

            <li>
              <Link
                to={artistIndex()}
                className="navbar-item"
                activeClassName="is-active"
                onClick={this.props.onCloseMenu}
              >
                Artists
              </Link>
            </li>

            {userIsAtLeastEditor(this.global.groups) && (
              <li>
                <Link
                  to="/banners"
                  className="navbar-item"
                  activeClassName="is-active"
                  onClick={this.props.onCloseMenu}
                >
                  Banners
                </Link>
              </li>
            )}

            <li>
              <Link
                to={featureIndex()}
                className="navbar-item"
                activeClassName="is-active"
                onClick={this.props.onCloseMenu}
              >
                Features
              </Link>
            </li>

            <li>
              <Link
                to="/labels"
                className="navbar-item"
                activeClassName="is-active"
                onClick={this.props.onCloseMenu}
              >
                Labels
              </Link>
            </li>

            <li>
              <Link
                to={promoIndex()}
                className="navbar-item"
                activeClassName="is-active"
                onClick={this.props.onCloseMenu}
              >
                Promos
              </Link>
            </li>

            <li>
              <Link
                to="/releases"
                className="navbar-item"
                activeClassName="is-active"
                onClick={this.props.onCloseMenu}
              >
                Releases
              </Link>
            </li>

            <li>
              <Link
                to="/vendors"
                className="navbar-item"
                activeClassName="is-active"
                onClick={this.props.onCloseMenu}
              >
                Vendors
              </Link>
            </li>

            {userIsAdmin(this.global.groups) && (
              <li>
                <Link
                  to="/users"
                  className="navbar-item"
                  activeClassName="is-active"
                  onClick={this.props.onCloseMenu}
                >
                  Users
                </Link>
              </li>
            )}
            
            <li>
              <Link
                to="/videos"
                className="navbar-item"
                activeClassName="is-active"
                onClick={this.props.onCloseMenu}
              >
                Videos
              </Link>
            </li>
          </ul>
        </nav>
        <button className="nav-close" onClick={this.props.onCloseMenu}>
          <Icon>
            <svg className="svg-icon">
              <use xlinkHref="#icon-times" />
            </svg>
          </Icon>
        </button>
      </div>
    );
  }
}

export default Nav;
