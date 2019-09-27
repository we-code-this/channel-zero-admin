import React from "react";
import Field from "./Field";

const TextInput = props => {
  const inputClass = props.error ? "input is-danger" : "input";
  const srOnly = props.placeholder ? true : false;
  const placeholder = props.placeholder ? props.label : undefined;
  const inputName = props.name ? props.name : props.label.toLowerCase().replace(" ", "_");

  return (
    <Field label={props.label} help={props.help} error={props.error} srOnly={srOnly}>
      <input
        name={inputName}
        className={inputClass}
        type="text"
        value={props.value}
        onChange={props.onChange}
        placeholder={placeholder}
      />
    </Field>
  );
};

export default TextInput;
