import React, { Fragment } from "react";
import he from "he";
import IconButton from "../common/IconButton";
import IconDeleteButton from "../common/IconDeleteButton";
import { editPath } from "../../models/credits";

const CreditList = ({ credits, releaseSlug, onDelete }) => {
  return (
    <div className="credit-list">
      {credits.length > 0 && (
        <Fragment>
          <h3 className="title is-3">Credits</h3>
          <ul className="metadata">
          {credits.map(credit => (
            <li key={`meta-${credit.label}`} className="credit-item">
              <span className="credit-info">
                <strong>{credit.label}:</strong> {
                  credit.url ? <a href={credit.url}>{credit.value}</a> : 
                  he.decode(credit.value)
                }
              </span>
              <span className="credit-actions">
                <div className="buttons has-addons">
                  <IconButton
                    icon="edit"
                    className="is-primary is-small"
                    label="Edit"
                    showLabel={false}
                    to={editPath(credit.id, releaseSlug)}
                  />
                  <IconDeleteButton
                    id={credit.id}
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

export default CreditList;
