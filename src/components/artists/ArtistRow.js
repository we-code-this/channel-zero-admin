import React, { Component } from "react";
import { Link } from "react-router-dom";
import TableActionButtons from "../common/TableActionButtons";
import { showPath, editPath, deleteArtist } from "../../models/artists";

class ArtistRow extends Component {
  handleDelete = async e => {
    e.preventDefault();
    await deleteArtist(this.props.artist.id);
    this.props.onUpdate();
    this.forceUpdate();
  };

  render() {
    const artist = this.props.artist;

    return (
      <tr>
        <td>{artist.id}</td>
        <td>
          <Link to={showPath(artist.slug)}>{artist.name}</Link>
        </td>
        <td>{artist.created_at}</td>
        <td>
          <TableActionButtons
            editPath={editPath(artist.slug)}
            onSubmit={this.handleDelete}
          />
        </td>
      </tr>
    );
  }
}

export default ArtistRow;
