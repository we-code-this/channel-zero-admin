import React from "react";
import Field from "./Field";

const TextInput = props => {
  const inputClass = props.error ? "input is-danger" : "input";

  return (
    <Field label={props.label} help={props.help} error={props.error}>
      <input
        name={props.label.toLowerCase().replace(" ", "_")}
        className={inputClass}
        type="text"
        value={props.value}
        onChange={props.onChange}
      />
    </Field>
  );
};

export default TextInput;
