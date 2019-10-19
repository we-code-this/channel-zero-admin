import React from "react";
import { Columns } from "react-bulma-components";
import { imageUrl } from "../../models/releases";

const ReleaseImageGallery = props => (
  <Columns gapless className="image-gallery">
    <Columns.Column size={12} className="image-container">
      <img
        src={imageUrl(props.release.url)}
        alt={`Cover of ${props.release.title}`}
      />
    </Columns.Column>
  </Columns>
);

export default ReleaseImageGallery;
