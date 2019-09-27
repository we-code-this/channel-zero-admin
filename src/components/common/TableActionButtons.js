import React from "react";
import IconButton from "./IconButton";
import IconDeleteButton from "./IconDeleteButton";
import DeleteModalButton from "./DeleteModalButton";

const TableActionButtons = props => (
  <div className="table-action-buttons">
    <div className="buttons has-addons">
      <IconButton
        to={props.editPath}
        className="is-primary is-small"
        icon="edit"
        label="Edit"
      />
      <DeleteModalButton
        small
        onSubmit={props.onSubmit}
      />
    </div>
  </div>
);

export default TableActionButtons;
