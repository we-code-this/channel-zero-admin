import React from "react";
import { Icon } from "react-bulma-components";

const Header = props => (
  <header>
    <button className="nav-open" onClick={props.onOpenMenu}>
      <Icon>
        <svg className="svg-icon">
          <use xlinkHref="#icon-bars" />
        </svg>
      </Icon>
    </button>

    <div className="title is-5">{props.title}</div>
    <button onClick={props.onLogout} className="btn-logout" aria-label="Logout">
      <Icon>
          <svg className="svg-icon">
            <use xlinkHref="#icon-power-off" />
          </svg>
      </Icon>
    </button>
  </header>
);

export default Header;
