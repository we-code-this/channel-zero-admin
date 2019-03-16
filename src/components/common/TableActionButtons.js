import React from "react";
import IconButton from "./IconButton";
import IconDeleteButton from "./IconDeleteButton";

const TableActionButtons = props => (
  <div className="table-action-buttons">
    <div className="buttons has-addons">
      <IconButton
        to={props.editPath}
        className="is-primary is-small"
        icon="edit"
        label="Edit"
      />
      <IconDeleteButton
        className="is-danger is-small"
        icon="minus-circle"
        label="Delete"
        onSubmit={props.onSubmit}
      />
    </div>
  </div>
);

export default TableActionButtons;
