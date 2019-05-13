import React, { Component } from "react";
import { Link } from "react-router-dom";
import TableActionButtons from "../common/TableActionButtons";
import { human } from "../../utilities/date";
import { showPath, editPath, deleteRelease } from "../../models/releases";

class ReleaseRow extends Component {
  handleDelete = async e => {
    e.preventDefault();
    // await deleteLabel(this.props.label.id);
    // this.props.onUpdate();
    // this.forceUpdate();
  };

  render() {
    const release = this.props.release;

    return (
      <tr>
        <td>{release.id}</td>
        <td>
          <Link to={showPath(release.slug)}>{release.title}</Link>
        </td>
        <td>{release.published ? "Yes" : "No"}</td>
        <td>{human(release.created_at)}</td>
        <td>
          <TableActionButtons
            editPath={editPath(release.slug)}
            onSubmit={this.handleDelete}
          />
        </td>
      </tr>
    );
  }
}

export default ReleaseRow;
