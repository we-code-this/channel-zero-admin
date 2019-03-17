import React from "react";
import { Icon } from "react-bulma-components";

const IconDeleteButton = ({
  id,
  icon,
  label,
  className,
  onSubmit,
  showLabel = true
}) => {
  const buttonClass = className ? `button ${className}` : "button";

  return (
    <form className="is-inline" onSubmit={onSubmit}>
      {id && <input type="hidden" name="id" value={id} />}
      <button type="submit" className={buttonClass} aria-label={label}>
        <Icon>
          <svg className="svg-icon">
            <use xlinkHref={`#icon-${icon}`} />
          </svg>
        </Icon>
        {showLabel && <span>{label}</span>}
      </button>
    </form>
  );
};

export default IconDeleteButton;
