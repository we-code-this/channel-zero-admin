import React, { Component } from "react";
import TableActionButtons from "../common/TableActionButtons";
// import { showPath, editPath, deleteArtist } from "../../models/artists";

class LabelRow extends Component {
  // handleDelete = async e => {
  //   e.preventDefault();
  //   await deleteArtist(this.props.artist.id);
  //   this.forceUpdate();
  // };

  render() {
    const label = this.props.label;

    return (
      <tr>
        <td>{label.id}</td>
        <td>{label.name}</td>
        <td>{label.created_at}</td>
        <td>
          <TableActionButtons editPath="" onSubmit={() => {}} />
        </td>
      </tr>
    );
  }
}

export default LabelRow;
