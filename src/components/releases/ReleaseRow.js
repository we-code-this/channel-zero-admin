import React, { Component } from "reactn";
import { Link } from "react-router-dom";
import he from "he";
import TableActionButtons from "../common/TableActionButtons";
import { human } from "../../utilities/date";
import { showPath, editPath, deleteRelease } from "../../models/releases";
import { canEditOrDelete } from "../../utilities/user";

class ReleaseRow extends Component {
  handleDelete = async e => {
    e.preventDefault();
    await deleteRelease(this.props.release.id);
    this.props.onUpdate();
    this.forceUpdate();
  };

  render() {
    const release = this.props.release;

    return (
      <tr>
        <td>{release.id}</td>
        <td>
          <Link to={showPath(release.slug)}>{he.decode(release.title)}</Link>
        </td>
        <td>{release.published ? "Yes" : "No"}</td>
        <td>{human(release.created_at)}</td>
        <td>
          {canEditOrDelete(this.global.token, this.global.groups, release.user_id) && (
            <TableActionButtons
              editPath={editPath(release.slug)}
              onSubmit={this.handleDelete}
            />
          )}
        </td>
      </tr>
    );
  }
}

export default ReleaseRow;
