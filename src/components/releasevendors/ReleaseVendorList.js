import React, { Fragment } from "react";
import he from "he";
import { Icon } from "react-bulma-components";
import IconButton from "../common/IconButton";
import IconDeleteButton from "../common/IconDeleteButton";
import { editPath } from "../../models/release_vendors";

const ReleaseVendorList = ({ vendors, releaseSlug, onDelete }) => {
  return (
    <div className="release-vendor-list">
      {vendors.length > 0 && (
        <Fragment>
          <h3 className="title is-3">Vendors</h3>
          <ul className="metadata">
          {vendors.map(vendor => (
            <li key={`meta-${vendor.release_id}-${vendor.vendor_id}`} className="vendor-item">
              <span className="vendor-info">
                <a href={vendor.url}>
                  <Icon>
                    <svg className="svg-icon">
                      <use xlinkHref={`#icon-${vendor.icon_class}`} />
                    </svg>
                  </Icon>
                  {he.decode(vendor.name)}
                </a>
              </span>
              <span className="vendor-actions">
                <div className="buttons has-addons">
                  <IconButton
                    icon="edit"
                    className="is-primary is-small"
                    label="Edit"
                    showLabel={false}
                    to={editPath(vendor.id, releaseSlug)}
                  />
                  <IconDeleteButton
                    id={vendor.id}
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

export default ReleaseVendorList;
