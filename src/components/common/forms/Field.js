import React from "react";

const Field = props => {
  const labelClass = props.srOnly ? "label is-sr-only" : "label";
  const htmlFor = props.htmlFor ? props.htmlFor : props.label.toLowerCase().replace(" ", "_");
  const errorClass = props.onDark ? 'help is-danger-on-dark' : 'help is-danger';

  return (
    <div className="field">
      <label className={labelClass} htmlFor={htmlFor}>
        {props.label}
      </label>
      <div className="control">
        {props.children}
        {props.help && <p className="help">{props.help}</p>}
        {props.error && <p className={errorClass}>{props.error}</p>}
      </div>
    </div>
  )
};

export default Field;
