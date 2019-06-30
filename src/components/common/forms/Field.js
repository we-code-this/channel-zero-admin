import React from "react";

const Field = props => {
  const labelClass = props.srOnly ? "label is-sr-only" : "label";

  return (
    <div className="field">
      <label className={labelClass} htmlFor={props.label.toLowerCase()}>
        {props.label}
      </label>
      <div className="control">
        {props.children}
        {props.help && <p className="help">{props.help}</p>}
        {props.error && <p className="help is-danger">{props.error}</p>}
      </div>
    </div>
  )
};

export default Field;
