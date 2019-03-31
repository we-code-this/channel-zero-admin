import React, { Component } from "react";
import TableActionButtons from "../common/TableActionButtons";
import { showPath, editPath, deleteLabel } from "../../models/labels";

class LabelRow extends Component {
  handleDelete = async e => {
    e.preventDefault();
    // await deleteLabel(this.props.label.id);
    // this.forceUpdate();
  };

  render() {
    const label = this.props.label;

    return (
      <tr>
        <td>{label.id}</td>
        <td>{label.name}</td>
        <td>{label.created_at}</td>
        <td>
          <TableActionButtons
            editPath={editPath(label.slug)}
            onSubmit={this.handleDelete}
          />
        </td>
      </tr>
    );
  }
}

export default LabelRow;
