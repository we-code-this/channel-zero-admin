import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "react-bulma-components";

const Header = props => (
  <header>
    <div className="brand">
      <Link to="/">
        <Icon>
          <svg className="svg-icon">
            <use xlinkHref="#icon-cz" />
          </svg>
        </Icon>
      </Link>
    </div>
    <div className="title is-4">{props.title}</div>
  </header>
);

export default Header;
