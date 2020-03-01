import React, { Component } from "reactn";
import IconButton from "../common/IconButton";
import IconDeleteButton from "../common/IconDeleteButton";
import DiscTracklist from "../discs/DiscTracklist";
import { editPath } from "../../models/discs";
import { createPath as createTrackPath } from "../../models/tracks";
import { canEditOrDelete } from "../../utilities/user";

class ReleaseDisc extends Component {
  render() {
    return (
      <div className="release-disc">
        <div className="title-with-actions">
          <h3 className="title is-4">{this.props.name}</h3>
          {canEditOrDelete(this.global.token, this.global.groups, this.props.user_id) &&
          <div className="buttons has-addons">
            <IconButton
              icon="edit"
              className="is-primary is-small"
              label="Edit"
              showLabel={false}
              to={editPath(this.props.id, this.props.slug)}
            />
            <IconDeleteButton
              id={this.props.id}
              className="is-danger is-small"
              icon="minus-circle"
              label="Delete"
              showLabel={false}
              onSubmit={this.props.onDelete}
            />
            <IconButton
              icon="plus"
              className="is-success is-small"
              label="Add Track"
              showLabel={true}
              to={createTrackPath(this.props.id, this.props.slug)}
            />
          </div>}
        </div>
        {this.props.tracks.length > 0 &&
          <DiscTracklist 
            release_slug={this.props.slug}
            disc_id={this.props.id} 
            tracks={this.props.tracks}
            onDelete={this.props.onTrackDelete}
          />
        }
      </div>
    );
  }
}

export default ReleaseDisc;
