import React from "react";
import { Icon } from "react-bulma-components";

const Header = props => (
  <header>
    <div className="brand">
      <a
        href={process.env.REACT_APP_PUBLIC_HOST}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon>
          <svg className="svg-icon">
            <use xlinkHref="#icon-cz" />
          </svg>
        </Icon>
      </a>
    </div>
    <div className="title is-4">{props.title}</div>
  </header>
);

export default Header;
