import React from "react";
import IconButton from "./IconButton";

const TableActionButtons = props => (
  <div className="table-action-buttons">
    <div className="buttons has-addons">
      <IconButton
        to={props.editPath}
        className="is-primary is-small"
        icon="edit"
        label="Edit"
      />
      <IconButton
        to={props.deletePath}
        className="is-danger is-small"
        icon="minus-circle"
        label="Delete"
      />
    </div>
  </div>
);

export default TableActionButtons;
