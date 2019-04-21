import React from "react";
import { Icon } from "react-bulma-components";

const PublishButton = ({ published, onSubmit, showLabel = true }) => {
  const label = published ? "Unpublish" : "Publish";
  const icon = published ? "file-minus" : "file-plus";
  const buttonClass = published ? "button is-warning" : "button is-info";

  return (
    <form className="is-inline" onSubmit={onSubmit}>
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

export default PublishButton;
