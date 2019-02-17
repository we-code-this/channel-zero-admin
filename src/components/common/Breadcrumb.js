import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = props => {
  return props.active ? (
    <li className="is-active">
      <Link to={props.to} aria-current="page">
        {props.children}
      </Link>
    </li>
  ) : (
    <li>
      <Link to={props.to}>{props.children}</Link>
    </li>
  );
};

export default Breadcrumb;
