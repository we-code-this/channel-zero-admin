import React, { Fragment } from "react";
import he from "he";
import IconButton from "../common/IconButton";
import IconDeleteButton from "../common/IconDeleteButton";
import { editPath } from "../../models/endorsements";

const EndorsementList = ({ endorsements, releaseSlug, onDelete }) => {
  return (
    <div className="endorsement-list">
      {endorsements.length > 0 && (
        <Fragment>
          <h3 className="title is-3">Endorsements</h3>
          <ul className="metadata">
          {endorsements.map(endorsement => (
            <li key={`endorsement-${endorsement.id}`} className="endorsement-item">
              <span className="endorsement-info">
                {he.decode(endorsement.review)} — {
                  endorsement.url ? 
                  <a href={endorsement.url}>{he.decode(endorsement.reviewer)}</a> : 
                  he.decode(endorsement.reviewer)
                }
              </span>
              <span className="endorsement-actions">
                <div className="buttons has-addons">
                  <IconButton
                    icon="edit"
                    className="is-primary is-small"
                    label="Edit"
                    showLabel={false}
                    to={editPath(endorsement.id, releaseSlug)}
                  />
                  <IconDeleteButton
                    id={endorsement.id}
                    className="is-danger is-small"
                    icon="minus-circle"
                    label="Delete"
                    showLabel={false}
                    onSubmit={onDelete}
                  />
                </div>
              </span>
            </li>
          ))}
          </ul>
        </Fragment>
      )}
    </div>
  );
};

export default EndorsementList;
