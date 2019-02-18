import React from "react";

const Field = props => (
  <div className="field">
    <label className="label" htmlFor={props.label.toLowerCase()}>
      {props.label}
    </label>
    <div className="control">
      {props.children}
      {props.help && <p className="help">{props.help}</p>}
      {props.error && <p className="help is-danger">{props.error}</p>}
    </div>
  </div>
);

export default Field;
