import React from 'react';
import Field from "./Field";

const DatePicker = props => {
  const inputClass = props.error ? "input is-danger" : "input";
  const inputName = props.name ? props.name : props.label.toLowerCase().replace(" ", "_");

  return (
    <Field label={props.label} help={props.help} error={props.error}>
      <input type="date"
        className={inputClass}
        onChange={props.onChange}
        value={props.value}
        name={inputName}
      />
    </Field>
  );
};

export default DatePicker
