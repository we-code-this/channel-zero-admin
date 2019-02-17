import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "react-bulma-components";

const IconButton = ({ icon, label, to, className }) => {
  const buttonClass = className ? `button ${className}` : "button";

  return (
    <Link to={to} className={buttonClass}>
      <Icon>
        <svg className="svg-icon">
          <use xlinkHref={`#icon-${icon}`} />
        </svg>
      </Icon>
      <span>{label}</span>
    </Link>
  );
};

export default IconButton;
