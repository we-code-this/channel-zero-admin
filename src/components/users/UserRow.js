import React, { Component } from "react";
import TableActionButtons from "../common/TableActionButtons";
import { human } from "../../utilities/date";
import { editPath, deleteUser } from "../../models/users";

class UserRow extends Component {
  handleDelete = async e => {
    e.preventDefault();
    await deleteUser(this.props.user.id);
    this.props.onUpdate();
    this.forceUpdate();
  };

  render() {
    const user = this.props.user;

    return (
      <tr>
        <td>{user.id}</td>
        <td>{user.email}</td>
        <td>{user.username}</td>
        <td>{human(user.created_at)}</td>
        <td>
          <TableActionButtons
            editPath={editPath(user.id)}
            onSubmit={this.handleDelete}
          />
        </td>
      </tr>
    );
  }
}

export default UserRow;
