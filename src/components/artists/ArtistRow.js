import React, { Component } from "reactn";
import he from "he";
import { Link } from "react-router-dom";
import TableActionButtons from "../common/TableActionButtons";
import { human } from "../../utilities/date";
import { showPath, editPath, deleteArtist } from "../../models/artists";

class ArtistRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      artist: props.artist,
      error: undefined
    };
  }

  handleDelete = async e => {
    e.preventDefault();
    const deleteResponse = await deleteArtist(this.props.artist.id);

    if (deleteResponse.error) {
      this.setState({ ...this.state, error: deleteResponse.error });
    }

    this.props.onUpdate();
    this.forceUpdate();
  };

  render() {
    const artist = this.state.artist;
    
    return (
      <tr>
        <td>{artist.id}</td>
        <td>
          <Link to={showPath(artist.slug)}>{he.decode(artist.name)}</Link>{" "}
          {this.state.error && (
            <span class="tag is-warning">{this.state.error}</span>
          )}
        </td>
        <td>{human(artist.created_at)}</td>
        <td>
          {this.props.showActions && (
            <TableActionButtons
              editPath={editPath(artist.slug)}
              onSubmit={this.handleDelete}
            />
          )}
        </td>
      </tr>
    );
  }
}

export default ArtistRow;
