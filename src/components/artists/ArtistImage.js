import React, { Component } from "react";
import IconButton from "../common/IconButton";
import IconDeleteButton from "../common/IconDeleteButton";
import { editPath, imageUrl } from "../../models/artist_images";

class ArtistImage extends Component {
  render() {
    return (
      <React.Fragment>
        <img src={imageUrl(this.props.image.filename)} alt={this.props.alt} />
        <div className="buttons has-addons">
          <IconButton
            icon="edit"
            className="is-primary is-small"
            label="Edit"
            showLabel={false}
            to={editPath(this.props.artistSlug, this.props.image.id)}
          />
          <IconDeleteButton
            id={this.props.image.id}
            className="is-danger is-small"
            icon="minus-circle"
            label="Delete"
            showLabel={false}
            onSubmit={this.props.onDelete}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default ArtistImage;
