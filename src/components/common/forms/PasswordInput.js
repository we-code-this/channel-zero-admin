import React from "react";
import Field from "./Field";

const PasswordInput = props => {
  const inputClass = props.error ? "input is-danger" : "input";
  const srOnly = props.placeholder ? true : false;
  const placeholder = props.placeholder ? props.label : undefined;

  return (
    <Field label={props.label} help={props.help} error={props.error} srOnly={srOnly}>
      <input
        name={props.label.toLowerCase().replace(" ", "_")}
        className={inputClass}
        type="password"
        value={props.value}
        onChange={props.onChange}
        placeholder={placeholder}
      />
    </Field>
  );
};

export default PasswordInput;
