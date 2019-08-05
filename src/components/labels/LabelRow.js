import React, { Component } from "reactn";
import TableActionButtons from "../common/TableActionButtons";
import { human } from "../../utilities/date";
import { editPath, deleteLabel } from "../../models/labels";
import { canEditOrDelete } from "../../utilities/user";

class LabelRow extends Component {
  handleDelete = async e => {
    e.preventDefault();
    await deleteLabel(this.props.label.id);
    this.props.onUpdate();
    this.forceUpdate();
  };

  render() {
    const label = this.props.label;

    return (
      <tr>
        <td>{label.id}</td>
        <td>{label.name}</td>
        <td>{human(label.created_at)}</td>
        <td>
          {canEditOrDelete(this.global.token, this.global.groups, label.user_id) && (
            <TableActionButtons
              editPath={editPath(label.slug)}
              onSubmit={this.handleDelete}
            />
          )}
        </td>
      </tr>
    );
  }
}

export default LabelRow;
