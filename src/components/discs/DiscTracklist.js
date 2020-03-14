import React from "react";
import he from "he";
import IconButton from "../common/IconButton";
import IconDeleteButton from "../common/IconDeleteButton";
import { editPath } from "../../models/tracks";

const DiscTracklist = props => {
  return (
    <ul className="disc-tracklist">
      {props.tracks.map(track => {
        return (
          <li key={`disc-${props.disc_id}-track-${track.id}`} className="track">
            <span className="track-info">
              <span className="track-number">{track.number} </span>
              <span className="track-title">{he.decode(track.title)}</span>
            </span>
            <span className="track-actions">
              <div className="buttons has-addons">
                <IconButton
                  icon="edit"
                  className="is-primary is-small"
                  label="Edit"
                  showLabel={false}
                  to={editPath(track.slug, props.disc_id, props.release_slug)}
                />
                <IconDeleteButton
                  id={track.id}
                  className="is-danger is-small"
                  icon="minus-circle"
                  label="Delete"
                  showLabel={false}
                  onSubmit={props.onDelete}
                />
              </div>
            </span>
          </li>
        );
      })}
    </ul>
  );
};

export default DiscTracklist;
