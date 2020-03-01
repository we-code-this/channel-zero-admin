import React from "react";

const SubmitWithCancel = props => {
  const children = props.children ? props.children : undefined;
  return (
    <div className="field is-grouped submit-with-cancel">
      <div className="control">
        <button className="button is-link" type="submit">
          Submit
        </button>
      </div>
      {children}
      <div className="control">
        <button className="button is-text" onClick={props.onClick}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SubmitWithCancel;
