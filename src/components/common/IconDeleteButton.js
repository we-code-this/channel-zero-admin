import React from "react";
import { Icon } from "react-bulma-components";

const IconDeleteButton = ({ icon, label, className, onSubmit }) => {
  const buttonClass = className ? `button ${className}` : "button";

  return (
    <form className="is-inline" onSubmit={onSubmit}>
      <button type="submit" className={buttonClass}>
        <Icon>
          <svg className="svg-icon">
            <use xlinkHref={`#icon-${icon}`} />
          </svg>
        </Icon>
        <span>{label}</span>
      </button>
    </form>
  );
};

export default IconDeleteButton;
