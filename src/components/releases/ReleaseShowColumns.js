import React from "react";
import he from "he";
import Markdown from "markdown-to-jsx";
import { Columns } from "react-bulma-components";
import { imageUrl } from "../../models/releases";

const ReleaseShowColumns = props => (
  <Columns className="show-columns">
    <Columns.Column
      tablet={{ size: "half" }}
      desktop={{ size: "one-third" }}
      className="left-column"
    >
      <Columns gapless className="image-gallery">
        <Columns.Column size={12} className="image-container">
          <img
            src={imageUrl(props.release.filename)}
            alt={`Cover of ${props.release.title}`}
          />
        </Columns.Column>
      </Columns>
      <ul className="metadata">
        <li>
          <strong>Label:</strong> {he.decode(props.release.label.name)}
        </li>
        <li>
          <strong>Published:</strong> {props.release.published ? "Yes" : "No"}
        </li>
      </ul>
    </Columns.Column>
    <Columns.Column className="description">
      <Markdown>{he.decode(props.release.description)}</Markdown>
    </Columns.Column>
  </Columns>
);

export default ReleaseShowColumns;
